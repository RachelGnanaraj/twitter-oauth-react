import * as firebase from 'firebase';
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDcVRz3Yze7uf-9WeYmF0MyWEXOoYxbubE',
  authDomain: 'twitter-oauth-461e3.firebaseapp.com',
  databaseURL: 'https://twitter-oauth-461e3.firebaseio.com',
  projectId: 'twitter-oauth-461e3',
  storageBucket: 'twitter-oauth-461e3.appspot.com',
  messagingSenderId: '51576798439'
};

firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();

