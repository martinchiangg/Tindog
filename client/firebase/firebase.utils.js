import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyByOAfcdVnjjcPmhl5GUx4msUYHjfmr0gA',
  authDomain: 'tindog-db.firebaseapp.com',
  databaseURL: 'https://tindog-db.firebaseio.com',
  projectId: 'tindog-db',
  storageBucket: 'tindog-db.appspot.com',
  messagingSenderId: '359977207871',
  appId: '1:359977207871:web:7821eb18e3dc7586e0108a',
  measurementId: 'G-5K8Q75MVQ7',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

// check db if user already exists, before creating user data
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // userAuth is a big object from google, we're saying if userAuth is null then just return
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); // query from firestore using uid in userAuth object
  const snapShot = await userRef.get(); // snapShot is an object from userRef.get()  (console.log the userRef!)

  if (!snapShot.exists) { // if this snapshot does not exist then we create user in our database
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
