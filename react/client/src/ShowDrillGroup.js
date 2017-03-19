import React from 'react';
import { Grid, Row, Panel, ButtonToolbar, Button, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default props => {
  const style = {
    display: 'flex',
    justifyContent: 'flex-end'
  };

  function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  return (
    <Grid>
      <Row>
        <h2>Drill Group: {"< Rails Routes >"}</h2>
      </Row>
      <Row>
        <p>{"< Drills for Rails basic routing >"}</p>
      </Row>
      <Row style={style}>
        <Button href="#">
          Add Group
        </Button>
      </Row>

      <br />

      <Accordion>
        <Panel header={"< Drill 1 >"} eventKey="1">
          <div>
            {"< Drill: Create a route to do a 'get' request that goes to the campaigns controller index action >"}
          </div>
          <div style={style}>
            <ButtonToolbar>
              <Button href="#">Edit</Button>
              <Button href="#">Delete</Button>
            </ButtonToolbar>
          </div>
        </Panel>
      </Accordion>
      <br />

      <Panel header={"Add New Drill"}>
        <FormGroup controlId="new-drill-description">
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" placeholder="e.g. Drills for basic routing" />
        </FormGroup>

        <FormGroup controlId="new-drill-solution">
          <ControlLabel>Solution</ControlLabel>
          <FormControl componentClass="textarea" placeholder="e.g. Drills for basic routing" />
        </FormGroup>

        <div>
          <Button href="#">
            Add Another Solution
          </Button>
        </div>

        <div style={style}>
          <Button type="submit">
            Save
          </Button>
        </div>
      </Panel>
    </Grid>
  )
}
