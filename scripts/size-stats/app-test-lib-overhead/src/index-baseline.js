import * as React from 'react';
import {createRoot} from 'react-dom/client';

/*
Using React.createElement so we don't need to compile JSX

<React.StrictMode>
    <div>Hello</div>
</React.StrictMode>,
*/

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, {}, React.createElement('div', {}, 'Hello')));
