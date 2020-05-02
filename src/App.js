import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  constructor() {
    super();

    this.state= {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => { //subscribe and listen to user reference
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            } 
          });
          console.log(this.state);
        });
        console.log(this.state); //why null here?
      }
      this.setState({ currentUser: userAuth }); // same as snapShot.data()?
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //unsubscribe automatically because as the DOM unmounts, the auth will go off?
  }

  render() {
     return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path = '/' component={Homepage}/>
          <Route path= '/shop' component={ShopPage}/>
          <Route path= '/signin' component={SignInAndSignUpPage}/>
        </Switch> 
      </div>
  
    )
  }
}

export default App;
