import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';


const CartDropdown= ({cartItems, history, dispatch}) => ( // why do we need to use history here?
    <div className='cart-dropdown'>
        {   
            cartItems.length ?
            cartItems.map(cartItem =>
            <CartItem key = {cartItem.id} item={cartItem}/>):
            <span className='empty-message'> Your cart is empty </span>
        }
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())}
        }>Go To Check Out</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));