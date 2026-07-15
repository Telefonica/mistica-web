// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=18430-176
// source=src/timer.tsx
// component=TextTimer
import figma from 'figma';

const instance = figma.selectedInstance;

// "Label type" is a VARIANT mapping onto the `labelType` code prop.
const labelType = instance.getEnum('Label type', {
    None: 'none',
    Short: 'short',
    Long: 'long',
});

// "Max value" / "Min value" are VARIANTs mapping onto `maxTimeUnit` / `minTimeUnit`.
const maxTimeUnit = instance.getEnum('Max value', {
    Days: 'days',
    Hours: 'hours',
    Minutes: 'minutes',
    Seconds: 'seconds',
});

const minTimeUnit = instance.getEnum('Min value', {
    Seconds: 'seconds',
    Minutes: 'minutes',
    Hours: 'hours',
    Days: 'days',
});

export default {
    example: figma.code`
        <TextTimer
            endTimestamp={new Date('2025-12-31T23:59:59')}
            maxTimeUnit="${maxTimeUnit}"
            minTimeUnit="${minTimeUnit}"
            labelType="${labelType}"
        />
    `,
    imports: ['import {TextTimer} from "@telefonica/mistica";'],
    id: 'text-timer',
    metadata: {nestable: false},
};
