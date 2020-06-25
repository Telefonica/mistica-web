import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import NavigationBreadcrumbs from '../navigation-breadcrumbs';

export default {
    title: 'Components|Others/NavigationBreadcrumbs',
};

export const Default: StoryComponent = () => (
    <MemoryRouter>
        <NavigationBreadcrumbs title="Facturas" breadcrumbs={[{title: 'Cuenta', url: '/consumptions'}]} />
    </MemoryRouter>
);

Default.story = {name: 'NavigationBreadcrumbs'};
