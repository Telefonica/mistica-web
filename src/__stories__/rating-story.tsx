import * as React from 'react';
import {
    Box,
    IconBatteryChargingFilled,
    IconBatteryChargingRegular,
    IconBatteryFullFilled,
    IconBatteryFullRegular,
    IconBatteryLowFilled,
    IconBatteryLowRegular,
    IconBatteryMediumFilled,
    IconBatteryMediumRegular,
    IconCheckedFilled,
    IconCheckedRegular,
    InfoRating,
    Rating,
    ResponsiveLayout,
} from '..';
import {vars} from '../skins/skin-contract.css';

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
    customIcons: boolean;
};

export const RatingStory: StoryComponent<RatingArgs> = ({
    inverse,
    count,
    size,
    type,
    disabled,
    customIcons,
}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <div data-testid="rating-wrapper" style={{maxWidth: 'fit-content'}}>
                    <Rating
                        size={size}
                        disabled={disabled}
                        {...(type === 'qualitative'
                            ? {
                                  type,
                                  valueLabels: customIcons
                                      ? ['no battery', 'low battery', 'mid battery', 'full battery']
                                      : undefined,
                                  icons: customIcons
                                      ? [
                                            {
                                                ActiveIcon: IconBatteryChargingFilled,
                                                InactiveIcon: IconBatteryChargingRegular,
                                                color: vars.colors.controlActivated,
                                            },
                                            {
                                                ActiveIcon: IconBatteryLowFilled,
                                                InactiveIcon: IconBatteryLowRegular,
                                                color: vars.colors.error,
                                            },
                                            {
                                                ActiveIcon: IconBatteryMediumFilled,
                                                InactiveIcon: IconBatteryMediumRegular,
                                                color: vars.colors.warning,
                                            },

                                            {
                                                ActiveIcon: IconBatteryFullFilled,
                                                InactiveIcon: IconBatteryFullRegular,
                                                color: vars.colors.success,
                                            },
                                        ]
                                      : undefined,
                              }
                            : {
                                  type,
                                  count,
                                  icon: customIcons
                                      ? {
                                            ActiveIcon: IconCheckedFilled,
                                            InactiveIcon: IconCheckedRegular,
                                            color: vars.colors.success,
                                        }
                                      : undefined,
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
    customIcons: false,
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
    withHalfValue: boolean;
    customIcons: boolean;
};

export const InfoRatingStory: StoryComponent<InfoRatingArgs> = ({
    inverse,
    count,
    value,
    size,
    withHalfValue,
    customIcons,
}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16}>
                <InfoRating
                    value={value}
                    count={count}
                    size={size}
                    withHalfValue={withHalfValue}
                    icon={
                        customIcons
                            ? {
                                  ActiveIcon: IconCheckedFilled,
                                  InactiveIcon: IconCheckedRegular,
                                  color: vars.colors.success,
                              }
                            : undefined
                    }
                    dataAttributes={{testid: 'info-rating'}}
                />
            </Box>
        </ResponsiveLayout>
    );
};

InfoRatingStory.storyName = 'InfoRating';

InfoRatingStory.args = {
    inverse: false,
    withHalfValue: false,
    count: 5,
    size: 16,
    value: 0,
    customIcons: false,
};

InfoRatingStory.argTypes = {
    count: {
        control: {type: 'range', min: 1, max: 5},
    },
    size: {
        control: {type: 'range', min: 16, max: 64, step: 4},
    },
};
