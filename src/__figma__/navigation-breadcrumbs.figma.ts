// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2241-4171
// source=src/navigation-breadcrumbs.tsx
// component=NavigationBreadcrumbs
import figma from 'figma';

export default {
    example: figma.code`
        <NavigationBreadcrumbs
            title="Current page"
            breadcrumbs={[
                {title: 'Home', url: '/'},
                {title: 'Parent', url: '/parent'},
            ]}
        />
    `,
    imports: ['import {NavigationBreadcrumbs} from "@telefonica/mistica";'],
    id: 'navigation-breadcrumbs',
    metadata: {nestable: false},
};
