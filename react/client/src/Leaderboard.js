import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap';

function getUserData() {
  let userArray = (["Neal", "XinXin", "Max", "Aldo", "Nicole", "John", "Annie"]);
  return userArray;
}

 function userBoard () {
  let userArray = getUserData();
  const userboardstyle={
    paddingLeft: '100px'
  }
  const tablestyle={
    padding: '15px',
    fontSize: '2rem'
  }
  const statsstyle={
    paddingLeft: '15px',
    fontSize: '2rem'
  }
  return<div style={userboardstyle}>
    <h1>LeaderBoard</h1>
    <table>
      { userArray.map((user, i) =>
        <tr key={i} >
          <td style={tablestyle}> {user} </td>
          <td style={statsstyle}> {user} / {user}</td>
        </tr>
      )}
    </table>
  </div>
}

function userModule () {
  const usermodulestyle={
    height: '25rem',
    width: '25rem',
    borderStyle: 'solid',
    borderWidth: '8px',
    padding: '13px',
    marginTop: '30px'
  }
  return<div style={usermodulestyle}>
    <h2>User Name</h2>
    <h5>Points</h5>
    <h5>Badges</h5>
  </div>
}


export default class Leaderboard extends React.Component {

  constructor (props) {
    super (props);
    this.state = null;
  };

  render (){
    return <Grid>
            <Row className="show-grid">
              <Col xs={8}>
                {userBoard()}
              </Col>
              <Col xs={4}>
                {userModule()}
              </Col>
            </Row>
          </Grid>
  }
}
