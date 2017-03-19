import React from 'react';
import Solutions from './Solutions'
import { Grid, Row, Panel, ButtonToolbar, Button, Form, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class ShowDrillGroup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      solutionsCount: 1,
      solutions:[]
    }
    this.addAnotherSolution = this.addAnotherSolution.bind(this)
    // this.addTextField = this.addTextField.bind(this)
  }

  addAnotherSolution () {

    this.state.solutions.push({
      DrillId:1,
    })
    this.setState ({ solutionsCount: this.state.solutionsCount++ })
  }

  // addTextField () {
  //   console.log('addTextField');
  //   const result = []
  //   let form = <FormControl className="solution" componentClass="textarea" placeholder="e.g. Drills for basic routing" />;
  //   for(let i = 0; i < this.state.solutionsCount; i++) {
  //
  //     result.push(form)
  //   }
  //   return (
  //     <div>
  //       {result}
  //     </div>
  //   );
  // }

  render () {
    return (
      <Grid>
        <Row>
          <h2>Drill Group: {"< Rails Routes >"}</h2>
        </Row>
        <Row>
          <p>{"< Drills for Rails basic routing >"}</p>
        </Row>
        <Row style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
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
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <ButtonToolbar>
                <Button href="#">Edit</Button>
                <Button href="#">Delete</Button>
              </ButtonToolbar>
            </div>
          </Panel>
        </Accordion>
        <br />

        <Panel header={"Add New Drill"}>
          <Form onSubmit={this.props.onSubmit}>
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

            <FormGroup controlId="new-drill-solution" id="solution-container">
              <ControlLabel>Solution</ControlLabel>

            </FormGroup>

            <div>
              <Button onClick={this.addAnotherSolution}>
                Add Another Solution
              </Button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Button type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Panel>
      </Grid>
    )
  }
}
