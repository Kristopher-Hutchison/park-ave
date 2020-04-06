import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCE6DFkQ3XFIQLragpSm3AE4ixVB5J19hk",
  authDomain: "park-ave-369ec.firebaseapp.com",
  databaseURL: "https://park-ave-369ec.firebaseio.com",
  projectId: "park-ave-369ec",
  storageBucket: "park-ave-369ec.appspot.com",
  messagingSenderId: "600266294684",
  appId: "1:600266294684:web:225a1b12d15c2229e8f459",
  measurementId: "G-BBX4TKGDXH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
