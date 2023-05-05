
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKwH6A2JOw64nL0iKezQWkumbLa9VHf6E",
  authDomain: "railway-ticket-booking-f54b7.firebaseapp.com",
  projectId: "railway-ticket-booking-f54b7",
  storageBucket: "railway-ticket-booking-f54b7.appspot.com",
  messagingSenderId: "294538013377",
  appId: "1:294538013377:web:9c3a78a95474e372a58240",
  measurementId: "G-WV89LWM8PY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { auth, db };