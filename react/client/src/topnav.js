import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import logo from '../public/logo.jpeg';

export default class Topnav extends React.Component {

  constructor (props) {
    super (props);
    this.state = null;
    this.rightNav = this.rightNav.bind(this);
  };

  rightNav () {
    if(this.props.user.email){
      return (
        <Nav pullRight>
          <NavItem disabled><h4>Hello {this.props.user.first_name}</h4></NavItem>
          <NavItem href="" onClick={this.props.goToProfile}><h4>Profile</h4></NavItem>
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
      marginLeft: '-200px',
     };
    const logostyle = {
      height: '100px'
     };
     const leftbar = {
      fontSize: '10em'
     };
     const linkstyle = {
      paddingTop: '20px'
     };

    return <Navbar style={navstyle}  >
        <Navbar.Header style={leftbar}>
          <Navbar.Brand>
          <img src={logo} style={logostyle}/>
        </Navbar.Brand>
        <h5>Codecore Drills</h5>
        </Navbar.Header>
        <div style={linkstyle}>
        <Nav>
          <NavItem href="" onClick={this.props.handleDrills}><h4>Drills</h4></NavItem>
          <NavItem href="" onClick={this.props.handleLeaderboard}><h4>Leaderboard</h4></NavItem>
        </Nav>
          {this.rightNav()}
       </div>
      </Navbar>
  }
}
