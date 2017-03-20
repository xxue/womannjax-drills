import React from 'react';
import { Grid, Row, Panel, ButtonToolbar, Button } from 'react-bootstrap';

class DrillGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {drillGroup: props.drillGroup}
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'flex-end'
    };
    return (
      <Panel>
        <div><h4>{this.state.drillGroup.name}</h4></div>
        <div style={style}>
          <ButtonToolbar>
            <Button href="#">View</Button>
            <Button href="#">Edit</Button>
            <Button href="#">Delete</Button>
          </ButtonToolbar>
        </div>
      </Panel>
    )
  }
}

export default class ManageDrillGroups extends React.Component {

  constructor(props){
    super(props);
  }

  renderDrillGroups(drillGroups){
    let drillGroupArr = [];
    drillGroups.forEach(drillGroup=>{
      drillGroupArr.push(<DrillGroup drillGroup={drillGroup} />);
    })
    return drillGroupArr;
  }


  render(){

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
          <Button href="#" onClick={this.props.onAddDrillGroup}>Add Group</Button>
        </Row>
        <br />
        {this.renderDrillGroups(this.props.drillGroups)}
      </Grid>
    )
  }
}
