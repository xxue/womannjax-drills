import React from 'react';
import {Form, FormGroup, Col, Button, FormControl} from 'react-bootstrap';

// The refs are nots fully operational here. Will fix! :)

 function CheckAnswer (drill, userAnswer) {
   return false;
 }

 function CorrectAnswers (drill, userAnswer){
   let isCorrect = CheckAnswer(drill, userAnswer)
   let correctAnswers = ["Here is one answer",
    "How could you get this wrong",
    "Get your shit together Deborah"];
   const tablestyle = {
     padding: '10px'
   }
   return <div>
     if(isCorrect){
       <h1>Correct!</h1>
     } else {
       <h1>Incorrect!</h1>
     };
     <h5>Correct Answers:</h5>

     { correctAnswers.map((answer, i) =>
       <tr key={i} >
         <td style={tablestyle}> {answer} </td>
         <hr />
       </tr>

     )}
  </div>
 }



export default class WriteDrill extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      drillGroup: "Rails Routes",
      drill: "This is not a drill.",
      answer: ''
    }

    this.submit= this.submit.bind(this);
  };


  submit (event) {
    event.preventDefault();
    let drill = this.state.drill;
    let answer = this.refs.answer.value;
    console.log(
      event, drill, answer);
    return CorrectAnswers(drill, answer);
  }

  render (){

    const answerInput = (
      <Form horizontal onSubmit={this.submit}>
        <FormGroup controlId="formHorizontalAnswer">
         <h3>Answer</h3>
          <Col sm={10}>
            <FormControl type="answer" placeholder="Your Answer" />
          </Col>
        </FormGroup>
        <Button type="submit" block>
          Submit
        </Button>
      </Form>
    )

    return <div>
      <h1>Drill Group: {this.state.drillGroup}</h1>
      <p>Drill: {this.state.drill}</p>
      {answerInput}
      <Button bsSize="large">Next Drill</Button>
    </div>
  }
}
