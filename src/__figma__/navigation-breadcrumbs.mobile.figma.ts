// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4448-8247
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
    id: 'navigation-breadcrumbs-mobile',
    metadata: {nestable: false},
};
