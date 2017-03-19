import React from 'react';
import { Grid, Row, Panel, ButtonToolbar, Button } from 'react-bootstrap';

export default props => {
  const style = {
    display: 'flex',
    justifyContent: 'flex-end'
  };

  return (
    <Grid>
      <Row>
        <h2>Drill Groups</h2>
      </Row>
      <Row style={style}>
        <Button href="#">Add Group</Button>
      </Row>
      <br />
      <Panel>
        <div><h4>{"< Drill Group Title >"}</h4></div>
        <div style={style}>
          <ButtonToolbar>
            <Button href="#">View</Button>
            <Button href="#">Edit</Button>
            <Button href="#">Delete</Button>
          </ButtonToolbar>
        </div>
      </Panel>
    </Grid>
  )
}
