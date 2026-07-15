// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=38178-702
// source=src/cover-hero.tsx
// component=CoverHero
import figma from 'figma';

const instance = figma.selectedInstance;

// "Centered" and "NoPaddingY" are VARIANTs (False | True) mapping onto boolean props.
const centered = instance.getEnum('Centered', {True: true, False: false});
const noPaddingY = instance.getEnum('NoPaddingY', {True: true, False: false});

export default {
    example: figma.code`
        <CoverHero
            title="Title"
            ${centered ? 'centered' : ''}
            ${noPaddingY ? 'noPaddingY' : ''}
        />
    `,
    imports: ['import {CoverHero} from "@telefonica/mistica";'],
    id: 'cover-hero-mobile',
    metadata: {nestable: false},
};
