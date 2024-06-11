import * as React from 'react';
import ResponsiveLayout from './responsive-layout';
import Box from './box';
import ButtonGroup from './button-group';
import Stack from './stack';
import {Text3, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import * as styles from './cover-hero.css';
import classnames from 'classnames';
import {applyCssVars} from './utils/css';
import * as mediaStyles from './image.css';
import GridLayout from './grid-layout';
import {CoverHeroMedia} from './cover-hero-media';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';
import type {ImageProps, VideoProps} from './cover-hero-media';
import type {AspectRatio} from './image';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type Tag from './tag';
import type {RendersNullableElement} from './utils/renders-element';
import type {Variant} from './theme-variant-context';

type BaseProps = {
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title: string;
    titleLinesMax?: number;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    sideExtra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    minHeight?: string | number;
    aspectRatio?: AspectRatio | number | 'auto';
    centered?: boolean;
    noPaddingY?: boolean;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

type BackgroundProps = {
    background?: string;
    variant?: Variant;
};

type CoverHeroProps = BaseProps & ExclusifyUnion<ImageProps | VideoProps | BackgroundProps>;

const aspectRatioToCssString = (aspectRatio?: BaseProps['aspectRatio']) => {
    if (!aspectRatio) {
        return 'initial';
    }
    if (typeof aspectRatio === 'number' || aspectRatio === 'auto') {
        return String(aspectRatio);
    }
    return aspectRatio.replace(':', ' / ');
};

const CoverHero = React.forwardRef<HTMLDivElement, CoverHeroProps>(
    (
        {
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            titleAs = 'h1',
            description,
            descriptionLinesMax,
            extra,
            sideExtra,
            button,
            secondaryButton,
            buttonLink,
            minHeight,
            aspectRatio = 'auto',
            variant,
            centered,
            noPaddingY,
            dataAttributes,
            'aria-label': ariaLabel,
            ...mediaProps
        },
        ref
    ) => {
        const hasMedia = mediaProps.backgroundVideo || mediaProps.backgroundImage;

        const background = hasMedia
            ? 'none'
            : mediaProps.background ||
              {
                  default: vars.colors.background,
                  inverse: vars.colors.backgroundBrand,
                  alternative: vars.colors.backgroundAlternative,
              }[variant ?? 'default'];

        const textShadow = hasMedia ? '0 0 15px rgba(0, 0, 0, 0.4)' : undefined;

        const mainContent = (
            <div className={styles.mainContent}>
                {headline && <Box paddingBottom={{desktop: 8, tablet: 8, mobile: 16}}>{headline}</Box>}
                <Stack space={16}>
                    <Stack space={8}>
                        {pretitle && (
                            <div className={styles.sixColumns}>
                                <Text3 regular truncate={pretitleLinesMax} textShadow={textShadow}>
                                    {pretitle}
                                </Text3>
                            </div>
                        )}
                        <Text8 as={titleAs} truncate={titleLinesMax} textShadow={textShadow}>
                            {title}
                        </Text8>
                    </Stack>
                    {description && (
                        <div className={styles.sixColumns}>
                            <Text3
                                as="p"
                                regular
                                truncate={descriptionLinesMax}
                                color={hasMedia ? vars.colors.textPrimary : vars.colors.textSecondary}
                                textShadow={textShadow}
                            >
                                {description}
                            </Text3>
                        </div>
                    )}
                </Stack>
                {extra}
            </div>
        );

        return (
            <section
                {...getPrefixedDataAttributes(dataAttributes, 'CoverHero')}
                aria-label={ariaLabel}
                ref={ref}
                className={classnames(styles.coverHero, {
                    [styles.centered]: centered,
                    [styles.hasSideExtra]: sideExtra,
                    [styles.minHeight]: !noPaddingY,
                })}
                style={{
                    minHeight: aspectRatio && aspectRatio !== 'auto' ? 'auto' : minHeight,
                    boxSizing: 'border-box',
                    background,
                    aspectRatio: aspectRatioToCssString(aspectRatio),
                    ...applyCssVars({
                        [mediaStyles.vars.mediaBorderRadius]: '0px',
                    }),
                }}
            >
                {hasMedia ? <CoverHeroMedia {...mediaProps} /> : null}
                <ResponsiveLayout variant={hasMedia ? 'inverse' : variant} backgroundColor="none">
                    <Box paddingY={noPaddingY ? 0 : {desktop: 56, tablet: 56, mobile: 24}}>
                        <Stack space={24}>
                            {centered && !sideExtra ? (
                                mainContent
                            ) : (
                                <GridLayout
                                    template="8+4"
                                    collapseBreakpoint="mobile"
                                    left={mainContent}
                                    right={<div className={styles.sideExtra}>{sideExtra}</div>}
                                />
                            )}
                            <ButtonGroup
                                align={{
                                    mobile: centered ? 'center' : 'left',
                                    tablet: centered && !sideExtra ? 'center' : 'left',
                                    desktop: centered && !sideExtra ? 'center' : 'left',
                                }}
                                primaryButton={button}
                                secondaryButton={secondaryButton}
                                link={buttonLink}
                            />
                        </Stack>
                    </Box>
                </ResponsiveLayout>
            </section>
        );
    }
);

export default CoverHero;
