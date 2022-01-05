import * as React from 'react';
import ReactDOM from 'react-dom';

/*
Using React.createElement so we don't need to compile JSX

<React.StrictMode>
    <div>Hello</div>
</React.StrictMode>,
*/

ReactDOM.render(
    React.createElement(React.StrictMode, {}, React.createElement('div', {}, 'Hello')),
    document.getElementById('root')
);
