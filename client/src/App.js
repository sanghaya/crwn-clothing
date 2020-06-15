import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import CheckOutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { CheckUserSession } from './redux/user/user.actions';


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();    
  }, [checkUserSession]);

  return (
    <div>
      <Header/>
      <Switch> 
        <Route exact path = '/' component={Homepage}/>
        <Route path= '/shop' component={ShopPage}/>
        <Route exact path= '/signin' render={() => currentUser ? (<Redirect to='/'/>) : <SignInAndSignUpPage/>}/>
        <Route exact path= '/checkout' component={CheckOutPage}/>
      </Switch> 
    </div>

  )
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(CheckUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
