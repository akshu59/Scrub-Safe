import firebase from "firebase/compat/app";

// import firebase from "@react-native-firebase/app";
// import auth from "@react-native-firebase/auth";
// import database from "@react-native-firebase/database";
// import storage from "@react-native-firebase/storage";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOkD-IBhO9uOjbVc-HBhwWyDMqz49NZUk",
  authDomain: "health-app-f81d5.firebaseapp.com",
  projectId: "health-app-f81d5",
  storageBucket: "health-app-f81d5.appspot.com",
  messagingSenderId: "736076196460",
  appId: "1:736076196460:web:716957944adca062800649",
  measurementId: "G-48THKYRPJS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export { firebase };
