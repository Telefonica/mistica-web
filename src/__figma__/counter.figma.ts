// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=12021-3044
// source=src/counter.tsx
// component=Counter
import figma from 'figma';

const instance = figma.selectedInstance;

// "Remove" is a VARIANT (False | True) toggling the `onRemove` callback.
const remove = instance.getEnum('Remove', {True: true, False: false});

// "Disabled" is a VARIANT (False | True) mapping onto the `disabled` boolean prop.
const disabled = instance.getEnum('Disabled', {True: true, False: false});

export default {
    example: figma.code`
        <Counter
            defaultValue={1}
            ${disabled ? 'disabled' : ''}
            ${remove ? 'onRemove={() => {}}' : ''}
            onChangeValue={(value) => {}}
        />
    `,
    imports: ['import {Counter} from "@telefonica/mistica";'],
    id: 'counter',
    metadata: {nestable: false},
};
