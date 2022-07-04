import * as React from 'react';
import NavigationBreadcrumbs from '../navigation-breadcrumbs';

export default {
    title: 'Components/Navigation breadcrumbs',
};

export const Default: StoryComponent = () => (
    <NavigationBreadcrumbs title="Facturas" breadcrumbs={[{title: 'Cuenta', url: '/consumptions'}]} />
);

Default.storyName = 'Navigation breadcrumbs';
