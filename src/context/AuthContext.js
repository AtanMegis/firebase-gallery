import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const authContext = createContext();

export const useAuth = () => {
	return useContext(authContext);
};

const AuthContext = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [modal, setModal] = useState({
		isOpen: false,
		title: '',
		content: '',
	});
	const [alert, setAlert] = useState({
		isAlert: false,
		severity: 'info',
		message: '',
		timeout: null,
		location: '',
	});
	const [loading, setLoading] = useState(false);

	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			console.log('user status changed', user);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		login,
		logout,
		modal,
		setModal,
		loginWithGoogle,
		alert,
		setAlert,
		loading,
		setLoading,
	};
	return (
		<authContext.Provider {...{ value }}>{children}</authContext.Provider>
	);
};

export default AuthContext;
