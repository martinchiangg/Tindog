import React from 'react';
import './owners.styles.scss';

import OwnerCard from './OwnerCard.jsx';

class Owners extends React.Component {
  constructor() {
    super();

    this.state = {
      owners: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/owners')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          owners: data,
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
    const { error, isLoaded, owners } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="owners-container">
          {owners.map(({ firstName, imageUrl, id, detailsUrl, age, intro, dog }) => (
            <OwnerCard
              key={id}
              firstName={firstName}
              age={age}
              intro={intro}
              imageUrl={imageUrl}
              detailsUrl={detailsUrl}
              dog={dog}
            />
          ))}
        </div>
      );
    }
  }
}

export default Owners;
