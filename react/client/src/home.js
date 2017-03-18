import React from 'react';
// import * as ReactBootstrap from 'react-bootstrap'
import { Jumbotron } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class Home extends React.Component {

  render () {
    const mainHome = {
      display: 'flex',
      'justify-content':'center',
      'flex-direction': 'column'
    }
    const glyphBox = {
      display: 'flex',
      'justify-content':'space-around',
      'text-align': 'center'
    }
    const glyphi = {
      'font-size': '8em'

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
              <Button bsSize="large">Enter if you dare!</Button>
              <div></div>
            </div>
          </div>
  }
}
