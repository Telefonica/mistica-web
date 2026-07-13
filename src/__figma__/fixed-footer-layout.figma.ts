// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1384-5059
// source=src/fixed-footer-layout.tsx
// component=FixedFooterLayout
import figma from 'figma';

const instance = figma.selectedInstance;

// The footer content is provided through the "🔄 Replace Slot" instance-swap.
const footer = instance.getInstanceSwap('🔄 Replace Slot');
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
    id: 'fixed-footer-layout',
    metadata: {nestable: false},
};
