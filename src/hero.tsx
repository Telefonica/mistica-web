import * as React from 'react';
import classnames from 'classnames';
import Tag from './tag';
import {ButtonLink, ButtonPrimary} from './button';
import {useScreenSize} from './hooks';
import Video from './video';
import Image from './image';
import {Text3, Text8} from './text';
import GridLayout from './grid-layout';
import ResponsiveLayout from './responsive-layout';
import Box from './box';
import Stack from './stack';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';
import * as styles from './hero.css';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {useIsInsideSlideshowContext} from './carousel';

import type {DataAttributes, RendersElement, RendersNullableElement} from './utils/types';

type HeroContentProps = {
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    title?: string;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const HeroContent = ({
    headline,
    title,
    pretitle,
    description,
    descriptionLinesMax,
    extra,
    button,
    buttonLink,
}: HeroContentProps) => {
    return (
        <section>
            <Stack space={24}>
                <div>
                    <Stack space={16}>
                        {headline && headline}
                        <Stack space={8}>
                            {pretitle && (
                                <Text3 as="p" regular>
                                    {pretitle}
                                </Text3>
                            )}
                            {title && <Text8 as="h1">{title}</Text8>}
                        </Stack>
                        {description && (
                            <Text3
                                as="p"
                                regular
                                color={vars.colors.textSecondary}
                                truncate={descriptionLinesMax}
                            >
                                {description}
                            </Text3>
                        )}
                    </Stack>
                    {extra && <div>{extra}</div>}
                </div>
                {(button || buttonLink) && <ButtonGroup primaryButton={button} link={buttonLink} />}
            </Stack>
        </section>
    );
};

type HeroProps = {
    height?: string;
    background?: 'default' | 'alternative' | 'brand' | 'brand-secondary';
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    title?: string;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    desktopMediaPosition?: 'left' | 'right';
};

const BACKGROUND_COLOR = {
    default: vars.colors.background,
    alternative: vars.colors.backgroundAlternative,
    brand: vars.colors.backgroundBrand,
    'brand-secondary': vars.colors.backgroundBrand, // TODO backgroundBrandAlternative does not exists yet
};

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
    (
        {height, background = 'default', media, desktopMediaPosition = 'left', dataAttributes, ...rest},
        ref
    ) => {
        const {isTabletOrSmaller} = useScreenSize();
        const isInsideSlideShow = useIsInsideSlideshowContext();
        const isInverse = background === 'brand' || background === 'brand-secondary';

        if (isTabletOrSmaller) {
            return (
                <div
                    ref={ref}
                    style={{
                        backgroundColor: BACKGROUND_COLOR[background],
                        ...assignInlineVars({
                            [styles.vars.height]: height ?? '',
                        }),
                    }}
                    className={classnames(styles.container, styles.containerMobile)}
                >
                    {media}
                    <ResponsiveLayout
                        isInverse={isInverse}
                        dataAttributes={{'component-name': 'Hero', ...dataAttributes}}
                    >
                        <Box paddingTop={24} paddingBottom={isInsideSlideShow ? 48 : 24}>
                            <HeroContent {...rest} />
                        </Box>
                    </ResponsiveLayout>
                </div>
            );
        }

        const left =
            desktopMediaPosition === 'left' ? (
                media
            ) : (
                <Box paddingX={24}>
                    <HeroContent {...rest} />
                </Box>
            );

        const right =
            desktopMediaPosition === 'right' ? (
                media
            ) : (
                <Box paddingX={24}>
                    <HeroContent {...rest} />
                </Box>
            );

        return (
            <div
                ref={ref}
                style={{
                    backgroundColor: BACKGROUND_COLOR[background],
                    ...assignInlineVars({
                        [styles.vars.height]: height ?? '',
                    }),
                }}
            >
                <ResponsiveLayout
                    isInverse={isInverse}
                    dataAttributes={{'component-name': 'Hero', ...dataAttributes}}
                >
                    <GridLayout
                        template="6+6"
                        left={
                            <Box
                                paddingY={isInsideSlideShow ? 80 : 56}
                                className={classnames(styles.container, styles.containerDesktop)}
                            >
                                {left}
                            </Box>
                        }
                        right={
                            <Box
                                paddingY={isInsideSlideShow ? 80 : 56}
                                className={classnames(styles.container, styles.containerDesktop)}
                            >
                                {right}
                            </Box>
                        }
                    />
                </ResponsiveLayout>
            </div>
        );
    }
);

export default Hero;
