import { useEffect, useState } from 'react';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../redux/features/cartSlice';
import axios from 'axios';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';

function CartScreen() {
  let { id } = useParams();
  let [search] = useSearchParams();
  let qty = Number(search.get('qty')) || 0;
  const [item, setItem] = useState({});
  useEffect(() => {
    if (id) {
      async function getItem() {
        const url = `http://localhost:5000/api/products/${id}`;
        const { data } = await axios.get(url);
        setItem(data);
      }
      getItem();
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const isItemPased = Object.keys(item).length > 0;
    if (isItemPased) {
      dispatch(
        addCartItem({
          product: id,
          name: item.name,
          image: item.image,
          price: item.price,
          countInStock: item.countInStock,
          qty,
        })
      );
    }
  }, [item, dispatch, id]);

  const { cartItems } = useSelector((state) => state.cart);
  // useEffect(() => {
  //   if (cartItems) {
  //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //   }
  // }, [cartItems]);

  const changeQtyHandler = (item, e) => {
    dispatch(addCartItem({ ...item, qty: Number(e.target.value) }));
  };

  const removeFromCartHandler = (id) => {
    console.log('remove');
  };

  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => changeQtyHandler(item, e)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, item) => acc + Number(item.qty) * Number(item.price),
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className='d-grid gap-2'>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
