import { getFirestore } from "firebase/firestore";
import { getApp, getApps } from "firebase/app";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-1befDGphjd-lqumEZYohHsaLui_uxhU",
  authDomain: "chatgptclone-87c71.firebaseapp.com",
  projectId: "chatgptclone-87c71",
  storageBucket: "chatgptclone-87c71.appspot.com",
  messagingSenderId: "122754808047",
  appId: "1:122754808047:web:e30b7525ff16748919c31a",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);

export {db};

