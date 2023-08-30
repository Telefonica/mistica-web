import * as React from 'react';
import {ResponsiveLayout, Box} from '..';
import avatarImg from './images/avatar.jpg';

const badgeOptions = ['true', 'false', 'undefined', '0', '1', '5', '10'];

export default {
    title: 'Components/Avatar',
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 128, step: 4},
        },
        badge: {
            options: badgeOptions,
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
    hideImage: boolean;
    src: string;
    hideInitials: boolean;
    initials: string;
    icon: string;
    badge: string;
    inverse: boolean;
    ariaLabel: string;
    border: boolean;
};

export const Default: StoryComponent<Args> = ({inverse}) => {
    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16} width="fit-content" dataAttributes={{testid: 'avatar'}}>
                <div
                    style={{
                        // prevent line-height from affecting the height of the container;
                        // happens when changing the base font size
                        lineHeight: 0,
                    }}
                >
                    test
                </div>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Avatar';

Default.args = {
    size: 50,
    hideImage: false,
    src: avatarImg,
    hideInitials: false,
    initials: 'PL',
    icon: 'undefined',
    badge: '5',
    inverse: false,
    ariaLabel: 'Avatar',
    border: false,
};
