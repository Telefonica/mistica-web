import * as React from 'react';
import {Avatar, IconBrainRegular, IconFireRegular, IconStarFilled} from '..';

export default {
    title: 'Components/Avatar',
    argTypes: {
        size: {control: {type: 'range', min: 24, max: 128, step: 4}},
        badge: {
            options: ['true', 'false', 'undefined', '0', '1', '5', '10'],
            control: {type: 'select'},
        },
        icon: {
            options: ['undefined', 'IconStarFilled', 'IconFireRegular', 'IconBrainRegular'],
            control: {type: 'select'},
        },
    },
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    size: number;
    url: string;
    initials: string;
    icon: string;
    badge: string;
};

export const Default: StoryComponent<Args> = ({size, initials, badge, url, icon}) => {
    // eslint-disable-next-line no-eval
    const badgeValue = eval(badge);
    const Icon = {IconStarFilled, IconFireRegular, IconBrainRegular}[icon];

    return (
        <div style={{padding: 16, width: 'fit-content'}} data-testid="avatar">
            <Avatar size={size} initials={initials} badge={badgeValue} url={url || undefined} Icon={Icon} />
        </div>
    );
};

Default.storyName = 'Avatar';

Default.args = {
    size: 64,
    url: 'https://i.imgur.com/nRBEMMV.png',
    initials: 'PL',
    icon: 'undefined',
    badge: '5',
};
