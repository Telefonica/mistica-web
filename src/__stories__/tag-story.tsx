import * as React from 'react';
import {
    Tag,
    IconStarFilled,
    IconTimeFilled,
    IconOfferPercentFilled,
    IconCheckRegular,
    IconCloseRegular,
    IconAlertRegular,
    ResponsiveLayout,
    Stack,
    Box,
} from '..';

import type {IconProps} from '..';

export default {
    title: 'Components/Tag',
};

type Args = {
    label: string;
    withIcon: boolean;
    isInverse: boolean;
};

export const Default: StoryComponent<Args> = ({label: labelFromArgs, withIcon, isInverse}) => {
    const getLabel = (fallback: string) => labelFromArgs || fallback;
    const getIcon = (icon: (props: IconProps) => JSX.Element) => (withIcon ? icon : undefined);

    return (
        <ResponsiveLayout fullWidth dataAttributes={{testid: 'tags'}} isInverse={isInverse}>
            <Box padding={16}>
                <Stack space={16}>
                    <Tag
                        Icon={getIcon(IconOfferPercentFilled)}
                        type="promo"
                        dataAttributes={{qsysid: 'promo'}}
                    >
                        {getLabel('Promo')}
                    </Tag>
                    <Tag Icon={getIcon(IconStarFilled)} type="active">
                        {getLabel('Active')}
                    </Tag>
                    <Tag Icon={getIcon(IconTimeFilled)} type="inactive">
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag Icon={getIcon(IconCheckRegular)} type="success">
                        {getLabel('Success')}
                    </Tag>
                    <Tag Icon={getIcon(IconAlertRegular)} type="warning">
                        {getLabel('Warning')}
                    </Tag>
                    <Tag Icon={getIcon(IconCloseRegular)} type="error">
                        {getLabel('Error')}
                    </Tag>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tag';
Default.args = {label: '', withIcon: true, isInverse: false};
