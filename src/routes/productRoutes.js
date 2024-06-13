const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.list);
router.get('/products/create', productController.showCreateForm);
router.post('/products/create', productController.create);
router.get('/products/edit/:id', productController.showEditForm);
router.post('/products/edit/:id', productController.update);
router.post('/products/delete/:id', productController.delete);

module.exports = router;
