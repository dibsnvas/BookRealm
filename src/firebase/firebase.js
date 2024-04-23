import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFE8njkzCF59seRJoNhuRbx32osbEH3NQ",
  authDomain: "bookrealmproject.firebaseapp.com",
  projectId: "bookrealmproject",
  storageBucket: "bookrealmproject.appspot.com",
  messagingSenderId: "121721940268",
  appId: "1:121721940268:web:79980634bceaa520452489",
  measurementId: "G-V0HSWTWLCR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
