// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=17101-10577
// source=src/header.tsx
// component=Header
import figma from 'figma';

const instance = figma.selectedInstance;

const pretitleLayer = instance.findText('Pretitle');
const pretitle = pretitleLayer.type === 'TEXT' ? pretitleLayer.textContent : '';

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

// "Small" is a VARIANT (False | True) mapping to the boolean `small` code prop.
const small = instance.getEnum('Small', {True: true, False: false});

export default {
    example: figma.code`
        <Header
            pretitle="${pretitle}"
            title="${title}"
            description="${description}"
            ${small ? 'small' : ''}
        />
    `,
    imports: ['import {Header} from "@telefonica/mistica";'],
    id: 'header-mobile',
    metadata: {nestable: false},
};
