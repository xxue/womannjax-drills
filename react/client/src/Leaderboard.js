import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap';



function getUserData() {
  let userArray = (["Neal", "XinXin", "Max", "Aldo", "Nicole", "John", "Annie"]);
  return userArray;
}

 function userBoard (users) {
  let userArray = users
  console.log(userArray);
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
      { users.map((user) =>
        <tr key={user.id} >
          <td style={tablestyle}> {user.id} </td>
          <td style={statsstyle}> {user.first_name} {user.last_name} / {user.score}</td>
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
    this.state = {
      users: props.users
    };

  };

  componentDidMount() {
    console.log('attempt to fetch')
    fetch('http://localhost:3000/users.json')
    .then((response) => response.json())
    .then((json)=>{
      console.log(json)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render (){
    return <Grid>
            <Row className="show-grid">
              <Col xs={8}>
                {userBoard(this.state.users)}
              </Col>
              <Col xs={4}>
                {userModule()}
              </Col>
            </Row>
          </Grid>
  }
}
