'use client';
import * as React from 'react';
import classnames from 'classnames';
import {useScreenSize} from './hooks';
import {Text3, Text8} from './text';
import GridLayout from './grid-layout';
import Box from './box';
import Stack from './stack';
import ButtonGroup from './button-group';
import {vars as skinVars} from './skins/skin-contract.css';
import * as styles from './hero.css';
import * as mediaStyles from './image.css';
import {useSlideshowContext} from './carousel';
import {getPrefixedDataAttributes} from './utils/dom';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {applyCssVars} from './utils/css';
import {InternalResponsiveLayout, ResetResponsiveLayout} from './responsive-layout';
import {
    type DataAttributes,
    type HeadingType,
    type RendersElement,
    type RendersNullableElement,
} from './utils/types';
import {isBiggerHeading} from './utils/headings';

import type Image from './image';
import type Video from './video';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type Tag from './tag';

const CONTENT_BACKGROUND_COLOR = {
    default: skinVars.colors.background,
    alternative: skinVars.colors.backgroundAlternative,
    brand: skinVars.colors.backgroundBrand,
    'brand-secondary': skinVars.colors.backgroundBrandSecondary,
    none: 'transparent',
};

type LayoutProps = {children: React.ReactNode; isInverse: boolean; backgroundColor?: string};

const Layout = ({children, isInverse, backgroundColor}: LayoutProps) => {
    return (
        <InternalResponsiveLayout
            isInverse={isInverse}
            className={styles.layout}
            innerDivClassName={styles.layout}
            shouldExpandWhenNested
            backgroundColor={backgroundColor ?? 'transparent'}
        >
            {children}
        </InternalResponsiveLayout>
    );
};

type HeroContentProps = {
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: HeadingType;
    title?: string;
    titleAs?: HeadingType;
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
    pretitleAs,
    description,
    descriptionLinesMax,
    extra,
    button,
    secondaryButton,
    buttonLink,
}: HeroContentProps) => {
    const titleContent = title ? (
        <Text8 as={titleAs} dataAttributes={{testid: 'title'}}>
            {title}
        </Text8>
    ) : undefined;

    const pretitleContent = pretitle ? (
        <Text3 as={pretitleAs} regular dataAttributes={{testid: 'pretitle'}}>
            {pretitle}
        </Text3>
    ) : undefined;

    const headlineContent = headline ? (
        <div
            data-testid="headline"
            style={{paddingBottom: pretitle || title || description ? 16 : 0, order: -1}}
        >
            {headline}
        </div>
    ) : undefined;

    return (
        <section className={styles.contentContainer}>
            <div>
                <Stack space={16}>
                    {/** using flex instead of nested Stacks, this way we can rearrange texts so the DOM structure makes more sense for screen reader users */}
                    <div className={styles.flexColumn}>
                        {isBiggerHeading(titleAs, pretitleAs) ? (
                            <>
                                {titleContent}
                                {headlineContent}
                                {pretitleContent && (
                                    <div style={{paddingBottom: title ? 8 : 0, order: -1}}>
                                        {pretitleContent}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {pretitleContent && (
                                    <div style={{paddingBottom: title ? 8 : 0}}>{pretitleContent}</div>
                                )}
                                {headlineContent}
                                {titleContent}
                            </>
                        )}
                    </div>

                    {description && (
                        <Text3
                            as="p"
                            regular
                            color={skinVars.colors.textSecondary}
                            truncate={descriptionLinesMax}
                            dataAttributes={{testid: 'description'}}
                        >
                            {description}
                        </Text3>
                    )}
                </Stack>
                {extra && <div data-testid="slot">{extra}</div>}
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
    height?: string | number;
    background?: 'default' | 'alternative' | 'brand' | 'brand-secondary' | 'none';
    noPaddingY?: boolean;
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: HeadingType;
    title?: string;
    titleAs?: HeadingType;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    desktopMediaPosition?: 'left' | 'right';
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
        const slideshowContext = useSlideshowContext();
        const hasSlideshowBullets = !!slideshowContext?.withBullets;
        const isInverseOutside = useIsInverseOrMediaVariant();
        const isInverse =
            background === 'none'
                ? isInverseOutside
                : background === 'brand' || background === 'brand-secondary';

        if (isTabletOrSmaller) {
            return (
                <ResetResponsiveLayout>
                    <div style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}>
                        <div
                            {...getPrefixedDataAttributes(dataAttributes, 'Hero')}
                            ref={ref}
                            style={{
                                ...(height === '100vh' ? {maxHeight: '-webkit-fill-available'} : {}), // Hack to avoid issues in Safari with 100vh
                                ...applyCssVars({
                                    [styles.vars.height]:
                                        typeof height === 'number' ? `${height}px` : height ?? '100%',
                                    [mediaStyles.vars.mediaBorderRadius]: '0px',
                                }),
                            }}
                            className={classnames(styles.container, styles.containerMobile, {
                                [styles.containerMinHeight]: !noPaddingY,
                            })}
                        >
                            {media}

                            <Layout
                                isInverse={isInverse}
                                backgroundColor={CONTENT_BACKGROUND_COLOR[background]}
                            >
                                <div className={styles.expandedContent}>
                                    <div
                                        style={{
                                            paddingTop: 24,
                                            paddingBottom: hasSlideshowBullets ? 48 : noPaddingY ? 0 : 24,
                                        }}
                                        className={styles.layout}
                                    >
                                        <HeroContent {...rest} />
                                    </div>
                                </div>
                            </Layout>
                        </div>
                    </div>
                </ResetResponsiveLayout>
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
            <div
                {...getPrefixedDataAttributes(dataAttributes, 'Hero')}
                ref={ref}
                style={{
                    ...(height === '100vh' ? {maxHeight: '-webkit-fill-available'} : {}), // Hack to avoid issues in Safari with 100vh
                    ...applyCssVars({
                        [styles.vars.height]: typeof height === 'number' ? `${height}px` : height ?? '100%',
                        [mediaStyles.vars.mediaBorderRadius]: skinVars.borderRadii.container,
                    }),
                    background: CONTENT_BACKGROUND_COLOR[background],
                }}
                className={styles.hero}
            >
                <Layout isInverse={isInverse}>
                    <GridLayout
                        template="6+6"
                        left={
                            <div
                                style={{
                                    paddingTop: noPaddingY ? 0 : 56,
                                    paddingBottom: noPaddingY && !hasSlideshowBullets ? 0 : 56,
                                }}
                                className={classnames(styles.container, styles.containerDesktop, {
                                    [styles.containerMinHeight]: !noPaddingY,
                                })}
                            >
                                {left}
                            </div>
                        }
                        right={
                            <div
                                style={{
                                    paddingTop: noPaddingY ? 0 : 56,
                                    paddingBottom: noPaddingY && !hasSlideshowBullets ? 0 : 56,
                                }}
                                className={classnames(styles.container, styles.containerDesktop)}
                            >
                                {right}
                            </div>
                        }
                    />
                </Layout>
            </div>
        );
    }
);

export default Hero;
