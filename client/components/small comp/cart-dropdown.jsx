import React from 'react';

import './cart-dropdown.scss';

import CustomButton from './custom-button.jsx';

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items" />
    <CustomButton>CHECK OUT</CustomButton>
  </div>
);

export default CartDropdown;
