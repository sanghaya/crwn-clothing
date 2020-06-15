import React from 'react';

import { selectCartTotal, selectCartItems } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckOutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span> Product </span>
            </div>
            <div className='header-block'>
                <span> Description </span>
            </div> 
            <div className='header-block'>
                <span> Quantity </span>
            </div> 
            <div className='header-block'>
                <span> Price </span>
            </div> 
            <div className='header-block'>
                <span> Remove </span>
            </div> 
        </div>
        {
            cartItems.map(cartItem =>
               <CheckoutItem id={cartItem.id} cartItem={cartItem}></CheckoutItem>
            )
        }
        <div className='total'> TOTAL: ${total} </div>
        <div className='test-warning'>
            * Please use the following test card details
            <br/>
            4242 4242 4242 4242 Exp: 01/23 CVV: 123
        </div>
        <StripeCheckoutButton price={total}></StripeCheckoutButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckOutPage)