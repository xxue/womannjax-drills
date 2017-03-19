import React from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class UserDrillBoard extends React.Component {

  render () {
    const centered = {
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    }

    const displayBox = {}

    return (
      <div className='container' style={centered}>
        <div className='displayBox' style={displayBox}>
          <p>hey</p>
        </div>
      </div>
    )

  }
}
