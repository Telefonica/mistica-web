// @flow
import * as React from 'react';
import FixedFooterLayout from './fixed-footer-layout';
import ButtonLayout from './button-layout';
import {useScreenSize} from './hooks';
import {ButtonLink} from './button';

import type {ButtonElement} from './button-layout';

type Props = {
    isFooterVisible?: boolean,
    button: ButtonElement,
    desktopButtonAlign?: 'left' | 'center',
    secondaryButton?: ButtonElement,
    link?: React.Element<typeof ButtonLink>,
    footerBgColor?: string,
    containerBgColor?: string,
    children: React.Node,
};

export const getFooterHeight = (
    link?: React.Element<typeof ButtonLink>,
    secondaryButton?: ButtonElement,
    isMobile: boolean
): number => {
    if (link) {
        return 128;
    }
    if (secondaryButton && isMobile) {
        return 144;
    }
    return 80; // 1 primary button or 2 non-link buttons on desktop or tablet.
};

const ButtonFixedFooterLayout = ({
    isFooterVisible = true,
    button,
    secondaryButton,
    link,
    children,
    desktopButtonAlign = 'left',
    footerBgColor,
    containerBgColor,
}: Props): React.Node => {
    const {isMobile} = useScreenSize();
    return (
        <FixedFooterLayout
            footerHeight={getFooterHeight(link, secondaryButton, isMobile)}
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
