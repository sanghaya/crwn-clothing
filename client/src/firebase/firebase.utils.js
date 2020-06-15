import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBPUTvJ8GgZVx3wSYK-sJK2pax4rsWXVBg",
    authDomain: "crwn-db-abc2b.firebaseapp.com",
    databaseURL: "https://crwn-db-abc2b.firebaseio.com",
    projectId: "crwn-db-abc2b",
    storageBucket: "crwn-db-abc2b.appspot.com",
    messagingSenderId: "559704930229",
    appId: "1:559704930229:web:428f97829b2c3aad240bfc"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message);
        }
        
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};
 

export const convertCollectionSnapshotsToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items} = doc.data();
        
        return {
            routeName: encodeURI,
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) =>
        {accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;}, {});
};

export const getCurrentUser = () => { //confusing
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
    }, reject)
    });
}

export const auth = firebase.auth(); 
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });


export default firebase;