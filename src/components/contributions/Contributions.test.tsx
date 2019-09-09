import React from 'react';
import ReactDOM from 'react-dom';
import Contributions from './Contributions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Contributions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
