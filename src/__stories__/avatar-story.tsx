import * as React from 'react';
import {Avatar, IconBrainRegular, IconFireRegular, IconStarFilled, ThemeVariant, skinVars} from '..';

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
};

export const Default: StoryComponent<Args> = ({
    size,
    initials,
    badge,
    src,
    icon,
    inverse,
    hideImage,
    hideInitials,
    ariaLabel,
}) => {
    // eslint-disable-next-line no-eval
    const badgeValue = badgeOptions.includes(badge) ? eval(badge) : undefined;
    const Icon = {IconStarFilled, IconFireRegular, IconBrainRegular}[icon];

    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    padding: 16,
                    width: 'fit-content',
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                    // prevent line-height from affecting the height of the container;
                    // happens when changing the base font size
                    lineHeight: 0,
                }}
                data-testid="avatar"
            >
                <Avatar
                    size={size}
                    src={hideImage ? undefined : src || undefined}
                    initials={hideInitials ? undefined : initials}
                    badge={badgeValue}
                    Icon={Icon}
                    aria-label={ariaLabel}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Avatar';

Default.args = {
    size: 64,
    hideImage: false,
    src: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    hideInitials: false,
    initials: 'PL',
    icon: 'undefined',
    badge: '5',
    inverse: false,
    ariaLabel: 'Avatar',
};
