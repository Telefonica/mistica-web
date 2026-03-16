import * as React from 'react';
import {Box, Icon, InfoRating, Rating, ResponsiveLayout} from '..';
import {vars} from '../skins/skin-contract.css';

import type {Variant} from '../theme-variant-context';
import type {IconPropsWithoutName} from '../icon';

export default {
    title: 'Components/Rating',
    parameters: {fullScreen: true},
};

type RatingArgs = {
    variantOutside: Variant;
    count: number;
    size: number;
    type: 'quantitative' | 'qualitative';
    disabled: boolean;
    customIcons: boolean;
};

const IconBatteryChargingFilled = (props: IconPropsWithoutName) => (
    <Icon {...props} name="battery-charging-filled" />
);
const IconBatteryChargingRegular = (props: IconPropsWithoutName) => (
    <Icon {...props} name="battery-charging-regular" />
);
const IconBatteryLowFilled = (props: IconPropsWithoutName) => <Icon {...props} name="battery-low-filled" />;
const IconBatteryLowRegular = (props: IconPropsWithoutName) => <Icon {...props} name="battery-low-regular" />;
const IconBatteryMediumFilled = (props: IconPropsWithoutName) => (
    <Icon {...props} name="battery-medium-filled" />
);
const IconBatteryMediumRegular = (props: IconPropsWithoutName) => (
    <Icon {...props} name="battery-medium-regular" />
);
const IconBatteryFullFilled = (props: IconPropsWithoutName) => <Icon {...props} name="battery-full-filled" />;
const IconBatteryFullRegular = (props: IconPropsWithoutName) => (
    <Icon {...props} name="battery-full-regular" />
);
const IconCheckedFilled = (props: IconPropsWithoutName) => <Icon {...props} name="checked-filled" />;
const IconCheckedRegular = (props: IconPropsWithoutName) => <Icon {...props} name="checked-regular" />;

export const RatingStory: StoryComponent<RatingArgs> = ({
    variantOutside,
    count,
    size,
    type,
    disabled,
    customIcons,
}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
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
    variantOutside: 'default',
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
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
};

type InfoRatingArgs = {
    variantOutside: Variant;
    count: number;
    value: number;
    size: number;
    withHalfValue: boolean;
    customIcons: boolean;
};

export const InfoRatingStory: StoryComponent<InfoRatingArgs> = ({
    variantOutside,
    count,
    value,
    size,
    withHalfValue,
    customIcons,
}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
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
    variantOutside: 'default',
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
