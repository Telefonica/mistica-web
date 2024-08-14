import * as React from 'react';
import {Box, InfoRating, Rating, ResponsiveLayout} from '..';

export default {
    title: 'Components/Rating',
    parameters: {fullScreen: true},
};

type RatingArgs = {
    inverse: boolean;
    count: number;
    size: number;
    type: 'quantitative' | 'qualitative';
    disabled: boolean;
};

export const RatingStory: StoryComponent<RatingArgs> = ({inverse, count, size, type, disabled}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <div data-testid="rating-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Rating
                        size={size}
                        disabled={disabled}
                        {...(type === 'qualitative'
                            ? {type}
                            : {
                                  type,
                                  count,
                              })}
                    />
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

RatingStory.storyName = 'Rating';

RatingStory.args = {
    type: 'quantitative',
    count: 5,
    size: 32,
    disabled: false,
    inverse: false,
};

RatingStory.argTypes = {
    type: {
        options: ['quantitative', 'qualitative'],
        control: {type: 'select'},
    },
    count: {
        control: {type: 'range', min: 1, max: 5},
        if: {arg: 'type', eq: 'quantitative'},
    },
    size: {
        control: {type: 'range', min: 16, max: 64, step: 4},
    },
};

type InfoRatingArgs = {
    inverse: boolean;
    count: number;
    value: number;
    size: number;
};

export const InfoRatingStory: StoryComponent<InfoRatingArgs> = ({inverse, count, value, size}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <InfoRating
                    value={value}
                    count={count}
                    size={size}
                    dataAttributes={{testid: 'info-rating'}}
                />
            </Box>
        </ResponsiveLayout>
    );
};

InfoRatingStory.storyName = 'InfoRating';

InfoRatingStory.args = {
    inverse: false,
    count: 5,
    size: 16,
    value: 0,
};

InfoRatingStory.argTypes = {
    count: {
        control: {type: 'range', min: 1, max: 5},
        if: {arg: 'type', eq: 'quantitative'},
    },
    size: {
        control: {type: 'range', min: 16, max: 64, step: 4},
    },
};
