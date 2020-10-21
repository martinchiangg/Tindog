import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './TripDetail.scss';
import OwnerCard from './OwnerCard.jsx';
import DogCard from './DogCard.jsx';

//temp just for demo, dont forget to change render part (detail.onwers & detail.dogs)
import { owners, dogsList } from '../pages/HomePageDataForDetail';

class TripDetail extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      detail: {},
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    const url =
      'http://localhost:3000/api/trips/' + this.props.match.params.tripId;
    // console.log('url is: ', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          detail: data,
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
    const { error, isLoaded, detail } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="detail-container">
          <h1> {detail.title.toUpperCase()} </h1>
          <h2> {detail.destination} </h2>
          <img src={detail.imageUrl} alt="trip-img" />
          <h2> {detail.date} </h2>
          <h2> {'$ ' + detail.price} </h2>
          <div className="schedule">
            {detail.schedule.map((each) => (
              <h3>{each}</h3>
            ))}
            <a href="#" className="btn btn--white btn--animated">
              RESERVE MY SPOT
            </a>
          </div>
          <div className="attending-owners-div">
            <h1>These People Are Also Attending This Trip !</h1>
            <br />
            {owners.map(
              ({ firstName, imageUrl, id, detailsUrl, age, intro, dog }) => (
                <OwnerCard
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
          <div className="attending-dogs-div">
            <h1>These Dogs Will Be There As Well !</h1>
            <br />
            {dogsList.map(({ id, petName, imageUrl, age, breed, intro }) => (
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
          <a href="#" className="btn btn--white btn--animated">
            RESERVE MY SPOT
          </a>
          <br />
          <button
            className="back-btn"
            onClick={() => this.props.history.push('/trips')}
          >
            Back To Trips List
          </button>
        </div>
      );
    }
  }
}

export default withRouter(TripDetail);
