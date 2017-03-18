import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home';
import Router from './router';

const App = props => {

  return <div>
      <Router />
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
