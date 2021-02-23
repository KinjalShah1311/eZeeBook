import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });
//Todo: get from env files
const app = firebase.initializeApp({
  apiKey: 'AIzaSyAxknPf-xiyxv7MqM-WR0xEAxihPl0yTRc',
  authDomain: 'ezeebook-dev.firebaseapp.com',
  projectId: 'ezeebook-dev',
  storageBucket: 'ezeebook-dev.appspot.com',
  messagingSenderId: '1040461298600',
  appId: '1:1040461298600:web:80ccde9b218783b67bfb9d',
});

const { Storage } = require('@google-cloud/storage');
export const storage = new Storage({
  projectId: "ezeebook-dev",
  keyFilename: "C:/Users/Tushar/Documents/GitHub/ezeebook-dev-7c94458bf7d6.json"
});

export const bucketName = 'gs://ezeebook-dev.appspot.com'
export const auth = app.auth()
export default app;

