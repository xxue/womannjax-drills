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

export const thankYou = "Thank you for registering! You will be notified when you account is approved.";

export const instructions = "Password reset instructions have been sent to you.";

export default class Router extends React.Component {
  constructor (props) {
    super (props);

    this.state = props.state;
    this.signIn = Handlers.prototype.signIn.bind(this);
    this.signUp = Handlers.prototype.signUp.bind(this);
    this.createNewDrillGroup = Handlers.prototype.createNewDrillGroup.bind(this);
    this.updateDrillGroup = Handlers.prototype.updateDrillGroup.bind(this);

    this.handleLeaderBoard = Handlers.prototype.handleLeaderBoard.bind(this);
    
    this.onStart = Handlers.prototype.startDrill.bind(this);
    this.logout = Handlers.prototype.logout.bind(this);



    this.goToSignIn = Handlers.prototype.goToSignIn.bind(this);
    this.goToSignUp = Handlers.prototype.goToSignUp.bind(this);
    this.goToProfile = Handlers.prototype.goToProfile.bind(this);
    this.goToForgotPassword = Handlers.prototype.goToForgotPassword.bind(this);
  }
  goToSignIn (event) {
    this.setState({path: 'user/SignIn'})
  }

  render () {
    console.log('pathName: ', this.state.path);
    console.log('errors: ',this.state.errors);
      return <LeaderBoard users = {[
        {
          "id": "1",
          "first_name": "Bob",
          "last_name": "Henderson",
          "email": "xx@aa.org",
          "password": "111",
          "token": null,
          "score": 1000
        },
        {
          "id": 2,
          "first_name": "Mary",
          "last_name":"Smith",
          "email": "xx@aa.org",
          "password": "11",
          "token": null,
          "score": 2000
        }
      ]}/>;

//     return  <div>

//           <UserDrillBoard onStart={this.onStart}
//             state={
//               {
//                 myDrillGroups: [{
//                   id: 1,
//                   name:'Rails Routes',
//                   attempts: 4,
//                   score: 70.0
//                 },
//                   {id:3,
//                    name: 'Javascript Objects',
//                    attempts: 15,
//                    score: 5.0
//                 }
//                 ],
//                 allDrillGroups:
//                   [
//                     {id: 2, name: "Javascipt Arrays"},
//                     {id: 54, name: "Javascipt Functions"}
//                   ]
//                 }
//             }/>

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
        toRender = <SignUp onSubmit={this.signUp} errors={this.state.errors}/>;
        toRender = <SignUp onSubmit={this.signUp} errors={this.state.errors}/>;
        break;
      case /\/users\/\d+\/drill_group/.test(this.state.path):
        toRender = <UserDrillBoard state={
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
                        }}/>;
        break;
      case '/leaderboard' === this.state.path:
        // toRender = <LeaderBoard onSubmit={this.signIn} errors={[]}/>;
        break;
      case '/account-pending' === this.state.path:
        toRender = <DisplayMessage text={thankYou}/>;
        break;
      case '/reset_password/new' === this.state.path:
        // toRender = <ResetPasswordForm onSubmit={this.sendEmail} errors={[]}/>;
        break;
      case '/reset_password' === this.state.path:
        toRender = <DisplayMessage text={instructions}/>;
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
      case /\/users\/\d+/.test(this.state.path):
        toRender = <DisplayMessage text="This will be a profile"/>;
        break;
    }
    if ('/' !== this.state.path){
      toRender = (
        <div>
          <Topnav
            user={this.state.user}
            goToSignIn={this.goToSignIn}
            goToSignUp={this.goToSignUp}
            goToProfile={this.goToProfile}
            handleLeaderboard={this.handleLeaderboard}
            logout={this.logout}
          />
          {toRender}

        </div>)
      }
    return (
      <div>
        {toRender}
      </div>
    );
  }
}
