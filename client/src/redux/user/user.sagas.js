import { takeLatest, call, put, all } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import { SignInSuccess, SignInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';


export function* createProfilefromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(SignInFailure(error));
    }
}

export function* googleSignInAsync() {

    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield createProfilefromUserAuth(user);
    } catch (error) {
        yield put(SignInFailure(error));
    }

}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignInAsync);
}


export function* emailSignInAsync({payload: {email, password}}) {

    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield createProfilefromUserAuth(user);
    } catch (error) {
        yield put(SignInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield createProfilefromUserAuth(userAuth); 
    } catch (error) {
        yield put(SignInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* isUserSignedOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onUserSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, isUserSignedOut)
}


export function* userSignInAfterSignUp({payload: {user, additionalData}}) {
    yield createProfilefromUserAuth(user, additionalData);
}

export function* onSignUpSuccess(user) {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, userSignInAfterSignUp)
};

export function* userSigningUp({payload: {email, password, displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
 
}

export function* onUserSignUp() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, userSigningUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onUserSignOut),
        call(onUserSignUp),
        call(onSignUpSuccess)
    ]);
}


