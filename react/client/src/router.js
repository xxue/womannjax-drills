import React from 'react';
import Home from './home'
import Topnav from './topnav'
// import Home from './home';
import CreateDrillGroup from './CreateDrillGroup';
import ManageDrillGroups from './ManageDrillGroups';
import ShowDrillGroup from './ShowDrillGroup'
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

  render () {
    // this is where we'll have all the switch statements to render
    // the page we want, based on the state

//     if (this.state.path==='/'){
//     }
    return <main>
      {/* <CreateDrillGroup drillGroup={""}/>
      <ManageDrillGroups /> */}
      <ShowDrillGroup />
      {/* <DisplayMessage text="Hey friends" /> */}
    </main>
  }
}
