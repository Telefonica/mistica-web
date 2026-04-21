import * as React from 'react';
import {createRoot} from 'react-dom/client';
import '@telefonica/mistica/css/mistica.css';
import Component from './streaming-home-page-after';

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(Component));
