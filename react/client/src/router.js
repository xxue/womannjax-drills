import React from 'react';
import Topnav from './topnav'
import Home from './home';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
import DisplayMessage from './DisplayMessage';
import SignIn from './SignIn';
import UserDrillBoard from './UserDrillBoard';
import CreateDrillGroup from './CreateDrillGroup';

import Handlers from './handlers';

export default class Router extends React.Component {
  constructor (props) {
    super (props);
    this.state = props.state;
    console.dir(Handlers);
    this.signIn = Handlers.prototype.signIn.bind(this);
    this.goToSignIn = Handlers.prototype.goToSignIn.bind(this);
    this.createNewDrillGroup = Handlers.prototype.createNewDrillGroup.bind(this);

  }

  render () {
    // this is where we'll have all the switch statements to render
    // the page we want, based on the state
//     if (this.state.path==='/'){
//     }

        {/*
        <ManageDrillGroups /> */}
        // return <CreateDrillGroup onSubmit={this.createNewDrillGroup} drillGroup={""}/>
    // if (this.state.path === '/' ) {
    //
    //   return <SignIn onSubmit={this.signIn}/>
    // } else {
    //   return <DisplayMessage text={this.state.user.first_name} />
    //
    // }
    let toRender = <div></div>;
    switch(true){
      case '/' === this.state.path:
        toRender = <Home onClick={this.goToSignIn}/>;
        break;
      case '/sessions/new' === this.state.path:
        toRender = <SignIn onSubmit={this.signIn} />;
        break;
    }
    if ('/' !== this.state.path){
      toRender = (
        <div>
          <Topnav />
          {toRender}
        </div>
      );
    }
    return (
      <div>
        {toRender}
      </div>
    );
  }
}
