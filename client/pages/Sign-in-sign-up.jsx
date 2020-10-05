import React from 'react';

import SignIn from '../components/Sign-in.jsx'; 
import SignUp from '../components/Sign-up.jsx';

import './Sign-in-sign-up.styles.scss';

const SignInSignUpPage = () => {
  return (
  <div className='sign-in-sign-up'>
    <SignIn />
    <SignUp /> 
  </div>
  )
}

export default SignInSignUpPage;