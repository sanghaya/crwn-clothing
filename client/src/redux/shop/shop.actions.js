import ShopActionTypes from './shop.types';

import { firestore, convertCollectionSnapshotsToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => { //return a function which thunk will allow to be dispatched
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
     
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotsToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}