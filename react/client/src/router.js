import React from 'react';
import Home from './home';
import CreateDrillGroup from './CreateDrillGroup';

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
      <CreateDrillGroup />
    </main>
  }
}
