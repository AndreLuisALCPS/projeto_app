const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

const Product = {
    createProduct: function(name, description, price, callback) {
        db.run('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    getAllProducts: function(callback) {
        db.all('SELECT * FROM products', function(err, rows) {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
};

module.exports = Product;
