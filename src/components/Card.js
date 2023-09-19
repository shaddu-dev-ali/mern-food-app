import { React, useEffect, useState, useRef } from 'react';
import {
  useCartDispatch,
  useCartState,
} from './contextReducer';

export default function Card({ foodItem, options }) {
  let dispatch = useCartDispatch();
  let data = useCartState();
  const priceRef = useRef();

  let keys = Object.keys(options).filter(
    (opt) => opt !== '_id'
  );
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== []) {
      if (food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: foodItem._id,

          price: finalPrice,

          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          img: foodItem.img,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      img: foodItem.img,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mb-5" style={{ width: '18rem' }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: '200px', objectFit: 'fill' }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.title}</h5>
          <p className="card-text fs-5">{foodItem.name}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success fs-5 text-white"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded fs-5 text-white"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {keys.map((opt) => {
                return (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">
              {finalPrice}/-
            </div>
            <hr></hr>
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddtoCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
