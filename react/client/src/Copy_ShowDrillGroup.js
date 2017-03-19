import React from 'react';
import Solutions from './Solutions'
import { Grid, Row, Panel, ButtonToolbar, Button, Form, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

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
        <Form onSubmit={props.onSubmit}>
          <FormGroup controlId="new-drill-description">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="e.g. Drills for basic routing" />
          </FormGroup>

          <FieldGroup
            id="drill-points"
            type="integer"
            min={0}
            label="Points"
            placeholder="e.g. 10"
          />

          {/* <FormGroup controlId="new-drill-solution" id="solution-container">
            <ControlLabel>Solution</ControlLabel>
            <FormControl class="solution" componentClass="textarea" placeholder="e.g. Drills for basic routing" />
          </FormGroup> */}

          <div>
            <Button onClick={props.addAnotherSolution}>
              Add Another Solution
            </Button>
          </div>

          <div style={style}>
            <Button type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Panel>
    </Grid>
  )
}
