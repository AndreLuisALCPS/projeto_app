const db = require('../models/database');

exports.showCreateForm = (req, res) => {
    res.render('products/create');
};

exports.create = (req, res) => {
    const { name, description, price } = req.body;
    const userId = req.session.userId;
    db.run('INSERT INTO products (name, description, price, userId) VALUES (?, ?, ?, ?)', [name, description, price, userId], function(err) {
        if (err) {
            return res.status(500).send("Error creating product.");
        }
        res.redirect('/products');
    });
};

exports.list = (req, res) => {
    db.all('SELECT * FROM products WHERE userId = ?', [req.session.userId], (err, products) => {
        if (err) {
            return res.status(500).send("Error fetching products.");
        }
        res.render('products/list', { products });
    });
};

exports.showEditForm = (req, res) => {
    const productId = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
        if (err || !product) {
            return res.status(400).send("Product not found.");
        }
        res.render('products/edit', { product });
    });
};

exports.update = (req, res) => {
    const { name, description, price } = req.body;
    const productId = req.params.id;
    db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, productId], function(err) {
        if (err) {
            return res.status(500).send("Error updating product.");
        }
        res.redirect('/products');
    });
};

exports.delete = (req, res) => {
    const productId = req.params.id;
    db.run('DELETE FROM products WHERE id = ?', [productId], function(err) {
        if (err) {
            return res.status(500).send("Error deleting product.");
        }
        res.redirect('/products');
    });
};