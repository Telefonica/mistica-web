// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=302-5497
// source=src/snackbar.tsx
// component=Snackbar
import figma from 'figma';

const instance = figma.selectedInstance;

const messageLayer = instance.findText('Text');
const message = messageLayer.type === 'TEXT' ? messageLayer.textContent : 'Snackbar message';

const type = instance.getEnum('Type', {Informative: 'INFORMATIVE', Critical: 'CRITICAL'});

// "Action" is a VARIANT (No | Yes) toggling the presence of the action button.
const buttonText = instance.getEnum('Action', {Yes: 'Action', No: undefined});

// "Duration" is a VARIANT (Default | Infinite); only "Infinite" maps onto the
// `duration` code prop.
const duration = instance.getEnum('Duration', {Default: undefined, Infinite: 'PERSISTENT'});

const withDismiss = instance.getBoolean('Dismiss');

export default {
    example: figma.code`
        <Snackbar
            message="${message}"
            ${type ? figma.code`type="${type}"` : ''}
            ${buttonText ? figma.code`buttonText="${buttonText}"` : ''}
            ${duration ? figma.code`duration="${duration}"` : ''}
            ${withDismiss ? 'withDismiss' : ''}
        />
    `,
    imports: ['import {Snackbar} from "@telefonica/mistica";'],
    id: 'snackbar',
    metadata: {nestable: false},
};
