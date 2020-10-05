import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from './small comp/cart-icon.jsx';
import CarDropdown from './small comp/cart-dropdown.jsx';
import './header-styles.scss';
import CartDropdown from './small comp/cart-dropdown.jsx';

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <img
          src="https://i.pinimg.com/originals/b8/5f/58/b85f58e2e1e38407f50ea4e2cf30f08f.png"
          alt="logo"
          className="logo"
        />
      </Link>
      <div className="options">
        <Link className="option" to="/">
          HOME
        </Link>
        <Link className="option" to="/trips">
          TRIPS
        </Link>
        <Link className="option" to="/owners">
          OWNERS
        </Link>
        <Link className="option" to="/dogs">
          DOGS
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
            }}
          >
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

// below is advanced destructuring, double {}
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser, // equals currentUser: state.user.currentUser
  hidden,
});

export default connect(mapStateToProps)(Header);
