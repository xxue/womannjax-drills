import React from 'react';
// Display Message wil be used for both Password instructions
// and Thank you for signing up
export default function (props) {

    const center = {
      'text-align': 'center'
}
    return <div style={center}>
              <h2>{props.text}</h2>
           </div>

  }
