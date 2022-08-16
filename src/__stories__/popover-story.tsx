import * as React from 'react';
import {
    Popover,
    useTheme,
    IconMobileDeviceRegular,
    IconShopRegular,
    Circle,
    Placeholder,
    IconButton,
} from '..';

export default {
    title: 'Components/Popover',
    component: Popover,
};

type PopoverArgs = {
    asset: 'icon' | 'image' | 'none';
    position: 'top' | 'right' | 'bottom' | 'left';
    width: number;
    title: string;
    description: string;
    withExtra: boolean;
};

export const Default: StoryComponent<PopoverArgs> = ({
    asset = 'icon',
    position,
    width,
    title,
    description,
    withExtra,
}) => {
    const {colors} = useTheme();

    let icon;
    if (asset === 'icon') {
        icon = (
            <Circle size={40} backgroundColor={colors.brandLow}>
                <IconMobileDeviceRegular color={colors.brand} />
            </Circle>
        );
    } else if (asset === 'image') {
        icon = <Circle size={40} backgroundImage="https://i.imgur.com/QwNlo5s.png" />;
    }

    const [isClosed, setIsClosed] = React.useState(false);
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 56px',
                width: '100%',
            }}
        >
            <Popover
                target={
                    <IconButton onPress={() => setIsClosed(false)}>
                        <IconShopRegular />
                    </IconButton>
                }
                isVisible={!isClosed}
                onClose={() => setIsClosed(true)}
                width={width}
                position={position}
                asset={icon}
                title={title}
                description={description}
                extra={withExtra ? <Placeholder /> : undefined}
            />
        </div>
    );
};

Default.args = {
    position: 'top',
    asset: 'icon',
    title: 'Some title',
    description: 'This is a description for the popover',
    withExtra: false,
    width: 400,
};

Default.argTypes = {
    position: {
        options: ['top', 'right', 'bottom', 'left'],
        control: {type: 'radio'},
    },
    asset: {
        options: ['icon', 'image', 'none'],
        control: {type: 'select'},
    },
    width: {
        control: {type: 'range', min: 200, max: 800},
    },
};

Default.storyName = 'Popover';
