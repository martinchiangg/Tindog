import React from 'react';

import DogsList from '../components/DogsList.jsx';

import './dogs-page.styles.scss';

const DogsPage = () => {
  return (
    <div className="homepage">
      <h1>Meet Other Dogs!</h1>
      <DogsList className="dogs-list" />
    </div>
  );
};

export default DogsPage;
