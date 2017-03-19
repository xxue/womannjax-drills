import React from 'react';
import { Glyphicon, Nav, NavItem,  } from 'react-bootstrap';

export default class UserDrillBoard extends React.Component {

  render () {
    const centered ={
      'display':'flex',
      'justifyContent':'center',
      'alignItems':'center',
      'flexDirection': 'column',
       width: '100vw',
       height:'100vh',
    }

    const nav ={
      'display': 'flex',
      'flexDirection':'row',
    }

    const displayBox ={
      width: '80vw',
      height:'80vh',
      border: 'solid black'
    }

    return (
      <div className='container' style={centered}>
        <div style={nav}>
          <Nav><NavItem>My Drillz</NavItem><NavItem>All Drillz</NavItem></Nav>
        </div>
        <div className='displayBox' style={displayBox}>
          <p>hey</p>
        </div>
      </div>
    )

  }
}
