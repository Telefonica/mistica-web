import * as React from 'react';
import FixedFooterLayout from './fixed-footer-layout';
import ButtonLayout from './button-layout';
import {useScreenSize} from './hooks';
import {ButtonLink} from './button';

import type {ButtonElement} from './button';

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
    const {isMobile} = useScreenSize();
    const hasButton = !!button || !!secondaryButton || !!link;
    return (
        <FixedFooterLayout
            onChangeFooterHeight={onChangeFooterHeight}
            isFooterVisible={hasButton && isFooterVisible}
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
