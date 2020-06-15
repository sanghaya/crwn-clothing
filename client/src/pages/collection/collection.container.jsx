import { connect } from 'react-redux';
import { compose } from 'redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';
import { selectCollectionLoaded } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectCollectionLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner   
)(CollectionPage);

export default CollectionPageContainer;