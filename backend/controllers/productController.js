import expressAsyncHandler from 'express-async-handler'; // to avoid using try catch in every route
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = expressAsyncHandler(async (req, res) => {
  const product = await Product.find({});
  res.json(product);
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProductById, getProducts };
