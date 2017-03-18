import React from 'react';
import Home from './home';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
import DisplayMessage from './DisplayMessage';
import SignIn from './SignIn';



export default class Router extends React.Component {
  constructor (props) {
    super (props);
    this.state = { path: '/',
                   user:{
                     email: "",
                     token: "",
                     user_id: 2,
                     is_admin: false
                        }
                 }
  }

// find user is going to find the current user by their session and add it to the state
  // function FindUser(){
  //
  //     }

  render () {
    // this is where we'll have all the switch statements to render
    // the page we want, based on the state
    if (this.state.path==='/'){
      return  <DisplayMessage text="Hey friends" />

    }

  }
}
