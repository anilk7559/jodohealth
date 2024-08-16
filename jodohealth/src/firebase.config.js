import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  // apiKey: "AIzaSyBEW9QllsW9lIjxAEMTQQ5su0bVEMDCO3U",
  // authDomain: "testotp-8e747.firebaseapp.com",
  // projectId: "testotp-8e747",
  // storageBucket: "testotp-8e747.appspot.com",
  // messagingSenderId: "96683713394",
  // appId: "1:96683713394:web:69778577e582d81e8933eb",
  // measurementId: "G-CLJ97991TM"
  apiKey: "AIzaSyBq-QuLGStIkxEBMwy8GzW6nl77ZS6P4lU",
  authDomain: "jodohealth-project.firebaseapp.com",
  projectId: "jodohealth-project",
  storageBucket: "jodohealth-project.appspot.com",
  messagingSenderId: "329544171917",
  appId: "1:329544171917:web:06434f280e0f1f34217dc4",
  measurementId: "G-Z9HHQMBW03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
