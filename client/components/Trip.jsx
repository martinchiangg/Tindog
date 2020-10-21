import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Trip.scss';

const Trip = ({
  title,
  imageUrl,
  destination,
  price,
  date,
  detailsUrl,
  history,
  match,
}) => {
  return (
    <Link className="option" to={detailsUrl}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="trip-item"
        onClick={() => {
          console.log('clicked!');
          // history.push(`${match.url}${detailsUrl}`);
        }}
      >
        {/* <img src={imageUrl} /> */}
        <div className="trip-content">
          <h1 className="trip-title">{title.toUpperCase()}</h1>
          <span>{destination}</span>
          <span className="trip-subtitle">{date}</span>
          {/* <span className="trip-subtitle">{'$' + price}</span> */}
          {/* <Link className="option" to={detailsUrl}>
            <button>See details</button>
          </Link> */}
        </div>
      </div>
    </Link>
  );
};

export default withRouter(Trip);
