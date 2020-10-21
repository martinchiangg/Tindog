import React from 'react';
import { withRouter } from 'react-router-dom';

import './DogCard.scss';

const DogCard = ({ petName, imageUrl, age, breed, intro }) => {
  return (
    <div className="dog-item">
      <div className="dog-content">
        <img src={imageUrl} alt="dog-profile-pic" className="dog-profile-pic" />
        <h1 className="dog-name">{petName.toUpperCase()}</h1>
        <span>{'Age: ' + age}</span>
        <br />
        <span>{'I am a... ' + breed + '!'}</span>
        <br />
        <span className="dog-intro">{intro}</span>
        <br />
        <button>{`Send ${petName}'s Owner a Message`}</button>
      </div>
    </div>
  );
};

export default withRouter(DogCard);
