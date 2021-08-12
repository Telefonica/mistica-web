import * as React from 'react';
import FixedFooterLayout from './fixed-footer-layout';
import ButtonLayout from './button-layout';
import {useScreenSize} from './hooks';
import {ButtonLink} from './button';
import ResponsiveLayout from './responsive-layout';

import type {ButtonElement} from './button';
import Box from './box';

type Props = {
    isFooterVisible?: boolean;
    button?: ButtonElement;
    desktopButtonAlign?: 'left' | 'center';
    secondaryButton?: ButtonElement;
    link?: React.ReactElement<typeof ButtonLink>;
    footerBgColor?: string;
    containerBgColor?: string;
    children: React.ReactNode;
    onChangeFooterHeight?: (heightInPx: number) => void;
};

const ButtonFixedFooterLayout: React.FC<Props> = ({
    isFooterVisible = true,
    button,
    secondaryButton,
    link,
    children,
    desktopButtonAlign = 'left',
    footerBgColor,
    containerBgColor,
    onChangeFooterHeight,
}) => {
    const {isTabletOrSmaller, isTablet} = useScreenSize();
    const hasButton = !!button || !!secondaryButton;
    return (
        <FixedFooterLayout
            onChangeFooterHeight={onChangeFooterHeight}
            isFooterVisible={hasButton && isFooterVisible}
            footerBgColor={footerBgColor}
            containerBgColor={containerBgColor}
            footer={
                <ResponsiveLayout>
                    <Box paddingY={isTablet ? 32 : isTabletOrSmaller ? 16 : 0}>
                        <ButtonLayout
                            align={isTabletOrSmaller ? 'full-width' : desktopButtonAlign}
                            link={link}
                        >
                            {button}
                            {secondaryButton}
                        </ButtonLayout>
                    </Box>
                </ResponsiveLayout>
            }
        >
            {children}
        </FixedFooterLayout>
    );
};

export default ButtonFixedFooterLayout;
