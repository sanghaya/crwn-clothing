import React, { useState }  from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'; 
import { connect } from 'react-redux';

const SignIn = ({emailSignIn, googleSignIn}) =>  {
   
    const [userCredentials, setCredentials] = useState({email: '', password: ''})

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignIn(email, password);
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value});
    }


    return (
        <div className='sign-in'>
            <h2> I already have an account </h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                name='email' 
                type='email' 
                value={email}
                label='Email'
                handleChange={handleChange} required />
                
                <FormInput
                name='password' 
                type='password' 
                value={password}
                label='Password'
                handleChange={handleChange} required />
            
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={ googleSignIn } isGoogleSignIn> 
                        Sign In With Google
                    </CustomButton>
                </div>
                
            </form>
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    googleSignIn: () => dispatch(googleSignInStart()),
    emailSignIn: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
