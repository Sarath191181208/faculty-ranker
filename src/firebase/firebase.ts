// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeQTyQF_2w4f_TdBz3v_vqX2lToiyCK0k",
    authDomain: "faculty-ranker.firebaseapp.com",
    projectId: "faculty-ranker",
    storageBucket: "faculty-ranker.appspot.com",
    messagingSenderId: "40238234411",
    appId: "1:40238234411:web:0558c965616ec79e9a236e",
    measurementId: "G-HQRYPE1E2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// import firestore 