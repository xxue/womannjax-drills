import React from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';

// PROBABLY TALK TO ANNIE FOR AN EXPLANATION :)

function getPendingUsers() {
 let pendingUsers = (["Neal", "XinXin", "Max", "Aldo", "Nicole", "John", "Annie"]);
 return pendingUsers;
}

class UserRow extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isClicked: "false"
    };

    this.userVerify = this.userVerify.bind(this);
    this.userDeny = this.userDeny.bind(this);
    this.renderTableButtons = this.renderTableButtons.bind(this);
  }

  userVerify () {
    this.setState({
      isClicked: "verify"
    })
  }

  userDeny () {
    this.setState({
      isClicked: "deny"
    })
  }

  renderTableButtons(){
    if (this.state.isClicked === "false"){
      return <ButtonToolbar>
             <Button bsStyle="primary" id={this.props.i} onClick={this.userVerify}>Approve User</Button>
             <Button id={this.props.i} onClick={this.userDeny}>Deny User</Button>
             </ButtonToolbar>
   } else if (this.state.isClicked === "verify") {
     return  <h5>You have approved this user.</h5>
   } else {
     return  <h5>You have denied this user.</h5>
   }
  }
  render(){
    const namestyle = {
      padding: '15px',
      fontSize: '2rem'
    }
    const buttonstyle = {
      paddingLeft: '400px',
      fontSize: '2rem'
    }

    return (
      <tr key={this.props.i} >
       <td style={namestyle}> {this.props.user}</td>
       <td style={buttonstyle} >
        {this.renderTableButtons()}
       </td>
      </tr>
    )
    }
  }

export default class UserVerify extends React.Component {
  constructor (props) {
    super (props);
    this.state = { };

    this.controlBoard = this.controlBoard.bind(this);
  }

  controlBoard () {
   let userArray = getPendingUsers();

   const controlboardstyle={
     paddingLeft: '100px'
   }

   return( <div style={controlboardstyle}>
     <h1>Pending Users</h1>
     <table>
       { userArray.map((user, i) => {
         return <UserRow key={i} user={user} i={i}/>;
       })}
     </table>
   </div>
    )
  }

 render () {
   return <div>
     {this.controlBoard()}
           </div>
 }

}
