import { createSelector } from 'reselect';

const shop_data = state => state.shop;

export const selectCollections = createSelector(
    [shop_data],
    shop_data => shop_data.collections
);

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)

export const selectCollectionForPreview =  createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])

);

export default { selectCollection, selectCollectionForPreview};

