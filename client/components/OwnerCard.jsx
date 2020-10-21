import React from 'react';
import { withRouter } from 'react-router-dom';

import './OwnerCard.scss';

const OwnerCard = ({ firstName, imageUrl, detailsUrl, age, intro, dog }) => {
  return (
    <div className="owner-item">
      <div className="owner-content">
        <img src={imageUrl} alt="profile-pic" className="profile-pic" />
        <span className="owner-name">{`${firstName.toUpperCase()}, ${age}`}</span>
        <span>{`I have a ${dog}!`}</span>
        <br />
        <span className="owner-intro">{intro}</span>
        <button className="owner-card-btn">
          <a href={detailsUrl}>{`Message ${firstName}`}</a>
        </button>
      </div>
    </div>
  );
};

export default withRouter(OwnerCard);
