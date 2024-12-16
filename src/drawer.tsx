// https://www.figma.com/design/NfM16IJ4ffPVEdiFbtU0Lu/%F0%9F%94%B8-Drawer-Specs?node-id=10-5397&t=58YG59t526tkk7dP-1
import * as React from 'react';
import Stack from './stack';
import {Text3, Text4, Text5} from './text';
import {vars} from './skins/skin-contract.css';
import {IconButton} from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';

type DrawerProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    // actions?: React.ReactNode;
    onDismiss?: () => void;
    // overlay?: boolean;
};

const Drawer = ({title, subtitle, description, onDismiss}: DrawerProps): JSX.Element => {
    const handleDismiss = () => {
        onDismiss?.();
    };

    return (
        <div>
            <IconButton
                onPress={handleDismiss}
                Icon={IconCloseRegular}
                aria-label="Close drawer"
                type="neutral"
                backgroundType="transparent"
            ></IconButton>
            <Stack space={16}>
                {title && <Text5>{title}</Text5>}
                {subtitle && <Text4 regular>{subtitle}</Text4>}
                {description && (
                    <Text3 regular color={vars.colors.textSecondary}>
                        {description}
                    </Text3>
                )}
            </Stack>
        </div>
    );
};

export default Drawer;
