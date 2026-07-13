// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=30916-17448
// source=src/list.tsx
// component=UnorderedList
import figma from 'figma';

const instance = figma.selectedInstance;

const textLayer = instance.findText('Text');
const text = textLayer.type === 'TEXT' ? textLayer.textContent : '';

// "Marker type" VARIANT decides the list item marker. "None" hides the marker,
// "Icon" swaps in the "Icon" instance rendered as the ListItem `icon`.
const markerType = instance.getEnum('Marker type', {
    Default: 'default',
    Icon: 'icon',
    Custom: 'custom',
    None: 'none',
});

const icon = markerType === 'icon' ? instance.getInstanceSwap('Icon') : null;
let iconCode;
if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example;
}

export default {
    example: figma.code`
        <UnorderedList>
            <ListItem
                ${markerType === 'none' ? 'withMarker={false}' : ''}
                ${iconCode ? figma.code`icon={${iconCode}}` : ''}
            >
                ${text}
            </ListItem>
        </UnorderedList>
    `,
    imports: ['import {UnorderedList, ListItem} from "@telefonica/mistica";'],
    id: 'unordered-list',
    metadata: {nestable: false},
};
