CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  auth0id TEXT NOT NULL UNIQUE,
  best_reaction_time INTEGER,
  best_memory_test INTEGER,
  best_sequence_memory INTEGER,
  best_aim_trainer INTEGER,
  best_typing_test INTEGER,
  FOREIGN KEY (best_reaction_time) REFERENCES reaction_time(id),
  FOREIGN KEY (best_memory_test) REFERENCES memory_test(id),
  FOREIGN KEY (best_sequence_memory) REFERENCES sequence_memory(id),
  FOREIGN KEY (best_aim_trainer) REFERENCES aim_trainer(id),
  FOREIGN KEY (best_typing_test) REFERENCES typing_test(id)
);

CREATE TABLE reaction_time (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  score FLOAT NOT NULL,
  timestamp TIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE memory_test (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  timestamp TIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sequence_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  timestamp TIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE aim_trainer (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  timestamp TIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE typing_test (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  score FLOAT NOT NULL,
  timestamp TIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
