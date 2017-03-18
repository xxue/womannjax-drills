import React from 'react';
import { Grid, Row, Col, ControlLabel, FormControl, HelpBlock, FormGroup, Radio, Button } from 'react-bootstrap';

export default props => {
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
        <h2>Create New Drill Group</h2>
      </Row>
      <Row className="show-grid">
        <Col xs={12} md={12}>
          <form>
          <FieldGroup
            id="drill-group-name"
            type="text"
            label="Name"
            placeholder="e.g. Rails Routes"
          />

          <FormGroup controlId="drill-group-description">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="e.g. Drills for basic routing" />
          </FormGroup>

          <FormGroup>
            <Radio inline>
              Beginner
            </Radio>
            {' '}
            <Radio inline>
              Intermediate
            </Radio>
            {' '}
            <Radio inline>
              Advanced
            </Radio>
          </FormGroup>

          <FieldGroup
            id="drill-group-points"
            type="text"
            label="Points"
          />

          <Button type="submit">
            Save
          </Button>
        </form>
        </Col>
      </Row>
    </Grid>
  )
}
