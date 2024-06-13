const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

const User = {
    createUser: function(username, password, email, callback) {
        db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    getUserByUsername: function(username, callback) {
        db.get('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    getUserById: function(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], function(err, row) {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    updateUser: function(id, username, email, callback) {
        db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
};

module.exports = User;