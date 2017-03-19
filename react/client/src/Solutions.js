import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

let solutionsArray = [];

export default class Solutions extends React.Component {
  constructor (props) {
    super (props)
    this.addAnotherSolution = this.addAnotherSolution.bind(this)
  }

  addAnotherSolution () {
    solutionsArray.push(<FormControl class="solution" componentClass="textarea" placeholder="e.g. Drills for basic routing" />);
    // Array.from(solutionsArray);
    // })
    console.log(solutionsArray);
    return solutionsArray;
  }

  render () {
    return (
      <FormGroup controlId="new-drill-solution" id="solution-container">
        <ControlLabel>Solution</ControlLabel>
        {solutionsArray.map((solution) => {
          console.log(solution);
          return solution;
        })
      }
      </FormGroup>
    )
  }
}
