import React from 'react';
import { withRouter } from 'react-router-dom';

import './owner-card.scss';

const OwnerCard = ({ firstName, imageUrl, detailsUrl, age, intro, dog }) => {
  return (
    // style={{ backgroundImage: `url(${imageUrl})` }}
    <div className="owner-item">
      {/* <img src={imageUrl} /> */}
      <div className="owner-content">
        <img src={imageUrl} alt="profile-pic" className="profile-pic" />
        <h1 className="owner-name">{firstName.toUpperCase()}</h1>
        <span>{'Age: ' + age}</span>
        <br />
        <span>{'I have a...' + dog + '!'}</span>
        <br />
        <span className="owner-intro">{intro}</span>
        <br />
        <button className="owner-card-btn">
          <a href={detailsUrl}>{`Send ${firstName} a Message`}</a>
        </button>
      </div>
    </div>
  );
};

export default withRouter(OwnerCard);
