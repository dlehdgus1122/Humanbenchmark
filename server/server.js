import express from 'express';
import cors from 'cors';
import { createClient } from "@libsql/client";
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('../', import.meta.url))

const client = createClient({
    url: "file:data.db",
    syncUrl: "libsql://bimk-kabiracharya.turso.io",
    authToken: process.env.DB_TOKEN || "test",
});

const auth0domain = "dev-yhky5tc13kqipv2f.us.auth0.com"

await client.sync();

const app = express();
app.use(express.static("dist"))
app.use(cors());
app.use(express.json())

const games = ["reaction_time", "memory_test", "sequence_memory", "aim_trainer", "typing_test"]

app.get('/api/scores', async (req, res) => {
    await client.sync();
    const game = req.query.game;
    const username = req.query.username;

    if (!game) {
        res.status(400).json({ error: 'Missing game' });
        return;
    }

    // Must do this check to prevent SQLi, can't prepare table names
    if (!games.includes(game)) {
        res.status(400).json({ error: 'Invalid game' });
        return;
    }

    let scores = null;
    if (!username) {
      scores = await client.execute(`SELECT ${game}.score, ${game}.timestamp, users.username FROM ${game} JOIN users ON ${game}.user_id = users.id ORDER BY ${game}.score DESC`);
    } else {
      scores = await client.execute({sql:`SELECT ${game}.score, ${game}.timestamp, users.username FROM ${game} JOIN users ON ${game}.user_id = users.id WHERE users.username = ? ORDER BY ${game}.score DESC`, args:[username]});
    }
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

  if (!game || (!score && score !== 0)) {
    res.status(400).json({ error: 'Missing game or score' });
    return;
  }

  // Must do this check to prevent SQLi, can't prepare table names
  if (!games.includes(game)) {
    res.status(400).json({ error: 'Invalid game' });
    return;
  }

  console.log(game, score);

  fetch(`https://${auth0domain}/userinfo`, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  }).then(async (response) => {
    const data = await response.json();
    const auth0id = data.sub;
    const username = data.nickname;

    let user = await client.execute({sql:`SELECT * FROM users WHERE auth0id = ?`, args:[auth0id]});
    if (user["rows"].length === 0) {
      await client.execute({sql:`INSERT INTO users (auth0id, username) VALUES (?, ?)`, args:[auth0id, username]});
      await client.sync();
      user = await client.execute({sql:`SELECT * FROM users WHERE auth0id = ?`, args:[auth0id]});
    }

    const user_id = user["rows"][0]["id"];

    const resp = await client.execute({sql:`INSERT INTO ${game} (user_id, score, timestamp) VALUES (?, ?, ?)`, args:[user_id, score, Date.now()]});
    
    const highscore_id = await client.execute({sql:`SELECT best_${game} FROM users WHERE auth0id = ?`, args:[auth0id]});
    if (highscore_id["rows"].length === 0) {
      await client.execute({sql:`UPDATE users SET best_${game} = ? WHERE auth0id = ?`, args:[parseInt(resp.toJSON().lastInsertRowid), auth0id]});
    } else {
      const highscore = await client.execute({sql:`SELECT score FROM ${game} WHERE id = ?`, args:[highscore_id["rows"][0][`best_${game}`]]});
      if (highscore["rows"].length > 0 && highscore["rows"][0]["score"] < score) {
        await client.execute({sql:`UPDATE users SET best_${game} = ? WHERE auth0id = ?`, args:[parseInt(resp.toJSON().lastInsertRowid), auth0id]});
      }
    }
  });
});

app.get('/api/top10', async (req, res) => {
  await client.sync();
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

  const scores = await client.execute(`SELECT ${game}.score, ${game}.timestamp, users.username FROM ${game} JOIN users ON ${game}.user_id = users.id WHERE ${game}.id IN (SELECT MAX(${game}.id) FROM ${game} GROUP BY ${game}.user_id) ORDER BY ${game}.score DESC LIMIT 10`);
  res.json(scores["rows"]);
});

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});