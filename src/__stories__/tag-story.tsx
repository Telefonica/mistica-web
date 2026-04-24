import * as React from 'react';
import {Stack, Tag, Icon, IconStarFilled, IconCloseRegular, ResponsiveLayout, Box, skinVars} from '..';

import type {Variant} from '../theme-variant-context';
import type {IconPropsWithoutName} from '../icon';

const badgeOptions = ['true', 'false', 'undefined', '0', '1', '5', '10'];

type Args = {
    label: string;
    icon: boolean;
    small: boolean;
    variantOutside: Variant;
    badge: string;
    colorConfig: 'default' | 'color from skin' | 'custom color';
    textColorFromSkin: string;
    textColorCustom: string;
    backgroundColorFromSkin: string;
    backgroundColorCustom: string;
};

export default {
    title: 'Components/Tag',
    parameters: {fullScreen: true},
    argTypes: {
        badge: {
            options: badgeOptions,
            control: {type: 'select'},
        },
    },
};

const IconOfferPercentFilled = (props: IconPropsWithoutName) => (
    <Icon {...props} name="offer-percent-filled" />
);
const IconTimeFilled = (props: IconPropsWithoutName) => <Icon {...props} name="time-filled" />;
const IconCheckRegular = (props: IconPropsWithoutName) => <Icon {...props} name="check-regular" />;
const IconAlertRegular = (props: IconPropsWithoutName) => <Icon {...props} name="alert-regular" />;

export const Default: StoryComponent<Args> = ({
    label: labelFromArgs,
    icon,
    small,
    variantOutside,
    badge,
    textColorFromSkin,
    textColorCustom,
    backgroundColorFromSkin,
    backgroundColorCustom,
}) => {
    const getLabel = (fallback: string) => labelFromArgs || fallback;
    // eslint-disable-next-line no-eval
    const badgeValue = badgeOptions.includes(badge) ? eval(badge) : undefined;
    const textColor = textColorFromSkin || textColorCustom;
    const backgroundColor = backgroundColorFromSkin || backgroundColorCustom;

    return (
        <ResponsiveLayout fullWidth variant={variantOutside}>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'tags'}}>
                <Stack space={16}>
                    <Tag
                        Icon={icon ? IconOfferPercentFilled : undefined}
                        type="promo"
                        dataAttributes={{qsysid: 'promo'}}
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Promo')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconCloseRegular : undefined}
                        type="info"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Info')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconStarFilled : undefined}
                        type="active"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Active')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconTimeFilled : undefined}
                        type="inactive"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconCheckRegular : undefined}
                        type="success"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Success')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconAlertRegular : undefined}
                        type="warning"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Warning')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconCloseRegular : undefined}
                        type="error"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        small={small}
                    >
                        {getLabel('Error')}
                    </Tag>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tag';
Default.args = {
    label: '',
    icon: true,
    small: false,
    variantOutside: 'default',
    badge: '0',
    colorConfig: 'default',
    textColorFromSkin: skinVars.colors.textPrimaryBrand,
    backgroundColorFromSkin: skinVars.colors.neutralHigh,
    textColorCustom: '#fff',
    backgroundColorCustom: 'red',
};

Default.argTypes = {
    colorConfig: {
        options: ['default', 'color from skin', 'custom color'],
        control: {type: 'select'},
    },
    textColorFromSkin: {
        control: {type: 'select'},
        options: {'none (determined by variant)': '', ...skinVars.colors},
        if: {arg: 'colorConfig', eq: 'color from skin'},
    },
    backgroundColorFromSkin: {
        control: {type: 'select'},
        options: {'none (determined by variant)': '', ...skinVars.colors},
        if: {arg: 'colorConfig', eq: 'color from skin'},
    },
    textColorCustom: {
        control: {type: 'color'},
        if: {arg: 'colorConfig', eq: 'custom color', presetColors: ['red', 'green', '#000']},
    },
    backgroundColorCustom: {
        control: {type: 'color'},
        if: {arg: 'colorConfig', eq: 'custom color'},
    },
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
};
