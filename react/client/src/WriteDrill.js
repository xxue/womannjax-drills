import React from 'react';
import {Form, FormGroup, Col, Button, FormControl} from 'react-bootstrap';


export default class WriteDrill extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      drillGroup: "Rails Routes",
      drill: "This is not a drill.",
      answer: '',
      answered: false
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.displayAnswers = this.displayAnswers.bind(this);
  }

  displayAnswers() {
    let correctAnswers = ["Here is one answer",
     "How could you get this wrong",
     "Get your shit together Deborah"];

   const tablestyle = {
     padding: '10px'
   };

   return(
     <div>
       { (this.state.isCorrect === true) ?
         <h1>Correct!</h1>
         :
         <h1>Incorrect!</h1>
       }

       <h5>Correct Answers:</h5>
       <table>
       { correctAnswers.map((answer, i) =>
         <tr key={i} >
           <td style={tablestyle}> {answer} </td>
           <hr />
         </tr>
       )}
     </table>
     </div>
    )
  }

  submitAnswer (event) {
    event.preventDefault();
    const {target} = event;
    const isCorrect = false;
    this.setState({
      answer: target.answer.value,
      answered: true,
      isCorrect: isCorrect
    })
  }


  render (){

    const answerInput = (
      <Form horizontal onSubmit={this.submitAnswer}>
        <FormGroup controlId="formHorizontalAnswer">
          <Col sm={10}>
            <FormControl type="text" name="answer"
              placeholder="Your Answer"/>
          </Col>
        </FormGroup>
        <Button type="submit" >
          Submit
        </Button>
      </Form>
    )

    return <div>
      <h1>Drill Group: {this.state.drillGroup}</h1>
      <p>Drill: {this.state.drill}</p>
      <h3>Answer</h3>
      {answerInput}
      { (this.state.answered === true) ? this.displayAnswers() : ''}
      {/* ternary works instead of if/else in JSX. */}
      <Button bsSize="large">Next Drill</Button>
    </div>
  }
}
