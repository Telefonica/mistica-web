import * as React from 'react';
import {Box, ResponsiveLayout, PageBullets} from '..';

export default {
    title: 'Components/Carousels/Utils/PageBullets',
};

type Args = {
    numPages: number;
};

export const Default: StoryComponent<Args> = ({numPages}) => (
    <Box paddingY={24}>
        <ResponsiveLayout>
            <PageBullets numPages={numPages} currentIndex={0} />
        </ResponsiveLayout>
    </Box>
);

Default.storyName = 'PageBullets';
Default.parameters = {fullScreen: true};
Default.args = {
    numPages: 5,
};
