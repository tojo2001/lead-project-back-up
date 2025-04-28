// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNvxl4BImyk6BW_1_soPbcjujtTAyw58g",
  authDomain: "lead-project-ea192.firebaseapp.com",
  projectId: "lead-project-ea192",
  storageBucket: "lead-project-ea192.firebasestorage.app",
  messagingSenderId: "18196531846",
  appId: "1:18196531846:web:9484026cf5469ecb4cdf07",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
