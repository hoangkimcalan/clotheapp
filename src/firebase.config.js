import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6vHJo1bgAdxPIY5E19Q2ZsdJW7D7AYOw",
    authDomain: "n3vergoneshop.firebaseapp.com",
    databaseURL: "https://n3vergoneshop-default-rtdb.firebaseio.com",
    projectId: "n3vergoneshop",
    storageBucket: "n3vergoneshop.appspot.com",
    messagingSenderId: "524780979373",
    appId: "1:524780979373:web:6967a063dd99520ff97224",
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
