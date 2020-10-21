import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/HomePage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import OwnersPage from './pages/OwnersPage.jsx';
import DogsPage from './pages/DogsPage.jsx';
import SignInSignUpPage from './pages/Sign-in-sign-up.jsx';
import TripDetail from './components/TripDetail.jsx';
import Header from './components/Header.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if user signs in, we should receive userAuth
      if (userAuth) {
        // go to firebase.utils.js to see what this func is
        // create a user object in db if there isn't one (if it's there, the func will pass back userRef)
        const userRef = await createUserProfileDocument(userAuth);

        // onSnapshot sends us an objects representing the data that is currently stored in db
        // calling onSnapshot is very simillar to calling onAuthStateChanged, it detects ANY change and update state!
        // console.log out to see!
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth); // do something here)
    });
  }

  componentWillUnmount() {
    //do somthing here (unsubscribe from auth);
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/trips/:tripId" component={TripDetail} />
          <Route exact path="/trips" component={TripsPage} />
          <Route exact path="/owners" component={OwnersPage} />
          <Route exact path="/dogs" component={DogsPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInSignUpPage />
              )
            }
          />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  // the parameter 'user' comes from destructuring state from store
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
