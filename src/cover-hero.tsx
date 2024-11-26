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
import {isBiggerHeading} from './utils/headings';

import type {DataAttributes, HeadingType} from './utils/types';
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
    pretitleAs?: HeadingType;
    title: string;
    titleLinesMax?: number;
    titleAs?: HeadingType;
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

const aspectRatioToNumber = (aspectRatio?: BaseProps['aspectRatio']): number => {
    if (!aspectRatio || aspectRatio === 'auto') {
        return 0;
    }
    if (typeof aspectRatio === 'number') {
        return aspectRatio;
    }
    return {
        '1:1': 1,
        '16:9': 16 / 9,
        '7:10': 7 / 10,
        '4:3': 9 / 10,
    }[aspectRatio];
};

const CoverHero = React.forwardRef<HTMLDivElement, CoverHeroProps>(
    (
        {
            headline,
            pretitle,
            pretitleLinesMax,
            pretitleAs,
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
                  media: 'none',
              }[variant ?? 'default'];

        const textShadow = hasMedia ? '0 0 15px rgba(0, 0, 0, 0.4)' : undefined;

        const pretitleContent = pretitle ? (
            <Text3
                regular
                as={pretitleAs}
                truncate={pretitleLinesMax}
                textShadow={textShadow}
                dataAttributes={{testid: 'pretitle'}}
            >
                {pretitle}
            </Text3>
        ) : undefined;

        const titleContent = title ? (
            <Text8
                as={titleAs}
                truncate={titleLinesMax}
                textShadow={textShadow}
                dataAttributes={{testid: 'title'}}
            >
                {title}
            </Text8>
        ) : undefined;

        const headlineContent = headline ? (
            <div style={{order: -1}}>
                <Box
                    dataAttributes={{testid: 'headline'}}
                    paddingBottom={{desktop: 8, tablet: 8, mobile: 16}}
                >
                    {headline}
                </Box>
            </div>
        ) : undefined;

        const mainContent = (
            <div className={styles.mainContent}>
                <Stack space={16}>
                    {/** using flex instead of nested Stacks, this way we can rearrange texts so the DOM structure makes more sense for screen reader users */}
                    <div className={styles.flexColumn}>
                        {isBiggerHeading(titleAs, pretitleAs) ? (
                            <>
                                {titleContent}
                                {headlineContent}
                                {pretitleContent && (
                                    <div
                                        className={styles.sixColumns}
                                        style={{paddingBottom: title ? 8 : 0, order: -1}}
                                    >
                                        {pretitleContent}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {pretitleContent && (
                                    <div className={styles.sixColumns} style={{paddingBottom: title ? 8 : 0}}>
                                        {pretitleContent}
                                    </div>
                                )}
                                {headlineContent}
                                {titleContent}
                            </>
                        )}
                    </div>
                    {description && (
                        <div className={styles.sixColumns}>
                            <Text3
                                as="p"
                                regular
                                truncate={descriptionLinesMax}
                                color={hasMedia ? vars.colors.textPrimary : vars.colors.textSecondary}
                                textShadow={textShadow}
                                dataAttributes={{testid: 'description'}}
                            >
                                {description}
                            </Text3>
                        </div>
                    )}
                </Stack>
                {extra && <div data-testid="slot">{extra}</div>}
            </div>
        );

        const withAspectRatio = aspectRatio && aspectRatio !== 'auto';

        return (
            <section
                {...getPrefixedDataAttributes(dataAttributes, 'CoverHero')}
                aria-label={ariaLabel}
                ref={ref}
                className={classnames(styles.coverHeroContainer, {
                    [styles.minHeight]: !noPaddingY,
                    [styles.withAspectRatio]: withAspectRatio,
                })}
                style={{
                    minHeight: withAspectRatio ? 'auto' : minHeight,
                    boxSizing: 'border-box',
                    background,
                    ...applyCssVars({
                        [styles.vars.aspectRatio]: String(aspectRatioToNumber(aspectRatio)),
                        [mediaStyles.vars.mediaBorderRadius]: '0px',
                    }),
                }}
            >
                <div
                    className={classnames(styles.coverHero, {
                        [styles.centered]: centered,
                        [styles.hasSideExtra]: sideExtra,
                    })}
                >
                    {hasMedia ? <CoverHeroMedia {...mediaProps} /> : null}
                    <ResponsiveLayout variant={hasMedia ? 'media' : variant}>
                        <Box paddingY={noPaddingY ? 0 : {desktop: 56, tablet: 56, mobile: 24}}>
                            <Stack space={24}>
                                {centered && !sideExtra ? (
                                    <GridLayout template="8">{mainContent}</GridLayout>
                                ) : (
                                    <GridLayout
                                        template="8+4"
                                        collapseBreakpoint="mobile"
                                        left={mainContent}
                                        right={
                                            <div className={styles.sideExtra} data-testid="sideSlot">
                                                {sideExtra}
                                            </div>
                                        }
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
                </div>
            </section>
        );
    }
);

export default CoverHero;
