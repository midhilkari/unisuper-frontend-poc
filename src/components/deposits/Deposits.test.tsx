import React from 'react';
import ReactDOM from 'react-dom';
import Deposits from './Deposits';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Deposits />, div);
  ReactDOM.unmountComponentAtNode(div);
});
