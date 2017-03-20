import React from 'react';
import { Grid, Row, Panel, ButtonToolbar, Button, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

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
        <Panel header={"< Drill 1 >"} eventKey="1">
          <div>
            {this.state.drill.exercise}
          </div>
          <div style={style}>
            <ButtonToolbar>
              <Button href="#">Edit</Button>
              <Button href="#">Delete</Button>
            </ButtonToolbar>
          </div>
        </Panel>
      </Accordion>
    )
  }
}


export default props => {

  function renderDrills(drills) {
    let drillsArr = [];
    drills.forEach(drill=>{
      drillsArr.push(<Drill drill={drill}/>)
    })
    return drillsArr;
  }

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
        <h2>Drill Group: {props.drillGroup.name}</h2>
      </Row>
      <Row>
        <p>{props.drillGroup.description}</p>
      </Row>
      <Row style={style}>
        <Button href="#">
          Edit Group
        </Button>
      </Row>
      <br />

      {renderDrills(props.drillGroup.drills)}
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
