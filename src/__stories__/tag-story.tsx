import * as React from 'react';
import {
    Stack,
    Tag,
    IconStarFilled,
    IconTimeFilled,
    IconOfferPercentFilled,
    IconCheckRegular,
    IconCloseRegular,
    IconAlertRegular,
    ResponsiveLayout,
    Box,
    skinVars,
} from '..';

const badgeOptions = ['true', 'false', 'undefined', '0', '1', '5', '10'];

type Args = {
    label: string;
    icon: boolean;
    inverse: boolean;
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

export const Default: StoryComponent<Args> = ({
    label: labelFromArgs,
    icon,
    inverse,
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
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'tags'}}>
                <Stack space={16}>
                    <Tag
                        Icon={icon ? IconOfferPercentFilled : undefined}
                        type="promo"
                        dataAttributes={{qsysid: 'promo'}}
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    >
                        {getLabel('Promo')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconCloseRegular : undefined}
                        type="info"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    >
                        {getLabel('Info')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconStarFilled : undefined}
                        type="active"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    >
                        {getLabel('Active')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconTimeFilled : undefined}
                        type="inactive"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    >
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconCheckRegular : undefined}
                        type="success"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    >
                        {getLabel('Success')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconAlertRegular : undefined}
                        type="warning"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                    >
                        {getLabel('Warning')}
                    </Tag>
                    <Tag
                        Icon={icon ? IconCloseRegular : undefined}
                        type="error"
                        badge={badgeValue}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
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
    inverse: false,
    badge: '0',
    colorConfig: 'default',
    textColorFromSkin: skinVars.colors.inverse,
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
};
