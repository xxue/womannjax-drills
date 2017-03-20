import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import logo from '../public/logo.jpeg';

export default class Topnav extends React.Component {

  constructor (props) {
    super (props);
    this.state = null;
    this.rightNav = this.rightNav.bind(this);
  };

  leftNav() {
    console.log('left ',this.props.user);
    if(this.props.user.is_admin){
      return <div></div>
    } else if (this.props.user.email){
      return (<Nav>
        <NavItem href="" onClick={this.props.handleDrills}><h4>Drillz</h4></NavItem>
        <NavItem href="" onClick={this.props.handleLeaderboard}><h4>Leaderboard</h4></NavItem>
      </Nav>
      )
    } else {
      return <div></div>
    }
  }

  rightNav () {
    console.log(this.props.user);
    if(this.props.user.is_admin){
      return (

        <Nav pullRight>
          <NavItem href="" onClick={this.props.goToUsers}><h4>Users</h4></NavItem>
          <NavItem href="" onClick={this.props.goToAdminDrills}><h4>Drillz</h4></NavItem>
          <NavItem href="" onClick={this.props.logout}><h4>Logout</h4></NavItem>
        </Nav>
      )
    } else if (this.props.user.email) {
      return (
        <Nav pullRight>
          <NavItem disabled><h4>Hello {this.props.user.first_name}</h4></NavItem>
          {/* <NavItem href="" onClick={this.props.goToProfile}><h4>Profile</h4></NavItem> */}
          <NavItem href="" onClick={this.props.logout}><h4>Logout</h4></NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavItem href="" onClick={this.props.goToSignUp}><h4>Sign Up</h4></NavItem>
          <NavItem href="" onClick={this.props.goToSignIn}><h4>Login</h4></NavItem>
        </Nav>
      )
    }
  }

  render () {
    const navstyle = {
      fontSize: '10em',
      height: '120px',
      marginLeft: '-10px',
      marginRight: '5px',
      border: '1px solid wheat'
     };

    const logostyle = {
      height: '100px',
      paddingLeft: '30px'
     };
     const leftbar = {
      fontSize: '10em'
     };
     const linkstyle = {
      paddingTop: '10px'
     };

    return <div><Navbar style={navstyle} >
        <Navbar.Header style={leftbar}>
          <Navbar.Brand>
          <img src={logo} style={logostyle}/>
         </Navbar.Brand>
         <h5>Codecore Drillz</h5>
        </Navbar.Header>
        <div style={linkstyle}>
          {this.leftNav()}
          {this.rightNav()}
       </div>
     </Navbar></div>
  }
}
