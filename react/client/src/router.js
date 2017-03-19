import React from 'react';
import Topnav from './topnav'
import Home from './home';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
import DisplayMessage from './DisplayMessage';
import SignIn from './SignIn';
import UserDrillBoard from './UserDrillBoard';
import CreateDrillGroup from './CreateDrillGroup';

const BASE_URL = 'http://localhost:3000';

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
    this.createNewDrillGroup = this.createNewDrillGroup.bind(this);
  }

  signIn  (event) {
    event.preventDefault();
    const {target} = event;
    const email = target.querySelector('#formHorizontalEmail').value;
    const password = target.querySelector('#formHorizontalPassword').value;
    fetch(`${BASE_URL}/sessions`,{
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





  createNewDrillGroup (event) {
    event.preventDefault();
    const {target} = event;
    const name = target.querySelector('#drill-group-name').value;
    const description = target.querySelector('#drill-group-description').value;
    let level = ""; target.querySelectorAll('input[name="level"]')
      .forEach(radio=>{
        if (radio.checked){
          level = radio.value;
        }
      });

    fetch(`${BASE_URL}/drill-groups`,{
    	credentials: 'include',
    	method: 'POST',
    	mode: 'cors',
    	body: JSON.stringify({
          drillGroup: {
            name: `${name}`,
            description:`${description}`,
            level: `${level}`
          },
          user: {
            token: this.state.user.token
          }
      }),
    	headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(r=>r.json())
    .then((json)=>{
      console.log(json)
    })
    .catch(console.error)

  }






// find user is going to find the current user by their session and add it to the state
  // function FindUser(){
  //
  //     }

  render () {
    // this is where we'll have all the switch statements to render
    // the page we want, based on the state
//     if (this.state.path==='/'){
//     }

        {/*
        <ManageDrillGroups /> */}
        return <CreateDrillGroup onSubmit={this.createNewDrillGroup} drillGroup={""}/>
    // if (this.state.path === '/' ) {
    //
    //   return <SignIn onSubmit={this.signIn}/>
    // } else {
    //   return <DisplayMessage text={this.state.user.first_name} />
    //
    // }
  }
}
