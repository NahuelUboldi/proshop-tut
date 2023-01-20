import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/features/cartSlice';
import axios from 'axios';

function CartScreen() {
  let { id } = useParams();
  let [search] = useSearchParams();
  let qty = search.get('qty');
  const [item, setItem] = useState({});

  useEffect(() => {
    async function getItem(id) {
      const url = `http://localhost:5000/api/products/${id}`;
      const { data } = await axios.get(url);
      setItem(data);
    }
    getItem(id);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const isItemPased = Object.keys(item).length > 0;
    if (isItemPased) {
      dispatch(addCartItem({ item, qty }));
    }
  }, [item, dispatch, id]);
  return (
    <div>
      <h3>id: {id}</h3>
      <h3>qty: {qty}</h3>
    </div>
  );
}

export default CartScreen;
