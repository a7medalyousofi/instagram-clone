import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
	apiKey: "AIzaSyAZ-KRQZy8FolbW3necCZhoN7cVr0jII00",
	authDomain: "instagram-clone-19669.firebaseapp.com",
	projectId: "instagram-clone-19669",
	storageBucket: "instagram-clone-19669.appspot.com",
	messagingSenderId: "1022995100045",
	appId: "1:1022995100045:web:818c6fec1a6a33a8644dc4",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
