import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/features/productListSlice';

function HomeScreen() {
  const { loading, products, status, error } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <h1>Lates Products</h1>
      <Row>
        {loading && <Loader />}
        {!loading && error ? <Message variant='danger'>{error}</Message> : null}
        {!loading && products.length === 0 ? (
          <Message>"There are no products to show"</Message>
        ) : null}
        {!loading && products.length > 0
          ? products.map((prod) => {
              return (
                <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                  <Product prod={prod} />
                </Col>
              );
            })
          : null}
      </Row>
    </>
  );
}

export default HomeScreen;
