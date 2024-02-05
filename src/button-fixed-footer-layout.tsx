'use client';
import * as React from 'react';
import FixedFooterLayout from './fixed-footer-layout';
import ButtonLayout from './button-layout';
import {useScreenSize} from './hooks';
import {InternalResponsiveLayout} from './responsive-layout';
import Box from './box';

import type {ButtonLink, NullableButtonElement} from './button';
import type {RendersNullableElement} from './utils/types';

type Props = {
    isFooterVisible?: boolean;
    button?: NullableButtonElement;
    /** @deprecated */
    desktopButtonAlign?: 'left' | 'center';
    secondaryButton?: NullableButtonElement;
    link?: RendersNullableElement<typeof ButtonLink>;
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
    desktopButtonAlign,
    footerBgColor,
    containerBgColor,
    onChangeFooterHeight,
}) => {
    const {isDesktopOrBigger} = useScreenSize();
    const hasButton = !!button || !!secondaryButton;
    return (
        <FixedFooterLayout
            onChangeFooterHeight={onChangeFooterHeight}
            isFooterVisible={hasButton && isFooterVisible}
            footerBgColor={footerBgColor}
            containerBgColor={containerBgColor}
            footer={
                <InternalResponsiveLayout shouldExpandWhenNested="desktop">
                    <Box
                        paddingY={{
                            mobile: 16,
                            tablet: 32,
                            desktop: 0,
                        }}
                    >
                        <ButtonLayout
                            align={
                                isDesktopOrBigger && desktopButtonAlign ? desktopButtonAlign : 'full-width'
                            }
                            link={link}
                        >
                            {button}
                            {secondaryButton}
                        </ButtonLayout>
                    </Box>
                </InternalResponsiveLayout>
            }
        >
            {children}
        </FixedFooterLayout>
    );
};

export default ButtonFixedFooterLayout;
