import { createSelector } from 'reselect';

const shop_data = state => state.shop;

export const selectCollections = createSelector(
    [shop_data],
    shop_data => shop_data.collections
);

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
)

export const selectCollectionForPreview =  createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []

);

export const selectCollectionFetching = createSelector(
    shop_data,
    shop => shop.isFetching
);

export const selectCollectionLoaded = createSelector(
    shop_data,
    shop => !!shop.collections
);


export default { selectCollection, selectCollectionForPreview};

