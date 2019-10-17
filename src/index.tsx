import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const reactContainer = document.createElement('div');

reactContainer.id = 'react-container';

document.body.appendChild(reactContainer);

ReactDOM.render(<App />, reactContainer);