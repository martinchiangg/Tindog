import React from 'react';
import './trip-list.styles.scss';

import Trip from './Trip.jsx';

class TripList extends React.Component {
  constructor() {
    super();

    this.state = {
      trips: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/trips')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          trips: data,
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.log('err is: ', error);
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, trips } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="trips-container">
          {trips.map(({ tripId, ...otherSectionProps }) => (
            <Trip key={`trip${tripId}`} {...otherSectionProps} />
          ))}
        </div>
      );
    }
  }
}

export default TripList;
