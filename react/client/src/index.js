import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Router from './router';

const App = props => {

  return <div>
      <Router state={ { path: '/', user: {} } }/>
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
