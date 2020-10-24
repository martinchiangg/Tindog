import React from 'react';

import Trip from '../components/Trip.jsx';

import OwnerCard from '../components/OwnerCard.jsx';

import { Link } from 'react-router-dom';

import './Homepage.scss';

import { owners, trips } from './HomePageData';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="first-container">
        <h3>
          WELCOME TO <h1 className="tindog">TINDOG</h1>
        </h3>
        <h3>Hang Out With Other Dog Owners</h3>
        <h3>Have Fun All Together With All The Dogs!</h3>
        <Link className="option" to="/signup">
          <a href="#" className="btn btn--white btn--animated">
            SIGN ME UP
          </a>
        </Link>
      </div>
      <div className="second-container">
        <h2>Make New Friends While</h2>
        <h2>Attending Dog Friendly Trips</h2>
        <div className="trip-list">
          {trips.map(
            ({
              title,
              imageUrl,
              tripId,
              detailsUrl,
              destination,
              price,
              date,
            }) => (
              <Trip
                key={`home-trip${tripId}`}
                title={title}
                imageUrl={imageUrl}
                destination={destination}
                price={price}
                detailsUrl={detailsUrl}
                date={date}
              />
            )
          )}
        </div>
        <Link className="option" to="/trips">
          <a href="/trips" className="btn btn--white btn--animated">
            MORE TRIPS
          </a>
        </Link>
      </div>
      <div className="third-container">
        <h1>Meet People Who Also Loves Their Dogs</h1>
        <div className="home-owners-list">
          {owners.map(
            ({ firstName, imageUrl, id, detailsUrl, age, intro, dog }) => (
              <OwnerCard
                className="owner-card-home"
                key={id}
                firstName={firstName}
                age={age}
                intro={intro}
                imageUrl={imageUrl}
                detailsUrl={detailsUrl}
                dog={dog}
              />
            )
          )}
        </div>
        <Link className="option" to="/owners">
          <a href="/owners" className="btn btn--white btn--animated">
            More owners
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
