import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../redux/features/cartSlice';
import axios from 'axios';

function CartScreen() {
  let { id } = useParams();
  let [search] = useSearchParams();
  let qty = search.get('qty');
  const [item, setItem] = useState({});
  useEffect(() => {
    async function getItem() {
      const url = `http://localhost:5000/api/products/${id}`;
      const { data } = await axios.get(url);
      setItem(data);
    }
    getItem();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const isItemPased = Object.keys(item).length > 0;
    if (isItemPased) {
      dispatch(
        addCartItem({
          product: item._id,
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
  useEffect(() => {
    console.log(cartItems.length, cartItems);
    if (cartItems) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div>
      <h3>{item.name}</h3>
      <h3>id: {id}</h3>
      <h3>qty: {qty}</h3>
    </div>
  );
}

export default CartScreen;
