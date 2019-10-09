import './styles/style.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

const data = require('../data/jpm.json');
window['data'] = data;
render(React.createElement(App), document.getElementById("root"));
