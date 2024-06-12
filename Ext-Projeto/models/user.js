const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, nickname TEXT, password TEXT, country TEXT)");
});

exports.registerUser = (email, nickname, password, country) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO users (email, nickname, password, country) VALUES (?, ?, ?, ?)", [email, nickname, password, country], function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
};

exports.getUserByEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.updateUser = (id, email, nickname, password, country) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE users SET email = ?, nickname = ?, password = ?, country = ? WHERE id = ?", [email, nickname, password, country, id], function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};
