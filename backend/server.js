const express = require('express');
const products = require('./data/products');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(
  5000,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);