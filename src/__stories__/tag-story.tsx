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
} from '..';

type Args = {
    label: string;
    icon: boolean;
    inverse: boolean;
};

export default {
    title: 'Components/Tag',
    parameters: {fullScreen: true},
};

export const Default: StoryComponent<Args> = ({label: labelFromArgs, icon, inverse}) => {
    const getLabel = (fallback: string) => labelFromArgs || fallback;

    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'tags'}}>
                <Stack space={16}>
                    <Tag
                        Icon={icon ? IconOfferPercentFilled : undefined}
                        type="promo"
                        dataAttributes={{qsysid: 'promo'}}
                    >
                        {getLabel('Promo')}
                    </Tag>
                    <Tag Icon={icon ? IconStarFilled : undefined} type="active">
                        {getLabel('Active')}
                    </Tag>
                    <Tag Icon={icon ? IconTimeFilled : undefined} type="inactive">
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag Icon={icon ? IconCheckRegular : undefined} type="success">
                        {getLabel('Success')}
                    </Tag>
                    <Tag Icon={icon ? IconAlertRegular : undefined} type="warning">
                        {getLabel('Warning')}
                    </Tag>
                    <Tag Icon={icon ? IconCloseRegular : undefined} type="error">
                        {getLabel('Error')}
                    </Tag>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tag';
Default.args = {label: '', icon: true, inverse: false};
