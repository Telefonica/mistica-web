// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=38945-1300
// source=src/timer.tsx
// component=Timer
import figma from 'figma';

const instance = figma.selectedInstance;

// "Boxed" is a VARIANT (False | True) mapping onto the boolean `boxed` code prop.
const boxed = instance.getEnum('Boxed', {True: true, False: false});

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
        <Timer
            endTimestamp={new Date('2025-12-31T23:59:59')}
            maxTimeUnit="${maxTimeUnit}"
            minTimeUnit="${minTimeUnit}"
            ${boxed ? 'boxed' : ''}
        />
    `,
    imports: ['import {Timer} from "@telefonica/mistica";'],
    id: 'timer-mobile',
    metadata: {nestable: false},
};
