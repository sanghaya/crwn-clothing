import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert('Payment successful');
}


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const perishableKey = 'pk_test_CAhuu1yaGxjSbuUSPpXU8ZIk00NNUkUV51'
    
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={perishableKey}/>    
    );
};


export default StripeCheckoutButton;