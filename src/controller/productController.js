const Product = require('../models/product');

const productController = {
    addProduct: function(req, res) {
        const { name, description, price } = req.body;
        Product.createProduct(name, description, price, (err, productId) => {
            if (err) {
                return res.render('error.html', { message: 'Erro ao cadastrar produto' });
            }
            res.redirect('/products');
        });
    },

    listProducts: function(req, res) {
        Product.getAllProducts((err, products) => {
            if (err) {
                return res.render('error.html', { message: 'Erro ao listar produtos' });
            }
            res.render('products.html', { products });
        });
    }
};

module.exports = productController;
