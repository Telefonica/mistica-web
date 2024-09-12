import * as React from 'react';
import FixedFooterLayout from './fixed-footer-layout';
import ButtonLayout from './button-layout';
import {InternalResponsiveLayout} from './responsive-layout';
import Box from './box';

import type {ButtonLink, NullableButtonElement} from './button';
import type {RendersNullableElement} from './utils/types';

type Props = {
    isFooterVisible?: boolean;
    button?: NullableButtonElement;
    secondaryButton?: NullableButtonElement;
    link?: RendersNullableElement<typeof ButtonLink>;
    footerBgColor?: string;
    containerBgColor?: string;
    children: React.ReactNode;
    onChangeFooterHeight?: (heightInPx: number) => void;
};

const ButtonFixedFooterLayout = ({
    isFooterVisible = true,
    button,
    secondaryButton,
    link,
    children,
    footerBgColor,
    containerBgColor,
    onChangeFooterHeight,
}: Props): JSX.Element => {
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
                            primaryButton={button}
                            secondaryButton={secondaryButton}
                            align="full-width"
                            link={link}
                        />
                    </Box>
                </InternalResponsiveLayout>
            }
        >
            {children}
        </FixedFooterLayout>
    );
};

export default ButtonFixedFooterLayout;
