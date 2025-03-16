// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHdSfPZMr6laUmctOA08X9e6r6Qqw8kpM",
  authDomain: "crowd-fund-64305.firebaseapp.com",
  projectId: "crowd-fund-64305",
  storageBucket: "crowd-fund-64305.firebasestorage.app",
  messagingSenderId: "634218020928",
  appId: "1:634218020928:web:b144e50359d9f30dfa1fa5",
  measurementId: "G-XJ5WK1JZCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app, analytics);

export default { auth , analytics, app };