// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1VI2TxW_a991cHPLOz9kM8_LUkTBSm5k",
  authDomain: "netflixgpt-be971.firebaseapp.com",
  projectId: "netflixgpt-be971",
  storageBucket: "netflixgpt-be971.appspot.com",
  messagingSenderId: "968827512504",
  appId: "1:968827512504:web:9726e4adddf1e331c0f64d",
  measurementId: "G-GS61VRX6EL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
