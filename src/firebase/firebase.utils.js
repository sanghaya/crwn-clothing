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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;