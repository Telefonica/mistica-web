// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=26097-1822
// source=src/timeline.tsx
// component=Timeline
import figma from 'figma';

const instance = figma.selectedInstance;

// "Orientation" is a VARIANT mapping onto the `orientation` code prop.
const orientation = instance.getEnum('Orientation', {
    Vertical: 'vertical',
    Horizontal: 'horizontal',
});

export default {
    example: figma.code`
        <Timeline orientation="${orientation}">
            <TimelineItem state="completed" asset={{kind: 'dot'}}>
                Completed step
            </TimelineItem>
            <TimelineItem state="active" asset={{kind: 'dot'}}>
                Active step
            </TimelineItem>
            <TimelineItem state="inactive" asset={{kind: 'dot'}}>
                Inactive step
            </TimelineItem>
        </Timeline>
    `,
    imports: ['import {Timeline, TimelineItem} from "@telefonica/mistica";'],
    id: 'timeline',
    metadata: {nestable: false},
};
