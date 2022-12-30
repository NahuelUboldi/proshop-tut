import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';
function HomeScreen() {
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
