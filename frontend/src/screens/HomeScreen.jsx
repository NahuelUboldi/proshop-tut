import { useState, useEffect } from 'react';

import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useSelector } from 'react-redux';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products');

      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Lates Products</h1>
      <Row>
        {products.map((prod) => {
          return (
            <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
              <Product prod={prod} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default HomeScreen;
