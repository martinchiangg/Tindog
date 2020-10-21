import React from 'react';

import SignIn from '../components/Sign-In.jsx'; 
import SignUp from '../components/Sign-Up.jsx';

import './Sign-in-sign-up.scss';

const SignInSignUpPage = () => {
  return (
  <div className='sign-in-sign-up'>
    <SignIn />
    <SignUp /> 
  </div>
  )
}

export default SignInSignUpPage;