import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("authUser"))
	);
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged((authUser) => {
			// if there is a user ... therefore we can store the user in the localstorage
			if (authUser) {
				localStorage.setItem("authUser", JSON.stringify(authUser));
				setUser(authUser);
			} else {
				// we don't have an authUser, therefore clean the localstorage
				localStorage.removeItem("authUser");
				setUser(null);
			}
		});

		return () => listener();
	}, [firebase]);

	return { user };
}
