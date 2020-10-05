import React from 'react';
import FormInput from './small comp/form-input.jsx';
import CustomButton from './small comp/custom-button.jsx';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      intro: '',
      age: '',
      dog: '',
      imageUrl: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      firstName,
      email,
      password,
      confirmPassword,
      intro,
      age,
      dog,
      imageUrl,
    } = this.state;

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    const OwnerData = {
      firstName,
      email,
      password,
      confirmPassword,
      intro,
      age,
      dog,
      imageUrl,
    };

    // fetch('http://localhost:3000/api/owners', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(OwnerData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success: ', data);
    //     this.setState({
    //       firstName: '',
    //       email: '',
    //       password: '',
    //       confirmPassword: '',
    //       intro: '',
    //       age: '',
    //       dog: '',
    //       imageUrl: '',
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('Error during posting: ', err);
    //   });

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { firstName });

      this.setState({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        intro: '',
        age: '',
        dog: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      email,
      password,
      confirmPassword,
      intro,
      age,
      dog,
      imageUrl,
    } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I Do Not Have An Account</h2>
        <span>Sign Up With Your Email and Password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="firstName"
            type="text"
            label="Your First Name"
            value={firstName}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="age"
            type="text"
            label="Your age"
            value={age}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="dog"
            type="text"
            label="Your dog's breed"
            value={dog}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="imageUrl"
            type="text"
            label="Your profile pic's url"
            value={imageUrl}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="intro"
            type="text"
            label="Introduce yourself"
            value={intro}
            onChange={this.handleChange}
            multiline={true}
            required
          />
          <CustomButton type="submit" onSubmit={this.handleSubmit}>
            {' '}
            Sign Up{' '}
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
