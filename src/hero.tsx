'use client';
import * as React from 'react';
import classnames from 'classnames';
import {useScreenSize} from './hooks';
import {Text3, Text8} from './text';
import GridLayout from './grid-layout';
import Box from './box';
import Stack from './stack';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';
import * as styles from './hero.css';
import * as mediaStyles from './image.css';
import {useIsInsideSlideshowContext} from './carousel';
import {getPrefixedDataAttributes} from './utils/dom';
import {sprinkles} from './sprinkles.css';
import {useIsInverseVariant} from './theme-variant-context';
import {applyCssVars} from './utils/css';
import {InternalResponsiveLayout} from './responsive-layout';

import type Image from './image';
import type Video from './video';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type Tag from './tag';
import type {DataAttributes, RendersElement, RendersNullableElement} from './utils/types';

type LayoutProps = {children: React.ReactNode; isInverse: boolean; isInsideSlideShow?: boolean};

const Layout = ({children, isInverse, isInsideSlideShow}: LayoutProps) => {
    return (
        <InternalResponsiveLayout
            isInverse={isInverse}
            className={styles.layout}
            innerDivClassName={styles.layout}
            shouldExpandWhenNested={isInsideSlideShow ? 'desktop' : true}
            backgroundColor="transparent"
        >
            {children}
        </InternalResponsiveLayout>
    );
};

type HeroContentProps = {
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    title?: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const HeroContent = ({
    headline,
    title,
    titleAs = 'h1',
    pretitle,
    description,
    descriptionLinesMax,
    extra,
    button,
    secondaryButton,
    buttonLink,
}: HeroContentProps) => {
    return (
        <section
            className={sprinkles({
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
            })}
        >
            <div>
                <Stack space={16}>
                    {headline && headline}
                    <Stack space={8}>
                        {pretitle && (
                            <Text3 as="p" regular>
                                {pretitle}
                            </Text3>
                        )}
                        {title && <Text8 as={titleAs}>{title}</Text8>}
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
            {(button || buttonLink) && (
                <div className={styles.actions}>
                    <ButtonGroup primaryButton={button} secondaryButton={secondaryButton} link={buttonLink} />
                </div>
            )}
        </section>
    );
};

type HeroProps = {
    height?: string;
    background?: 'default' | 'alternative' | 'brand' | 'brand-secondary' | 'none';
    noPaddingY?: boolean;
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    title?: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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
    'brand-secondary': vars.colors.backgroundBrandSecondary,
    none: 'transparent',
};

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
    (
        {
            height,
            background = 'default',
            media,
            desktopMediaPosition = 'left',
            dataAttributes,
            noPaddingY,
            ...rest
        },
        ref
    ) => {
        const {isTabletOrSmaller} = useScreenSize();
        const isInsideSlideShow = useIsInsideSlideshowContext();
        const isInverseOutside = useIsInverseVariant();
        const isInverse =
            background === 'none'
                ? isInverseOutside
                : background === 'brand' || background === 'brand-secondary';

        if (isTabletOrSmaller) {
            return (
                <div style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}>
                    <div
                        {...getPrefixedDataAttributes({'component-name': 'Hero', ...dataAttributes})}
                        ref={ref}
                        style={{
                            backgroundColor: BACKGROUND_COLOR[background],
                            ...(height === '100vh' ? {maxHeight: '-webkit-fill-available'} : {}), // Hack to avoid issues in Safari with 100vh
                            ...applyCssVars({
                                [styles.vars.height]: height ?? '100%',
                            }),
                        }}
                        className={classnames(styles.container, styles.containerMobile, {
                            [styles.containerMinHeight]: !noPaddingY,
                        })}
                    >
                        <Layout isInverse={isInverse} isInsideSlideShow={isInsideSlideShow}>
                            <div className={styles.mediaContainer}>{media}</div>
                            <Box
                                paddingTop={24}
                                paddingBottom={isInsideSlideShow ? 48 : noPaddingY ? 0 : 24}
                                className={styles.layout}
                            >
                                <HeroContent {...rest} />
                            </Box>
                        </Layout>
                    </div>
                </div>
            );
        }

        const left =
            desktopMediaPosition === 'left' ? (
                media
            ) : (
                <Box paddingRight={24}>
                    <HeroContent {...rest} />
                </Box>
            );

        const right =
            desktopMediaPosition === 'right' ? (
                media
            ) : (
                <Box paddingLeft={24}>
                    <HeroContent {...rest} />
                </Box>
            );

        return (
            <div style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.container})}>
                <div
                    {...getPrefixedDataAttributes({'component-name': 'Hero', ...dataAttributes})}
                    ref={ref}
                    style={{
                        backgroundColor: BACKGROUND_COLOR[background],
                        ...(height === '100vh' ? {maxHeight: '-webkit-fill-available'} : {}), // Hack to avoid issues in Safari with 100vh
                        ...applyCssVars({
                            [styles.vars.height]: height ?? '100%',
                        }),
                    }}
                    className={sprinkles({height: '100%'})}
                >
                    <Layout isInverse={isInverse}>
                        <GridLayout
                            template="6+6"
                            left={
                                <Box
                                    paddingY={noPaddingY ? 0 : 56}
                                    className={classnames(styles.container, styles.containerDesktop, {
                                        [styles.containerMinHeight]: !noPaddingY,
                                    })}
                                >
                                    {left}
                                </Box>
                            }
                            right={
                                <Box
                                    paddingY={noPaddingY ? 0 : 56}
                                    className={classnames(styles.container, styles.containerDesktop)}
                                >
                                    {right}
                                </Box>
                            }
                        />
                    </Layout>
                </div>
            </div>
        );
    }
);

export default Hero;
