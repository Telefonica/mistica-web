import * as React from 'react';
import {Box, ResponsiveLayout, PageBullets} from '..';

export default {
    title: 'Components/Carousel/PageBullets',
};

type Args = {
    numPages: number;
};

export const Default: StoryComponent<Args> = ({numPages}) => {
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <PageBullets
                    numPages={numPages}
                    currentIndex={Math.min(currentIndex, numPages - 1)}
                    onPress={setCurrentIndex}
                />
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'PageBullets';
Default.parameters = {fullScreen: true};
Default.args = {
    numPages: 5,
};
