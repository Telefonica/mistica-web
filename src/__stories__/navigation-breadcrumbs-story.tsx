import * as React from 'react';
import {Box, NavigationBreadcrumbs, ResponsiveLayout} from '..';

export default {
    title: 'Components/Breadcrumbs',
    parameters: {fullScreen: true},
};

type Args = {
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({inverse}) => {
    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
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
    inverse: false,
};
