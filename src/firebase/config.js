import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




const firebaseConfig = {

    apiKey: "AIzaSyDXKP9uewX0bKNMiPDZnhUl-Bo_oEL6Y04",

    authDomain: "teste-2ca6a.firebaseapp.com",

    projectId: "teste-2ca6a",

    storageBucket: "teste-2ca6a.appspot.com",

    messagingSenderId: "36148959685",

    appId: "1:36148959685:web:d59cbbf9a30da182ef53ac",

    measurementId: "G-PZE50CM7KV"

};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


const db = getFirestore(app);

export { db, app, auth };

