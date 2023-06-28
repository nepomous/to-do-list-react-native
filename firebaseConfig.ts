import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2gZ3fcvJ6YLdFkzehlzESkYNuBCQJyjs",
  authDomain: "todo-list-11e2f.firebaseapp.com",
  projectId: "todo-list-11e2f",
  storageBucket: "todo-list-11e2f.appspot.com",
  messagingSenderId: "977303315452",
  appId: "1:977303315452:web:10bb0d6187c660103b8879",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
