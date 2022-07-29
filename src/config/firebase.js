import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCj4GJeSeM8csDgdRXHZ8daBIrangTAJPo',
	authDomain: 'gallery-react-f88fa.firebaseapp.com',
	projectId: 'gallery-react-f88fa',
	storageBucket: 'gallery-react-f88fa.appspot.com',
	messagingSenderId: '32167611630',
	appId: '1:32167611630:web:00bf6247817c9eb90237ff',
	measurementId: 'G-70W0S35LSD',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
