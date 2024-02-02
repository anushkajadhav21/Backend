const express = require('express');
const router = express.Router();

const productController = require('./product.controller')

router.get('/',productController.getProduct);
router.post('/addProduct',productController.addProduct)
router.get('/:id',productController.productId)
router.delete('/:id',productController.deleteProduct)
router.put('/:id',productController.updateProduct)

module.exports = router;
