import React from 'react';
import {Form, FormGroup, Col, Button, ControlLabel, FormControl} from 'react-bootstrap';

export default class SignIn extends React.Component {

  render () {
    const formInstance = (
      <Form horizontal>
        <FormGroup controlId="formHorizontalFirstName">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl type="firstName" placeholder="First Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl type="lastName" placeholder="Last Name" />
          </Col>
        </FormGroup>

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

        <FormGroup controlId="formHorizontalPasswordConfirmation">
          <Col componentClass={ControlLabel} sm={2}>
            Password Confirmation
          </Col>
          <Col sm={10}>
            <FormControl type="passwordConfirmation" placeholder="Password Confirmation" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" block>
              Create Account
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );

    return <div className="container">
              <h1>Create An Account</h1>
              {formInstance}
            </div>
  }
}
