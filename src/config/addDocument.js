import { db } from './firebase';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';

const addDocument = (collectionName, documentObj, id) => {
	const docRef = doc(collection(db, collectionName), id);
	return setDoc(docRef, {
		...documentObj,
		timestamp: serverTimestamp(),
	});
};

export default addDocument;
