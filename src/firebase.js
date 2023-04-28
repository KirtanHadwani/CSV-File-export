// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBVP9J31yOsRoZ_4DsvY5JtOayBRTxZEto",

  authDomain: "lastexam-b37c8.firebaseapp.com",

  projectId: "lastexam-b37c8",

  storageBucket: "lastexam-b37c8.appspot.com",

  messagingSenderId: "1075275950476",

  appId: "1:1075275950476:web:2fa77eb77949675a364ea9"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app); 