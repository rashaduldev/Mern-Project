// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs_1QYNQLFVccmCIbGEnuY8HJdMSYawK8",
  authDomain: "mern-office-project.firebaseapp.com",
  projectId: "mern-office-project",
  storageBucket: "mern-office-project.appspot.com",
  messagingSenderId: "136450772647",
  appId: "1:136450772647:web:d1a5960a9e1c3869685582"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;