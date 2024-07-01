// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8VeY6AptZ-XdCyxxivGuIvejD0y1fEJg",
    authDomain: "module50-7be1b.firebaseapp.com",
    projectId: "module50-7be1b",
    storageBucket: "module50-7be1b.appspot.com",
    messagingSenderId: "663043753279",
    appId: "1:663043753279:web:fdda040b9886d0881c3f8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
export default auth;
