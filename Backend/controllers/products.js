const Product = require('../models/product');

// Get all products
async function getAllProducts (req, res) {
  try {
    // include:category
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
async function getProductById (req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new product
async function createProduct(req, res) {
  const { name, image, discription, price, categoryId } = req.body;
  try {
    const product = await Product.create({ name, image, discription, price, categoryId });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing product by ID
async function updateProduct(req, res) {
  const { name, image, discription, price, categoryId } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    product.name = name;
    product.image = image;
    product.description = discription;
    product.price = price;
    product.categoryId = categoryId
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an existing product by ID

async function deleteProduct(req, res)  {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    await product.destroy();
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}

