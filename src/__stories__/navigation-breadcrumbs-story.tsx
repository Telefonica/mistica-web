import * as React from 'react';
import {Box, NavigationBreadcrumbs, ResponsiveLayout} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Breadcrumbs',
    parameters: {fullScreen: true},
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    variantOutside: Variant;
};

export const Default: StoryComponent<Args> = ({variantOutside}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <NavigationBreadcrumbs
                    dataAttributes={{testid: 'story'}}
                    title="Subsection"
                    breadcrumbs={[
                        {title: 'Home', url: 'https://example.org?path=home'},
                        {title: 'Section', url: 'https://example.org?path=section'},
                    ]}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Breadcrumbs';

Default.args = {
    variantOutside: 'default',
};
