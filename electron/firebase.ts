import { FirebaseOptions } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Firebase configuration from the Firebase console
const firebaseConfig: FirebaseOptions = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database();
