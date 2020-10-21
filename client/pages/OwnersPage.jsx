import React from 'react';

import Owners from '../components/Owners.jsx';

import './OwnersPage.scss';

const OwnersPage = () => {
  return (
    <div className="owners-page">
      <h1>Meet Other Owners!</h1>
      <Owners />
    </div>
  );
};

export default OwnersPage;
