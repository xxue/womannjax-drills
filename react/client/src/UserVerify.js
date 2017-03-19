import React from 'react';
import {Form, FormGroup, Col, Button, ControlLabel, Checkbox, FormControl} from 'react-bootstrap';

// THIS IS A WORK IN PROGRESS. 

export default class UserVerify extends React.Component {

 render () {
   const formInstance = (
     <Form horizontal onSubmit={this.props.onSubmit}>
       <FormGroup controlId="formHorizontalEmail">
         <Col componentClass={ControlLabel} sm={2}>
           First Name
         </Col>
         <Col sm={10}>
           <FormControl type="email" placeholder="Email" />
         </Col>
       </FormGroup>

       <FormGroup controlId="formHorizontalPassword">
         <Col componentClass={ControlLabel} sm={2}>
           Last Name
         </Col>
         <Col sm={10}>
           <FormControl type="password" placeholder="Password" />
         </Col>
       </FormGroup>

       <FormGroup controlId="formHorizontalPassword">
         <Col componentClass={ControlLabel} sm={2}>
           Email
         </Col>
         <Col sm={10}>
           <FormControl type="password" placeholder="Password" />
         </Col>
       </FormGroup>

       <FormGroup>
         <Col smOffset={2} sm={10}>
           <Checkbox>Verify User</Checkbox>
           <Checkbox>Delete User</Checkbox>
         </Col>
       </FormGroup>


             <table>
                 <thead>
                     <tr>
                         <th>First_Name</th>
                         <th>Last_Name</th>
                         <th>Email</th>
                     </tr>
                 </thead>
                 <tbody>{rows}</tbody>
             </table>

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
             <h2>Pending Users</h2>
             {formInstance}
             <div style={links}>

             </div>
           </div>
 }
}
