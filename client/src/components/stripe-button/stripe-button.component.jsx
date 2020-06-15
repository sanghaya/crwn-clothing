import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';




const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const perishableKey = 'pk_test_CAhuu1yaGxjSbuUSPpXU8ZIk00NNUkUV51'
    
    const onToken = token => {
        axios({
            url: '/payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then(response => {
            alert('Payment is successful');
        })
        .catch(error => {
            console.log(error);
            alert('Please use the provided fake credit card');
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            //image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={perishableKey}/>    
    );
};


export default StripeCheckoutButton;