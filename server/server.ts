import express from 'express';
import cors from 'cors';
import { createClient } from "@libsql/client";

const client = createClient({
    url: "file:data.db",
    syncUrl: "libsql://bimk-kabiracharya.turso.io",
    // Will replace with environment variable and rotated secret for production
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEwLTE1VDE0OjEwOjU1Ljc4MjIyMzI2M1oiLCJpZCI6ImI5YmM1Nzk3LTY1ZmQtMTFlZS1hODFhLWNlZGI0Y2NiYjkyOSJ9.p8CWEglLLJ_QY5ulwmslZUAd36SVUENyBkJEvxup83GVdc7hVSzyGSs-b3UfgFoX1MOlRHrMkX44adGZwaLEAA"
});

const auth0domain = "dev-yhky5tc13kqipv2f.us.auth0.com"

await client.sync();

const app = express();
app.use(cors());
app.use(express.json())

const games = ["reaction_time", "memory_test", "sequence_memory", "aim_trainer", "typing_test"]

// Get /api/scores with query param "game"
app.get('/api/scores', async (req, res) => {
    const game = req.query.game;

    if (!game) {
        res.status(400).json({ error: 'Missing game' });
        return;
    }

    // Must do this check to prevent SQLi, can't prepare table names
    if (!games.includes(game)) {
        res.status(400).json({ error: 'Invalid game' });
        return;
    }

    const scores = await client.execute(`SELECT * FROM ${game}`);
    res.json(scores["rows"]);
});

app.post('/api/scores', async (req, res) => {
  const bearer = req.headers.authorization?.split(" ")[1];

  if (!bearer) {
    res.status(401).json({ error: 'No authorization header' });
    return;
  }

  const game = req.body.game;
  const score = req.body.score;

  if (!game || !score) {
    res.status(400).json({ error: 'Missing game or score' });
    return;
  }

  // Must do this check to prevent SQLi, can't prepare table names
  if (!games.includes(game)) {
    res.status(400).json({ error: 'Invalid game' });
    return;
  }

  console.log(bearer, game, score);

  fetch(`https://${auth0domain}/userinfo`, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  }).then(async (response) => {
    const data = await response.json();
    const auth0id = data.sub;

    console.log(auth0id);
``
    let user = await client.execute({sql:`SELECT * FROM users WHERE auth0id = ?`, args:[auth0id]});
    if (user["rows"].length === 0) {
      await client.execute({sql:`INSERT INTO users (auth0id) VALUES (?)`, args:[auth0id]});
      user = await client.execute({sql:`SELECT * FROM users WHERE auth0id = ?`, args:[auth0id]});
    }

    const user_id = user["rows"][0]["id"];

    const res = await client.execute({sql:`INSERT INTO ${game} (user_id, score, timestamp) VALUES (?, ?, ?)`, args:[user_id, score, Date.now()]});
    
    const highscore_id = await client.execute({sql:`SELECT best_${game} FROM users WHERE auth0id = ?`, args:[auth0id]});
    if (highscore_id["rows"].length === 0) {
      await client.execute({sql:`UPDATE users SET best_${game} = ? WHERE auth0id = ?`, args:[parseInt(res.toJSON().lastInsertRowid), auth0id]});
    } else {
      const highscore = await client.execute({sql:`SELECT score FROM ${game} WHERE id = ?`, args:[highscore_id["rows"][0][`best_${game}`]]});
      if (highscore["rows"].length > 0 && highscore["rows"][0]["score"] < score) {
        await client.execute({sql:`UPDATE users SET best_${game} = ? WHERE auth0id = ?`, args:[parseInt(res.toJSON().lastInsertRowid), auth0id]});
      }
    }
  });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});