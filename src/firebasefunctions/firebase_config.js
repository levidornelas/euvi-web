import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Adicionada importação para persistência
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7D-m3ovzGDJs7ohNn-ytxrAggZS9r654",
  authDomain: "eu-vi-5aacf.firebaseapp.com",
  projectId: "eu-vi-5aacf",
  storageBucket: "eu-vi-5aacf.firebasestorage.app",
  messagingSenderId: "900279146414",
  appId: "1:900279146414:web:d3ba649535670319b8da3f",
  measurementId: "G-CPV71Q1338"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

// Configura persistência de autenticação para manter o usuário logado
setPersistence(authentication, browserLocalPersistence)
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error);
  });

export { app, authentication, firebaseConfig, db };
