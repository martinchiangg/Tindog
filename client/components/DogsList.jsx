import React from 'react';
import './DogsList.scss';

import DogCard from './DogCard.jsx';

class DogsList extends React.Component {
  constructor() {
    super();

    this.state = {
      dogs: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/dogs')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dogs: data,
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
    const { error, isLoaded, dogs } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="dogs-container">
          {dogs.map(({ id, petName, imageUrl, age, breed, intro }) => (
            <DogCard
              key={`dog ${id}`}
              petName={petName}
              age={age}
              intro={intro}
              imageUrl={imageUrl}
              breed={breed}
            />
          ))}
        </div>
      );
    }
  }
}

export default DogsList;
