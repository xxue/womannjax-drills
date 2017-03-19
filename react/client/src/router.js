import React from 'react';
import Topnav from './topnav'
import Home from './home';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
import DisplayMessage from './DisplayMessage';
import SignIn from './SignIn';
import UserDrillBoard from './UserDrillBoard';


export default class Router extends React.Component {
  constructor (props) {
    super (props);
    this.state = this.state || { path: '/',
                   user:{
                     email: "",
                     token: "",
                     user_id: 2,
                     is_admin: false
                        }
                 }
    this.signIn = this.signIn.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);

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
  goToSignIn (event) {
    this.setState({path: 'user/SignIn'})
  }

// find user is going to find the current user by their session and add it to the state
  // function FindUser(){
  //
  //     }

  render () {
    // this is where we'll have all the switch statements to render
    // the page we want, based on the state
        /* <CreateDrillGroup drillGroup={""}/>
        <ManageDrillGroups /> */
    // if (this.state.path === '/' ) {
    //
    //   return <SignIn onSubmit={this.signIn}/>
    // } else {
    //   return <DisplayMessage text={this.state.user.first_name} />
    //
    // }
    return  <div>

          <UserDrillBoard
            state={
              {
                myDrillGroups: [{
                  name:'Rails Routes',
                  attempts: 4,
                  score: 70.0
                },
                  {name: 'Javascript Objects',
                  attempts: 15,
                  score: 5.0
                }
                ],
                allDrillGroups:
                  [
                    {name: "Javascipt Arrays"},
                    {name: "Javascipt Functions"}
                  ]
                }
            }/>
        </div>
  }
}
