// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsPpAIrOjNzba3GK54LvQXJdgE5ch3q-c",
  authDomain: "document-5211b.firebaseapp.com",
  projectId: "document-5211b",
  storageBucket: "document-5211b.appspot.com",
  messagingSenderId: "1068365376616",
  appId: "1:1068365376616:web:d7253da343757c52471fdd",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);