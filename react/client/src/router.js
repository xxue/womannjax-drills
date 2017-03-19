import React from 'react';
import Topnav from './topnav'
import Home from './home';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
import DisplayMessage from './DisplayMessage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LeaderBoard from './Leaderboard';
import WriteDrill from './WriteDrill';
import UserDrillBoard from './UserDrillBoard';
import CreateDrillGroup from './CreateDrillGroup';
import ManageDrillGroups from './ManageDrillGroups';
import ShowDrillGroup from './ShowDrillGroup';


import Handlers from './handlers';

export default class Router extends React.Component {
  constructor (props) {
    super (props);

    this.state = props.state;
    console.dir(Handlers);
    this.signIn = Handlers.prototype.signIn.bind(this);
    this.createNewDrillGroup = Handlers.prototype.createNewDrillGroup.bind(this);
    this.updateDrillGroup = Handlers.prototype.updateDrillGroup.bind(this);


    this.goToSignIn = Handlers.prototype.goToSignIn.bind(this);
    this.goToSignUp = Handlers.prototype.goToSignUp.bind(this);
    this.goToForgotPassword = Handlers.prototype.goToForgotPassword.bind(this);
  }
  goToSignIn (event) {
    this.setState({path: 'user/SignIn'})
  }

  render () {

//     return  <div>

//           <UserDrillBoard
//             state={
//               {
//                 myDrillGroups: [{
//                   name:'Rails Routes',
//                   attempts: 4,
//                   score: 70.0
//                 },
//                   {name: 'Javascript Objects',
//                   attempts: 15,
//                   score: 5.0
//                 }
//                 ],
//                 allDrillGroups:
//                   [
//                     {name: "Javascipt Arrays"},
//                     {name: "Javascipt Functions"}
//                   ]
//                 }
//             }/>
//         </div>

    console.log('pathName: ', this.state.path)
    let toRender = <div></div>;
    switch(true){
      case '/' === this.state.path:
        toRender = <Home onClick={this.goToSignIn}/>;
        break;
      case '/sessions/new' === this.state.path:
        console.log(this.state.errors);
        toRender = <SignIn onSubmit={this.signIn} goToForgotPassword={this.goToForgotPassword} goToSignUp={this.goToSignUp} errors={this.state.errors}/>;
        break;
      case '/users/new' === this.state.path:
        // toRender = <SignUp onSubmit={this.signUp} errors={[]}/>;
        break;
      case /\/users\/\d+\/drill_group/.test(this.state.path):
        toRender = <UserDrillBoard />;
        break;
      case '/leaderboard' === this.state.path:
        // toRender = <LeaderBoard onSubmit={this.signIn} errors={[]}/>;
        break;
      case '/account-pending' === this.state.path:
        toRender = <DisplayMessage text={Handlers.thankYou}/>;
        break;
      case '/reset_password/new' === this.state.path:
        // toRender = <ResetPasswordForm onSubmit={this.sendEmail} errors={[]}/>;
        break;
      case '/reset_password' === this.state.path:
        toRender = <DisplayMessage text={Handlers.instructions}/>;
        break;
      case '/admin/drill_board' === this.state.path:
        toRender = <ManageDrillGroups />;
        break;
      case '/admin/drill_group/new' === this.state.path:
        toRender = <CreateDrillGroup
                      onSubmit={this.createNewDrillGroup}
                      errors={this.state.errors}
                      drillGroup={{}}
                    />;
        break;
      case /\/admin\/\/drill_group\/\d+/.test(this.state.path):
        toRender = <ShowDrillGroup
                      drillGroup={{}/*TODO: put drillgroup here*/}
                    />;
        break;
      case /\/admin\/\/drill_group\/\d+\/edit/.test(this.state.path):
      toRender = <CreateDrillGroup
                    onSubmit={this.updateDrillGroup}
                    drillGroup={{}/* TODO: find drill group and put it here */}
                  />;
        break;
      case '/drill_baby_drill' === this.state.path:
        // toRender = <SignIn onSubmit={this.signIn} errors={[]}/>;
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
