// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=20228-4401
// source=src/rating.tsx
// component=Rating
import figma from 'figma';

const instance = figma.selectedInstance;

// "Type" is a VARIANT mapping onto the `type` code prop.
const type = instance.getEnum('Type', {
    Quantitative: 'quantitative',
    Qualititative: 'qualitative',
});

// "Disabled" is a VARIANT (On | Off) mapping onto the boolean `disabled` code prop.
const disabled = instance.getEnum('Disabled', {On: true, Off: false});

export default {
    example: figma.code`
        <Rating type="${type}" ${disabled ? 'disabled' : ''} onChangeValue={(value) => {}} />
    `,
    imports: ['import {Rating} from "@telefonica/mistica";'],
    id: 'rating',
    metadata: {nestable: false},
};
