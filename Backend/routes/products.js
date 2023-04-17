const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
 const jwt_authenticate = require ("../jwt/jwt_authenticate")


 // Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/createproduct',jwt_authenticate.authenticateAdminToken,productController.createProduct);

// Update an existing product by ID
router.put('/update/:id',jwt_authenticate.authenticateAdminToken, productController.updateProduct);

// Delete an existing product by ID
router.delete('/delete/:id',jwt_authenticate.authenticateAdminToken,productController.deleteProduct);

module.exports = router;