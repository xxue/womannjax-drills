import React from 'react';
import Topnav from './topnav'
import Home from './home';
import CreateDrillGroup from './CreateDrillGroup';
import ManageDrillGroups from './ManageDrillGroups';
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
    this.signIn = this.signIn.bind(this);
  }

  signIn  (event) {
    event.preventDefault();
    const {target} = event;
    const email = target.querySelector('#formHorizontalEmail').value;
    const password = target.querySelector('#formHorizontalPassword').value;
    fetch('http://localhost:3000/sessions',{
    	credentials: 'include',
    	method: 'post',
    	mode: 'cors',
    	body: JSON.stringify({username: `${email}`,password:`${password}`}),
    	headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(r=>r.json())
    .then((json)=>{
      this.setState({ path: json.path, user: json.user})
    })
    .catch(console.error)
  }

  render () {
    // this is where we'll have all the switch statements to render
    // the page we want, based on the state

//     if (this.state.path==='/'){
//     }

        {/* <CreateDrillGroup drillGroup={""}/>
        <ManageDrillGroups /> */}
        if (this.state.path === '/' ) {

          return <SignIn onSubmit={this.signIn}/>
        } else {
          return <DisplayMessage text={this.state.user.first_name} />
        }
  }
}
