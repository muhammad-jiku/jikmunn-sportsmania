import React from 'react';
import { Link } from 'react-router-dom';

const CartCard = ({ item, deleteCartItems }) => {
  return (
    <div>
      <img src={item.image} alt={item?.name} width={275} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: $ ${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartCard;
