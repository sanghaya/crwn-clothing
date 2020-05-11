import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';


const CartDropdown= ({cartItems}) => (
    <div className='cart-dropdown'>
        {
            cartItems.map(cartItem =>
            <CartItem key = {cartItem.id} item={cartItem}/>)
        }
        <CustomButton>Go To Check Out</CustomButton>
    </div>
);

const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);