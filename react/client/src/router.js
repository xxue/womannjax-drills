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
    this.logout = Handlers.prototype.logout.bind(this);
    this.getAdminAllDrills = Handlers.prototype.getAdminAllDrills.bind(this);
    this.addNewDrill = Handlers.prototype.addNewDrill.bind(this);

    this.startDrill = Handlers.prototype.startDrill.bind(this);
    this.finishDrillGroup = Handlers.prototype.finishDrillGroup.bind(this);


    this.deleteDrillGroup = Handlers.prototype.deleteDrillGroup.bind(this);
    this.onDrillGroupView = Handlers.prototype.onDrillGroupView.bind(this);
    this.addNewDrill = Handlers.prototype.addNewDrill.bind(this);

    this.deleteDrill = Handlers.prototype.deleteDrill.bind(this);

    this.getMyAllDrills = Handlers.prototype.getMyAllDrills.bind(this);
    this.submitAnswer = Handlers.prototype.submitAnswer.bind(this);


    this.getMyAllDrills = Handlers.prototype.getMyAllDrills.bind(this);
    this.goToSignIn = Handlers.prototype.goToSignIn.bind(this);
    this.goToSignUp = Handlers.prototype.goToSignUp.bind(this);
    this.goToProfile = Handlers.prototype.goToProfile.bind(this);
    this.goToAdminDrills = Handlers.prototype.goToAdminDrills.bind(this);
    this.goToForgotPassword = Handlers.prototype.goToForgotPassword.bind(this);
    this.goToAdminCreateDrillGroup = Handlers.prototype.goToAdminCreateDrillGroup.bind(this);

    this.incrementIndex = Handlers.prototype.incrementIndex.bind(this);

  }

  render () {
    console.log('pathName: ', this.state.path);
    console.log('errors: ',this.state.errors);

    let toRender = <div></div>;
    switch(true){
      case '/' === this.state.path:
        toRender = <Home onClick={this.goToSignIn}/>;
        break;
      case '/sessions/new' === this.state.path:
        console.log(this.state.errors);
        toRender = <SignIn onSubmit={this.signIn}
                            goToForgotPassword={this.goToForgotPassword}
                            goToSignUp={this.goToSignUp}
                            errors={this.state.errors}/>;
        break;
      case '/users/new' === this.state.path:
        toRender = <SignUp onSubmit={this.signUp} errors={this.state.errors}/>;
        break;
      case '/users/get-drill-groups' === this.state.path:
        this.getMyAllDrills();
        break;
      case '/admin/get-drill-groups' === this.state.path:
        this.getAdminAllDrills();
        break;
      case /\/users\/\d+\/drill_group/.test(this.state.path):
                  //   {
                  //     myDrillGroups: [{
                  //       name:'Rails Routes',
                  //       attempts: 4,
                  //       score: 70.0
                  //     },
                  //       {name: 'Javascript Objects',
                  //       attempts: 15,
                  //       score: 5.0
                  //     }
                  //     ],
                  //     allDrillGroups:
                  //       [
                  //         {name: "Javascipt Arrays"},
                  //         {name: "Javascipt Functions"}
                  //       ]
                  //     }
        toRender = <UserDrillBoard
                      state={
                        Object.assign(
                          {},
                          {
                            myDrillGroups: this.state.myDrillGroups,
                            allDrillGroups: this.state.allDrillGroups
                          }
                        )
                      }
                      onStart={this.startDrill}
                    />;
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
        toRender = <ManageDrillGroups
                      drillGroups={this.state.drillGroups}
                      onAddDrillGroup={this.goToAdminCreateDrillGroup}
                      onDrillGroupView={this.onDrillGroupView}
                      deleteDrillGroup={this.deleteDrillGroup}
                    />;
        break;
      case '/admin/drill_board/new' === this.state.path:
        toRender = <CreateDrillGroup
                      onSubmit={this.createNewDrillGroup}
                      errors={this.state.errors}
                      drillGroup={{}}
                    />;
        break;
      case /\/admin\/drill_group\/\d+/.test(this.state.path):
        toRender = <ShowDrillGroup
                      drillGroup={this.state.drillGroup}
                      addNewDrill={this.addNewDrill}
                      onSubmit={this.addNewDrill}
                      deleteDrill={this.deleteDrill}

                    />;
        break;
      case /\/admin\/drill_group\/\d+\/edit/.test(this.state.path):
      toRender = <CreateDrillGroup
                    onSubmit={this.updateDrillGroup}
                    drillGroup={{}/* TODO: find drill group and put it here */}
                  />;
        break;
      case '/drill_baby_drill' === this.state.path:
        toRender = <WriteDrill
                    onSubmit={this.submitAnswer}
                    drillGroup={this.state.drillGroup}
                    onNext={this.incrementIndex}
                    index={this.state.index}
                    drills={this.state.drillGroup.drills}
                    correctAnswers={this.state.correctAnswers}
                    max={this.state.drillGroup.drills.length}
                    score={this.state.score}
                    isCorrect={this.state.isCorrect}
                    finishDrillGroup={this.finishDrillGroup}
                  />;
        break;
      case /\/users\/\d+/.test(this.state.path):
        toRender = <DisplayMessage text="This will be a profile"/>;
        break;
      default:
        toRender = <DisplayMessage text="You did not write your react route correctly"/>;
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
            handleDrills={this.getMyAllDrills}
            goToAdminDrills={this.goToAdminDrills}
            logout={this.logout}
          />
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
