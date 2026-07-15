import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//import { getAnalytics } from "firebase/analytics";
// Comentarios.
const firebaseConfig = {
  apiKey: "AIzaSyAA2h5M7VvwvrNoXXJWOrPi_fAstnE0mcg",
  authDomain: "react-app-course-beb68.firebaseapp.com",
  databaseURL: "https://react-app-course-beb68.firebaseio.com",
  projectId: "react-app-course-beb68",
  storageBucket: "react-app-course-beb68.firebasestorage.app",
  messagingSenderId: "393412421725",
  appId: "1:393412421725:web:6dc510e48d946f82ff45b4"
};
const app = initializeApp(firebaseConfig);
// Si agregaste Analytics verás esto además.
//const analytics = getAnalytics(app);
export const db = getFirestore(app)