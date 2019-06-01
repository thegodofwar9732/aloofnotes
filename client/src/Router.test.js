import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Router from './Router'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router />, div);
  ReactDOM.unmountComponentAtNode(div);
});
