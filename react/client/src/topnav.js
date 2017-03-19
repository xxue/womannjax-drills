import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import logo from '../public/logo.jpeg';

export default class Topnav extends React.Component {

  constructor (props) {
    super (props);
    this.state=  null;
  };


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
          <NavItem href="#"><h4>Drills</h4></NavItem>
         <NavItem href="#"><h4>Leaderboard</h4></NavItem>
        </Nav>

         <Nav pullRight>
          <NavItem href="#"><h4>Hello ______</h4></NavItem>
         <NavItem href="#"><h4>Profile</h4></NavItem>
         <NavItem href="#"><h4>Logout</h4></NavItem>
         </Nav>
       </div>
      </Navbar>
  }
}
