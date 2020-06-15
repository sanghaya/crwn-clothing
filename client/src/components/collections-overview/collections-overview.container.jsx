import { connect } from 'react-redux';
import { compose } from 'redux'; 
import { createStructuredSelector } from 'reselect';
import CollectionOverview from './collections-overview.component';
import { WithSpinner } from '../../components/with-spinner/with-spinner.component';
import { selectCollectionFetching } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading: selectCollectionFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner)
(CollectionOverview);

export default CollectionOverviewContainer;

