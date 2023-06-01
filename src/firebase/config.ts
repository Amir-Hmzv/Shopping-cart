// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAahLr-feZAMJi2i_Owp828XHeuAlHGneg",
  authDomain: "my-shopping-2e9e5.firebaseapp.com",
  projectId: "my-shopping-2e9e5",
  storageBucket: "my-shopping-2e9e5.appspot.com",
  messagingSenderId: "465791009829",
  appId: "1:465791009829:web:78d827871075b760322bcc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth;

