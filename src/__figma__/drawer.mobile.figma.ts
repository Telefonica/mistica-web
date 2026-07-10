// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=48528-4975
// source=src/drawer.tsx
// component=Drawer
import figma from 'figma';

const instance = figma.selectedInstance;

// "Title", "Subtitle" and "Description" are BOOLEANs toggling their text layers.
const hasTitle = instance.getBoolean('Title');
const hasSubtitle = instance.getBoolean('Subtitle');
const hasDescription = instance.getBoolean('Description');

export default {
    example: figma.code`
        <Drawer
            ${hasTitle ? figma.code`title="Title"` : ''}
            ${hasSubtitle ? figma.code`subtitle="Subtitle"` : ''}
            ${hasDescription ? figma.code`description="Description"` : ''}
            onClose={() => {}}
        >
            Content
        </Drawer>
    `,
    imports: ['import {Drawer} from "@telefonica/mistica";'],
    id: 'drawer-mobile',
    metadata: {nestable: false},
};
