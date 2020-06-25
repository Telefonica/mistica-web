import * as React from 'react';
import FixedFooterLayout from './fixed-footer-layout';
import ButtonLayout from './button-layout';
import {useScreenSize} from './hooks';
import {ButtonLink} from './button';

import type {ButtonElement} from './button';

type Props = {
    isFooterVisible?: boolean;
    button: ButtonElement;
    desktopButtonAlign?: 'left' | 'center';
    secondaryButton?: ButtonElement;
    link?: React.ReactElement<typeof ButtonLink>;
    footerBgColor?: string;
    containerBgColor?: string;
    children: React.ReactNode;
};

export const getFooterHeight = (
    isMobile: boolean,
    link?: React.ReactElement<typeof ButtonLink>,
    secondaryButton?: ButtonElement
): number => {
    if (link) {
        return 128;
    }
    if (secondaryButton && isMobile) {
        return 144;
    }
    return 80; // 1 primary button or 2 non-link buttons on desktop or tablet.
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
}) => {
    const {isMobile} = useScreenSize();
    return (
        <FixedFooterLayout
            footerHeight={getFooterHeight(isMobile, link, secondaryButton)}
            isFooterVisible={!!button && isFooterVisible}
            footerBgColor={footerBgColor}
            containerBgColor={containerBgColor}
            footer={
                <ButtonLayout withMargins align={isMobile ? 'full-width' : desktopButtonAlign} link={link}>
                    {button}
                    {secondaryButton}
                </ButtonLayout>
            }
        >
            {children}
        </FixedFooterLayout>
    );
};

export default ButtonFixedFooterLayout;
