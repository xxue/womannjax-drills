import React from 'react';
import Home from './home';
import CreateDrillGroup from './CreateDrillGroup';
import ManageDrillGroups from './ManageDrillGroups';

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
    return <main>
      <CreateDrillGroup drillGroup={""}/>
      <ManageDrillGroups />
    </main>
  }
}
