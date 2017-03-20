import React from 'react';
import { Glyphicon, Nav, NavItem, Button } from 'react-bootstrap';

// How to use in router!!!!
//     return  <div>

//           <UserDrillBoard
//             state={
//               {
//                 myDrillGroups: [{
//                   name:'Rails Routes',
//                   attempts: 4,
//                   score: 70.0
//                 },
//                   {name: 'Javascript Objects',
//                   attempts: 15,
//                   score: 5.0
//                 }
//                 ],
//                 allDrillGroups:
//                   [
//                     {name: "Javascipt Arrays"},
//                     {name: "Javascipt Functions"}
//                   ]
//                 }
//             }/>
//         </div>


// render a single Drill group in MyDrillz

class MyDrill extends React.Component {
  render() {
    // STYLES
    const drillGroup= {
      'width': '40%',
      'height': '40%',
      border: 'solid darkseagreen'
    }
    // FUNCTIONS
    console.log(this.props);
    // RETURN
    return (<div style={drillGroup} data-id={this.props.myDrillsId} data-attempts={this.props.attempts} id={this.props.id}>
      <h3>{this.props.name}</h3>
      <p>Taken: {this.props.attempts} Time(s)</p>
      <p>Points: {this.props.score}</p>
      <Button onClick={this.props.onStart}>Start</Button>
      <Button onClick={this.props.onRemove}>Remove</Button>
    </div>)
  }
}

// render a single drill group in AllDrillz

function AllDrill ({id, name}, onAddToMyDrills){

  // STYLES
  const drillGroup= {
    'width': '40%',
    'height': '40%',
    border: 'solid goldenrod'
  }
  // FUNCTIONS

  // RETURN

  return (<div style={drillGroup} id={id}>
              <h3>{name}</h3>
              <Button onClick={onAddToMyDrills}>Add To My Drillz</Button>
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
      console.log('-----------', DrillGroups[i]);
      const {myDrillsId, DrillGroupId, name, attempts, score} = DrillGroups[i];
      console.dir(DrillGroups[i]);
      if (DrillGroups[i].drillsVisible){
        MyDrillArray.push(<MyDrill
          id={DrillGroupId}
          myDrillsId={myDrillsId}
          name={name}
          attempts={attempts}
          score={score}
          onStart={this.props.onStart}
          onRemove={this.props.onRemove}
        />);
      }
    }
    return MyDrillArray
  }

  //  The next will generate all Drillz using the AllDrillz function
  generateAllDrillz(DrillGroups) {
    let AllDrillArray = [];
    // loop over array of drillGroups and call AllDrill everytime,
    //  using appropriate title param

    for (let i=0;i<DrillGroups.length;i++){
      AllDrillArray.push(AllDrill(DrillGroups[i],this.props.onAddToMyDrills))

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
       width: '100vw',
       height:'100vh',
    }

    const nav ={
      'display': 'flex',
      'flexDirection':'row',
      'justifyContent': 'flex-start',
      'width': '80vw',
    }

    const displayBox ={
      // this will probably need to be changed when we render the
      // topnav as well, probably should switch to 65vh/w
      width: '80vw',
      height:'80vh',
      border: 'solid black',
      'display': 'flex',
      'justifyContent': 'space-around',
      'alignContent':'center',
      'flexDirection':'row',
      'flexWrap': 'wrap'
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
