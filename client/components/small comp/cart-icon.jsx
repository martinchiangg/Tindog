import React from 'react';
import { connect } from 'react-redux';

import toggleCartHidden from '../../redux/cart/cart.actions';
import './cart-icon.scss';

const CartIcon = ({ toggleCartHidden }) => (
  <div
    className="cart-icon"
    onClick={() => {
      toggleCartHidden();
    }}
  >
    <img
      src="https://image.flaticon.com/icons/svg/669/669401.svg"
      className="shopping-icon"
    />
    <span className="item-count">0</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
