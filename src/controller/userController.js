const db = require('../models/database');
const bcrypt = require('bcrypt');

exports.showRegisterForm = (req, res) => {
    res.render('users/register');
};

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], function(err) {
        if (err) {
            return res.status(500).send("Error registering user.");
        }
        res.redirect('/login');
    });
};

exports.showLoginForm = (req, res) => {
    res.render('users/login');
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user) {
            return res.status(400).send("User not found.");
        }
        if (bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/profile');
        } else {
            res.status(400).send("Invalid password.");
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

exports.showProfile = (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err || !user) {
            return res.status(400).send("User not found.");
        }
        res.render('users/profile', { user });
    });
};

exports.updateProfile = (req, res) => {
    const { name, email } = req.body;
    const userId = req.session.userId;
    db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], function(err) {
        if (err) {
            return res.status(500).send("Error updating profile.");
        }
        res.redirect('/profile');
    });
};
