import React from 'react';
import NavigationBreadcrumbs from '../navigation-breadcrumbs';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    NavigationBreadcrumbs,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2241%3A4171',
    {
        props: {},
        example: () => (
            <NavigationBreadcrumbs
                title="Current page"
                breadcrumbs={[
                    {title: 'Home', url: '/'},
                    {title: 'Parent', url: '/parent'},
                ]}
            />
        ),
    }
);

// Mobile
figma.connect(
    NavigationBreadcrumbs,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4448%3A8247',
    {
        props: {},
        example: () => (
            <NavigationBreadcrumbs
                title="Current page"
                breadcrumbs={[
                    {title: 'Home', url: '/'},
                    {title: 'Parent', url: '/parent'},
                ]}
            />
        ),
    }
);
