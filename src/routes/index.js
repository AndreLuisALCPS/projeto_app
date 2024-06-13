const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./userRoutes');

router.use('/', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
