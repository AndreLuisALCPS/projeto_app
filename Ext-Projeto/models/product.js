const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, image TEXT)");
});

exports.addProduct = (name, description, price, image) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)", [name, description, price, image], function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
};

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM products", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.updateProduct = (id, name, description, price, image) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?", [name, description, price, image, id], function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};

exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};
