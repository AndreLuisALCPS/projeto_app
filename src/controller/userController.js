const User = require('../models/user');

const userController = {
    registerUser: function(req, res) {
        const { username, password, email } = req.body;
        User.createUser(username, password, email, (err, userId) => {
            if (err) {
                return res.render('error.html', { message: 'Erro ao cadastrar usuário' });
            }
            res.redirect('/login');
        });
    },

    updateUser: function(req, res) {
        const { id, username, email } = req.body;
        User.updateUser(id, username, email, (err) => {
            if (err) {
                return res.render('error.html', { message: 'Erro ao atualizar usuário' });
            }
            res.redirect('/profile');
        });
    }
};

module.exports = userController;
