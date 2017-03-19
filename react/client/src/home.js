import React from 'react';
// import * as ReactBootstrap from 'react-bootstrap'
import { Jumbotron } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// Turns out i don't know how to make this change the state to user/SignIn
// Sincerly John.
export default class Home extends React.Component {

  render () {
    const mainHome = {
      display: 'flex',
      'justifyContent':'center',
      'flexDirection': 'column'
    }
    const glyphBox = {
      display: 'flex',
      'justifyContent':'space-around',
      'textAlign': 'center'
    }
    const glyphi = {
      'fontSize': '8em'

    }
    return <div>
            <Jumbotron style ={mainHome}>
              <div style={glyphBox}>
                <h1>Welcome to CodeCore Drillz</h1>
              </div>
              <div style={glyphBox}>
                <div></div>
                <Glyphicon glyph="cog" style={glyphi} />
                <Glyphicon glyph="play" style={glyphi} />
                <Glyphicon glyph="ok" style={glyphi} />
                <div></div>
              </div>
            </Jumbotron>
            <div style={glyphBox}>
              <div></div>
              <Button bsSize="large" onClick={this.props.onClick}> Enter if you dare!</Button>
              <div></div>
            </div>
          </div>
  }
}
