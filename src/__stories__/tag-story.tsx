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

const badgeOptions = ['0', '2', '14', 'true', 'false'];

type Args = {
    label: string;
    icon: boolean;
    inverse: boolean;
    badge: string;
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

export const Default: StoryComponent<Args> = ({label: labelFromArgs, icon, inverse, badge}) => {
    const getLabel = (fallback: string) => labelFromArgs || fallback;
    const badgeValue = badge !== 'true' && badge !== 'false' ? +badge : badge === 'true';

    return (
        <ResponsiveLayout fullWidth isInverse={inverse}>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'tags'}}>
                <Stack space={16}>
                    <Tag
                        Icon={icon ? IconOfferPercentFilled : undefined}
                        type="promo"
                        dataAttributes={{qsysid: 'promo'}}
                        badge={badgeValue}
                    >
                        {getLabel('Promo')}
                    </Tag>
                    <Tag Icon={icon ? IconStarFilled : undefined} type="active" badge={badgeValue}>
                        {getLabel('Active')}
                    </Tag>
                    <Tag Icon={icon ? IconTimeFilled : undefined} type="inactive" badge={badgeValue}>
                        {getLabel('Inactive')}
                    </Tag>
                    <Tag Icon={icon ? IconCheckRegular : undefined} type="success" badge={badgeValue}>
                        {getLabel('Success')}
                    </Tag>
                    <Tag Icon={icon ? IconAlertRegular : undefined} type="warning" badge={badgeValue}>
                        {getLabel('Warning')}
                    </Tag>
                    <Tag Icon={icon ? IconCloseRegular : undefined} type="error" badge={badgeValue}>
                        {getLabel('Error')}
                    </Tag>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Tag';
Default.args = {label: '', icon: true, inverse: false, badge: '0'};
