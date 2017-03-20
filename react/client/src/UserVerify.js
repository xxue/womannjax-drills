import React from 'react';
import {Form, FormGroup, Col, Button, ControlLabel, Checkbox, FormControl} from 'react-bootstrap';

// THIS IS A WORK IN PROGRESS.

class User extends React.Component{

  constructor(props){
    super(props);
    // this.renderUser = this.renderUser.bind(this);
    // this.renderUsers = this.renderUsers.bind(this);
  }

  render(){
    const form = {
      display: 'flex'
    };
    const space = {
      margin: '10px 20px'
    }
    return (

      <Form horizontal style={form}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} style={space} sm={2}>
            {this.props.user.first_name}
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} style={space} sm={2}>
            {this.props.user.last_name}
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} style={space} sm={2}>
            {this.props.user.email}
          </Col>
        </FormGroup>
        <div style={form}>
          <Button style={space} data-id={this.props.user.id} onClick={this.props.verifyUser} href="#">Verify</Button>
          <Button style={space} data-id={this.props.user.id} onClick={this.props.deleteUser} href="#">Delete</Button>
        </div>
      </Form>
    )

  }
}

class Users extends React.Component {

  constructor(props){
    super(props);
    // this.renderUser = this.renderUser.bind(this);
    // this.renderUsers = this.renderUsers.bind(this);
  }

  renderUsers( users) {
    let retArr = [];
    users.forEach(user=>{
      retArr.push(<User
            user={user}
            verifyUser={this.props.verifyUser}
            deleteUser={this.props.deleteUser}
           />)
    })
    return retArr;
  }

  render() {
    return <div>
            {this.renderUsers(this.props.users)}
          </div>
  }

}

export default class UserVerify extends React.Component {

  constructor(props){
    super(props);
    // this.renderUser = this.renderUser.bind(this);
    // this.renderUsers = this.renderUsers.bind(this);
  }

  render() {
    return <div>
            <Users
              users={this.props.users}
              verifyUser={this.props.verifyUser}
              deleteUser={this.props.deleteUser}
            />
          </div>
  }

//   renderUsers(){
//     let retArr = [];
//     console.log(this.props.users)
//     this.props.users.forEach(user=>{
//       retArr.push(this.renderUsers(user));
//     })
//     return retArr;
//   }
//
//   renderUser(user){

//     return(
//
//
//       </Form>
//     )
//   }
//
//
//  render () {
//    const form = {
//      display: 'flex'
//    };
//
//
//
//
//
// const main={
//    'display':'flex',
//    'flex-direction':'column'
// }
//
// const links={
//  'display':'flex',
//  'flex-direction': 'row',
//  'justify-content': 'space-around'
// }
//    return <div style={main} className="container">
//              <h2>Pending Users</h2>
//              {this.renderUsers()}
//              <div style={links}>
//
//              </div>
//            </div>
 // }
}
