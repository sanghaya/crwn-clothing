import { takeEvery, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionSnapshotsToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';
import {    fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        //const collectionsMap = convertCollectionSnapshotsToMap(snapshot);
        const collectionsMap = yield call(convertCollectionSnapshotsToMap,snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

