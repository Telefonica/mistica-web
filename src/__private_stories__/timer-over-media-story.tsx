import * as React from 'react';
import {Box, PosterCard, Stack, Timer} from '..';
import tennisImg from '../__stories__/images/tennis.jpg';

export default {
    title: 'Private/Timer over media',
};

const BACKGROUND_IMAGE_SRC = tennisImg;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const Default: StoryComponent = () => {
    return (
        <PosterCard
            dataAttributes={{testid: 'card'}}
            backgroundImage={BACKGROUND_IMAGE_SRC}
            isInverse={false}
            width="auto"
            height="auto"
            aspectRatio="auto"
            title="Title"
            extra={
                <Box paddingTop={16}>
                    <Stack space={16}>
                        <Timer
                            endTimestamp={Date.now() + DAY}
                            minTimeUnit="seconds"
                            maxTimeUnit="days"
                            boxed
                        />
                        <Timer endTimestamp={Date.now() + DAY} minTimeUnit="seconds" maxTimeUnit="days" />
                    </Stack>
                </Box>
            }
        />
    );
};

Default.storyName = 'Timer over media';
