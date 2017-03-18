import React from 'react';
import {Form, FormGroup, Col, Button, ControlLabel, Checkbox, FormControl} from 'react-bootstrap';

export default class SignIn extends React.Component {

  render () {
    const formInstance = (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" block>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
);

const main={
    'display':'flex',
    'flex-direction':'column'
}

const links={
  'display':'flex',
  'flex-direction': 'row',
  'justify-content': 'space-around'
}

    return <div style={main} className="container">
              <h2>Sign In</h2>
              {formInstance}
              <div style={links}>
                {/* I really should have added these links into the bottom
                   of the form but i didn't I'm sorry */}
                <p>Forgot Password?</p>
                <p>Don't have an Account? </p>
              </div>
            </div>
  }

}
