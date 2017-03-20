import React from 'react';
import { Grid, Row, Panel, ButtonToolbar, Button, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock, Form } from 'react-bootstrap';

export default class FieldGroup extends React.Component{

// ({ id, label, help, ...props }) {

  constructor(props){
    super(props);
    const { id, label, help, ...props1 } = props;
    this.state = {
      id:id,
      label:label,
      help:help,
      props: {...props1}
    }
  }

  render(){
    return (
      <FormGroup controlId={this.state.id}>
        <ControlLabel>{this.state.label}</ControlLabel>
        <FormControl {...this.state.props} />
        {this.help && <HelpBlock>{this.help}</HelpBlock>}
      </FormGroup>
    );
  }
}
