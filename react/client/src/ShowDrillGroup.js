import React from 'react';

import { Grid, Row, Panel, ButtonToolbar, Button, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock, Form } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

class Drill extends React.Component {
  constructor(props){
    super(props);
    this.state = { drill: props.drill }
  }
  render () {

    const style = {
      display: 'flex',
      justifyContent: 'flex-end'
    };

    return (
      <Accordion>
        <Panel id={this.state.drill.id} header={`Drill ${this.props.index}`} eventKey="1">
          <div>
            {this.state.drill.exercise}
          </div>
          <div style={style}>
            <ButtonToolbar>
              <Button href="#">Edit</Button>
              <Button onClick={this.props.deleteDrill} href="#">Delete</Button>
            </ButtonToolbar>
          </div>
        </Panel>
      </Accordion>
    )
  }
}





export default class ShowDrillGroup extends React.Component{

  constructor(props){
    super(props);
    this.state = {count:1}
    this.addAnotherSolution = this.addAnotherSolution.bind(this);
    this.renderSolutions = this.renderSolutions.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  addAnotherSolution() {
    this.setState({count: this.state.count+1})
  }

  submitButton(event){
    event.preventDefault();
    this.props.addNewDrill(event)
    .then(()=>this.setState({count: 1}))
  }

  renderDrills(drills) {
    let drillsArr = [];

    drills.forEach((drill, i)=>{
      drillsArr.push(<Drill key={i} index={i+1} drill={drill} />)
    })
    return drillsArr;
  }

  renderSolutions() {
    let retArr = [];
    for(let i = 0; i < this.state.count; i++){
      retArr.push(<FormControl key={i} id={`${i}`}  componentClass="textarea" placeholder="e.g. Drills for basic routing" />)
    }
    return retArr;
  }

render(){

  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
    'margin-right': '20px'
  };


  return (
    <Grid>
      <Row>
        <h2 style={title}>Drill Group: {props.drillGroup.name}</h2>
      </Row>
      <Row>
        <p>{this.props.drillGroup.description}</p>
      </Row>
      <Row style={style}>
        <Button href="#">
          Edit Group
        </Button>
      </Row>
      <br />

      {this.renderDrills(this.props.drillGroup.drills)}
      <br />

      <Panel header={"Add New Drill"} >
        <Form onSubmit={this.submitButton} id={this.props.drillGroup.id}>
        <FormGroup controlId="new-drill-description">
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" placeholder="e.g. Drills for basic routing" />
        </FormGroup>

        <FieldGroup
          id="drill-points"
          type="integer"
          label="Points"
          placeholder="e.g. 10"
        />

        <div id="new-drill-solution">
          <FormGroup>
            <ControlLabel>Solution</ControlLabel>
            {this.renderSolutions()}
          </FormGroup>
        </div>

        <div>
          <Button href="" onClick={this.addAnotherSolution}>
            Add Another Solution
          </Button></span>
          <span style={style}>
            <Button bsStyle="danger" bsSize="medium" type="submit">
              Save
            </Button>
          </span>

        </div>

      </Form>
      </Panel>
    </Grid>
  )
  }
}
