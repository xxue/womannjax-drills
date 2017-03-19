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

function MyDrill (name, attempts, score){
  // STYLES
  const drillGroup= {
    'width': '40%',
    'height': '40%',
    border: 'solid darkseagreen'
  }
  // FUNCTIONS

  // RETURN
  return (<div style={drillGroup}>
            <h3>{name}</h3>
            <p>Taken: {attempts} Times</p>
            <p>{score}%</p>
            <Button>Start</Button>
            <Button>Remove</Button>
          </div>)
}

// render a single drill group in AllDrillz

function AllDrill (name){

  // STYLES
  const drillGroup= {
    'width': '40%',
    'height': '40%',
    border: 'solid goldenrod'
  }
  // FUNCTIONS

  // RETURN

  return (<div style={drillGroup}>
              <h3>{name}</h3>
              <Button>Add To My Drillz</Button>
          </div>)
}




export default class UserDrillBoard extends React.Component {

  constructor(props){
    super(props)

    this.state = props.state;
    this.generateMyDrillz = this.generateMyDrillz.bind(this);
    this.generateAllDrillz = this.generateAllDrillz.bind(this);
  }


  // So here I need a function 2 functions.
  // One which renders as many My Drills as needed (using the MyDrill function)

  generateMyDrillz(DrillGroups) {
    let MyDrillArray = [];
    // loop over array of drillGroups and call MyDrill every time,
    //  using appropriate params
    for (let i=0;i<DrillGroups.length; i++){
      MyDrillArray.push(MyDrill(DrillGroups[i].name, DrillGroups[i].attempts, DrillGroups[i].score))
    }
    return MyDrillArray
  }

  //  The next will generate all Drillz using the AllDrillz function
 generateAllDrillz(AllDrillGroups) {
    let AllDrillArray = [];
    // loop over array of drillGroups and call AllDrill everytime,
    //  using appropriate title param
    for (let i=0;i<AllDrillGroups;i++){
      AllDrillArray.push(AllDrill(AllDrillGroups[i].name))
    }

    return AllDrillArray
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
      'alignContent':'space-between',
      'flexDirection':'row',
      'flexWrap': 'wrap'
    }

    const li= {
      'display':'inline-block'
    }

            // FUNCTIONS

    function changeTab (selectedKey) {
      // this sould change the active key, to whatever is pressed
      // it should also clear the display box and call the approriate function above

    }

    // CHUNKS OF BOOTSTRAP/HTML

    const DrillzTabs= (
      <Nav bsStyle="tabs" activeKey={1} onSelect={changeTab}>
        <NavItem style={li} eventKey={1}>My Drillz</NavItem>
        <NavItem style={li} eventKey={2}>All Drillz</NavItem>
      </Nav>
    )

     // RETURN

    return (
      <div className='container' style={centered}>
        <div style={nav}>
          {DrillzTabs}
        </div>
        <div className='displayBox' style={displayBox}>
          {/* {MyDrill("Rails Routes", 4, 70)} */}
          {/* {AllDrill("Javascript Arrays")} */}
          {this.generateAllDrillz(this.state.allDrillGroups)}
          {/* All drills is broken and i don't know why... */}
          {this.generateMyDrillz(this.state.myDrillGroups)}
        </div>
      </div>
    )

  }
}
