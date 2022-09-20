import * as React from 'react';
import NavigationBreadcrumbs from '../navigation-breadcrumbs';

export default {
    title: 'Components/Breadcrumbs',
};

export const Default: StoryComponent = () => (
    <NavigationBreadcrumbs
        dataAttributes={{testid: 'story'}}
        title="Subsection"
        breadcrumbs={[
            {title: 'Home', url: 'https://example.org?path=home'},
            {title: 'Section', url: 'https://example.org?path=section'},
        ]}
    />
);

Default.storyName = 'Breadcrumbs';
