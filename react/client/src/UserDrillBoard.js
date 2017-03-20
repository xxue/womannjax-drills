import React from 'react';
import { Glyphicon, Nav, NavItem, Button } from 'react-bootstrap';

// render a single Drill group in MyDrillz

class MyDrill extends React.Component {
  render() {
    // STYLES
    const drillGroup= {
      'width': '40%',
      'height': '40%',
      border: 'solid darkseagreen'
    }
    const h3={
      'font-size': '3.1vw'
    }
    // FUNCTIONS

    // RETURN
    return (<div style={drillGroup} id={this.props.id}>
      <h3 style={h3}>{this.props.name}</h3>
      <p>Taken: {this.props.attempts} Times</p>
      <p>{this.props.score}%</p>
      <Button onClick={this.props.onStart}>Start</Button>
      <Button>Remove</Button>
    </div>)
  }
}

// render a single drill group in AllDrillz

function AllDrill ({id, name}){

  // STYLES
  const drillGroup= {
    'width': '40%',
    'height': '40%',
    border: 'solid goldenrod'
  }
  const h3={
    'font-size': '3.1vw'
  }
  // FUNCTIONS

  // RETURN

  return (<div style={drillGroup} id={id}>
              <h3 style={h3}>{name}</h3>
              <Button>Add To My Drillz</Button>
          </div>)
}




export default class UserDrillBoard extends React.Component {

  constructor(props){
    super(props)

    this.state = Object.assign({},props.state,{activeKey: 1});

    this.generateMyDrillz = this.generateMyDrillz.bind(this);
    this.generateAllDrillz = this.generateAllDrillz.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }


  // So here I need a function 2 functions.
  // One which renders as many My Drills as needed (using the MyDrill function)

  generateMyDrillz(DrillGroups) {
    let MyDrillArray = [];
    // loop over array of drillGroups and call MyDrill every time,
    //  using appropriate params
    for (let i=0;i<DrillGroups.length; i++){
      const {id, name, attempts, score} = DrillGroups[i];
      MyDrillArray.push(<MyDrill
                          id={id}
                          name={name}
                          attempts={attempts}
                          score={score}
                          onStart={this.props.onStart}
                        />);
    }
    return MyDrillArray
  }

  //  The next will generate all Drillz using the AllDrillz function
  generateAllDrillz(DrillGroups) {
    let AllDrillArray = [];
    // loop over array of drillGroups and call AllDrill everytime,
    //  using appropriate title param

    for (let i=0;i<DrillGroups.length;i++){
      AllDrillArray.push(AllDrill(DrillGroups[i]))

    }

    return AllDrillArray
  }

  handleSelect(selectedKey) {
    this.setState(Object.assign({},this.state,{activeKey: selectedKey}));
  }

// STYLES

  render () {
    const centered ={
      'display':'flex',
      'justifyContent':'center',
      'alignItems':'center',
      'flexDirection': 'column',
      // this will likely need changing when we render the topNav as well
       width: '90%',
       height:'90%',
    }

    const nav ={
      'display': 'flex',
      'flexDirection':'row',
      'justifyContent': 'flex-start',
      'width': '80%',
    }

    const displayBox ={
      // this will probably need to be changed when we render the
      // topnav as well, probably should switch to 65vh/w
      width: '80%',
      'min-width': '400px',
      height:'80%',
      'min-height': '250px',
      border: 'solid black',
      'display': 'flex',
      'justifyContent': 'space-around',
      'alignContent':'space-around',
      'flexDirection':'row',
      'flex-wrap': 'wrap'
    }

    const li= {
      'display':'inline-block'
    }

            // FUNCTIONS

    // CHUNKS OF BOOTSTRAP/HTML

    const DrillzTabs= (
      <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
        <NavItem style={li} eventKey={1}>My Drillz</NavItem>
        <NavItem style={li} eventKey={2}>All Drillz</NavItem>
      </Nav>
    )

     // RETURN
     let toReturn = this.state.activeKey === 1 ?
     this.generateMyDrillz(this.state.myDrillGroups) :
     this.generateAllDrillz(this.state.allDrillGroups);

    return (
      <div className='container' style={centered}>
        <div style={nav}>
          {DrillzTabs}
        </div>
        <div className='displayBox' style={displayBox}>


          {toReturn}

        </div>
      </div>
    )

  }
}
