// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1335-6535
// source=src/fixed-footer-layout.tsx
// component=FixedFooterLayout
import figma from 'figma';

const instance = figma.selectedInstance;

// The footer content is provided through the "REPLACE ME!" slot instance.
const footer = instance.findInstance('REPLACE ME!');
let footerCode;
if (footer && footer.type === 'INSTANCE') {
    footerCode = footer.executeTemplate().example;
}

export default {
    example: figma.code`
        <FixedFooterLayout footer={${footerCode}}>
            {content}
        </FixedFooterLayout>
    `,
    imports: ['import {FixedFooterLayout} from "@telefonica/mistica";'],
    id: 'fixed-footer-layout-mobile',
    metadata: {nestable: false},
};
