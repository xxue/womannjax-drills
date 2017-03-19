import React from 'react';
import Home from './home'
import Topnav from './topnav'
import CreateDrillGroup from './CreateDrillGroup';
 import ManageDrillGroups from './ManageDrillGroups';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
import DisplayMessage from './DisplayMessage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LeaderBoard from './Leaderboard';
import WriteDrill from './WriteDrill';

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
    <Topnav />
      <WriteDrill />
      {/* <CreateDrillGroup drillGroup={""}/>
      <ManageDrillGroups />
      <DisplayMessage text="Hey friends" /> */}
    </main>
  }
}
