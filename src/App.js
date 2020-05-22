import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import CheckOutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';



class App extends React.Component {

  // constructor() {
  //   super();

  //   this.state= {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null

  componentDidMount() {

    const { setCurrentUser } = this.props; //de-construct?

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => { //subscribe and listen to user reference
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data() 
          });
        });
        //why null here? console.log(this.state); 
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //unsubscribe automatically because as the DOM unmounts, the auth will go off?
  }

  render() {
     return (
      <div>
        <Header/>
        <Switch> 
          <Route exact path = '/' component={Homepage}/>
          <Route path= '/shop' component={ShopPage}/>
          <Route exact path= '/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : <SignInAndSignUpPage/>}/>
          <Route exact path= '/checkout' component={CheckOutPage}/>
        </Switch> 
      </div>
  
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) // make setCurrentUser into a prop
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
