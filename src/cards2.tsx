'use client';
import * as React from 'react';
import * as styles from './cards2.css';
import {Text} from './text';
import {useInnerText, useTheme} from './hooks';
import {useThemeVariant} from './theme-variant-context';
import Tag from './tag';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {Boxed} from './boxed';
import {BaseTouchable, type PressHandler} from './touchable';
import {aspectRatioToNumber} from './utils/aspect-ratio-support';
import classnames from 'classnames';
import {vars as skinVars} from './skins/skin-contract.css';
import Stack from './stack';
import Inline from './inline';

import type {DataAttributes, HeadingType, RendersNullableElement, TrackingEvent} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';

export type AspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto' | number;

type CardType = 'snap' | 'default' | 'display';
type ActionButton =
    | RendersNullableElement<typeof ButtonPrimary>
    | RendersNullableElement<typeof ButtonSecondary>
    | RendersNullableElement<typeof ButtonLink>
    | undefined;

export type SlotAlignment = 'content' | 'bottom';

type ContainerProps = {
    type: CardType;
    width?: string | number;
    height?: string | number;
    aspectRatio?: AspectRatio;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    isInverse?: boolean;
};

type TextContentProps = {
    type: CardType;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: HeadingType;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: HeadingType;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
};

type AssetProps = {
    type: CardType;
    asset?: React.ReactElement;
};

type TouchableProps = {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    role?: string;
    'aria-current'?: React.AriaAttributes['aria-current'];
} & ExclusifyUnion<
    | {
          href: string | undefined;
          newTab?: boolean;
          loadOnTop?: boolean;
          onNavigate?: () => void | Promise<void>;
      }
    | {
          to: string | undefined;
          newTab?: boolean;
          fullPageOnWebView?: boolean;
          replace?: boolean;
          onNavigate?: () => void | Promise<void>;
      }
    | {onPress: PressHandler | undefined}
>;

type SlotProps = {
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
};

type CardProps = ContainerProps &
    TextContentProps &
    AssetProps &
    TouchableProps &
    ActionsProps &
    SlotProps &
    FooterProps;

type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps & TouchableProps>(
    (
        {
            children,
            type,
            width,
            height,
            aspectRatio,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            'aria-description': ariaDescription,
            'aria-describedby': ariaDescribedby,
            dataAttributes,
            isInverse,
            ...touchableProps
        },
        ref
    ): JSX.Element => {
        const aspectRatioValue = width && height ? undefined : aspectRatioToNumber(aspectRatio);
        const aspectRatioStyle = aspectRatioValue
            ? applyCssVars({[styles.vars.aspectRatio]: String(aspectRatioValue)})
            : {};

        return (
            // aria-description should be vaild, but this eslint rule is complaining about it
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props
            <section
                ref={ref}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-description={ariaDescription}
                aria-describedby={ariaDescribedby}
                className={classnames(styles.container, styles.touchableContainer)}
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    width: width || '100%',
                    height: height || '100%',
                    ...aspectRatioStyle,
                }}
            >
                <BaseTouchable maybe className={styles.touchable} {...touchableProps}>
                    <Boxed
                        // Without setting the width here, the component fails to get the correct width in some cases
                        // even if we set the 100% width style in the boxed class
                        width="100%"
                        height="100%"
                        variant={isInverse ? 'inverse' : 'default'}
                        className={classnames(styles.boxed)}
                    >
                        {children}
                    </Boxed>
                </BaseTouchable>
            </section>
        );
    }
);

const Asset = ({type, asset}: AssetProps): JSX.Element | null => {
    if (!asset) {
        return null;
    }

    // Content-Follows Spacing (mode C according to specs)
    if (type === 'snap' || type === 'default') {
        return (
            <div data-testid="asset" style={{paddingBottom: 16}}>
                {asset}
            </div>
        );
    }

    return null;
};

type FooterProps = {
    type: CardType;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
};

const Footer = ({
    showFooter,
    footerSlot,
    primaryAction,
    secondaryAction,
}: FooterProps & ActionsProps): JSX.Element => {
    if (!showFooter || (!footerSlot && !primaryAction && !secondaryAction)) {
        return <></>;
    }
    return (
        <div
            data-testid="footer"
            style={{
                padding: 16,
                borderTop: `1px solid ${skinVars.colors.border}`,
            }}
        >
            <Stack space={16}>
                {footerSlot}
                {primaryAction ||
                    (secondaryAction && (
                        <Inline space="between" alignItems="center">
                            {primaryAction}
                            {secondaryAction}
                        </Inline>
                    ))}
            </Stack>
        </div>
    );
};

type ActionsProps = {
    type: CardType;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
};

const Actions = ({type, primaryAction, secondaryAction}: ActionsProps): JSX.Element => {
    return (
        <div
            style={{
                paddingTop: type === 'display' ? 24 : 16,
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
            }}
        >
            {primaryAction}
            {secondaryAction}
        </div>
    );
};

const TextContent = ({
    type: size,
    headline,
    title,
    titleAs = 'h3',
    titleLinesMax,
    pretitle,
    pretitleAs,
    pretitleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
}: TextContentProps): JSX.Element => {
    const {textPresets, colorValues} = useTheme();
    const themeVariant = useThemeVariant();

    const commonProps = {
        hyphens: 'auto',
    } as const;

    const colorVariants = {
        default: {
            pretitle: colorValues.textPrimary,
            title: colorValues.textPrimary,
            subtitle: colorValues.textPrimary,
            description: colorValues.textSecondary,
        },
        inverse: {
            pretitle: colorValues.textPrimaryInverse,
            title: colorValues.textPrimaryInverse,
            subtitle: colorValues.textPrimaryInverse,
            description: colorValues.textSecondaryInverse,
        },
        media: {
            pretitle: colorValues.textPrimaryInverse,
            title: colorValues.textPrimaryInverse,
            subtitle: colorValues.textPrimaryInverse,
            description: colorValues.textSecondaryInverse,
        },
    } as const;

    const textVariants = {
        snap: {
            pretitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            title: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: textPresets.cardTitle.weight,
            },
            subtitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            description: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
        },
        default: {
            pretitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            title: {
                mobileSize: textPresets.text4.size.mobile,
                desktopSize: textPresets.text4.size.desktop,
                mobileLineHeight: textPresets.text4.lineHeight.mobile,
                desktopLineHeight: textPresets.text4.lineHeight.desktop,
                weight: textPresets.cardTitle.weight,
            },
            subtitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            description: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
        },
        display: {
            pretitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            title: {
                mobileSize: textPresets.text6.size.mobile,
                desktopSize: textPresets.text6.size.desktop,
                mobileLineHeight: textPresets.text6.lineHeight.mobile,
                desktopLineHeight: textPresets.text6.lineHeight.desktop,
                weight: textPresets.text6.weight,
            },
            subtitle: {
                mobileSize: textPresets.text2.size.mobile,
                desktopSize: textPresets.text2.size.desktop,
                mobileLineHeight: textPresets.text2.lineHeight.mobile,
                desktopLineHeight: textPresets.text2.lineHeight.desktop,
                weight: 'regular',
            },
            description: {
                mobileSize: textPresets.text3.size.mobile,
                desktopSize: textPresets.text3.size.desktop,
                mobileLineHeight: textPresets.text3.lineHeight.mobile,
                desktopLineHeight: textPresets.text3.lineHeight.desktop,
                weight: 'regular',
            },
        },
    } as const;

    const colors = colorVariants[themeVariant as keyof typeof colorVariants] || colorVariants.default;
    const textVariant = textVariants[size] || textVariants.default;

    return (
        <div>
            {headline && (
                <div style={{paddingBottom: size === 'display' ? 16 : 8}} data-testid="headline">
                    {typeof headline === 'string' ? <Tag type="promo">{headline}</Tag> : headline}
                </div>
            )}
            {pretitle && (
                <div style={{paddingBottom: 4}} data-testid="pretitle">
                    <Text
                        {...commonProps}
                        {...textVariant.pretitle}
                        as={pretitleAs || 'p'}
                        truncate={pretitleLinesMax}
                        color={colors.pretitle}
                    >
                        {pretitle}
                    </Text>
                </div>
            )}
            {title && (
                <div style={{paddingBottom: 4}} data-testid="title">
                    <Text
                        {...commonProps}
                        {...textVariant.title}
                        as={titleAs}
                        truncate={titleLinesMax}
                        color={colors.title}
                    >
                        {title}
                    </Text>
                </div>
            )}
            {subtitle && (
                <div style={{paddingBottom: 0}} data-testid="subtitle">
                    <Text
                        {...commonProps}
                        {...textVariant.subtitle}
                        as="p"
                        truncate={subtitleLinesMax}
                        color={colors.subtitle}
                    >
                        {subtitle}
                    </Text>
                </div>
            )}
            {description && (
                <div style={{paddingTop: 4}} data-testid="description">
                    <Text
                        {...commonProps}
                        {...textVariant.description}
                        as="p"
                        truncate={descriptionLinesMax}
                        color={colors.description}
                    >
                        {description}
                    </Text>
                </div>
            )}
        </div>
    );
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            type,
            asset,
            headline,
            title,
            titleAs = 'h3',
            titleLinesMax,
            pretitle,
            pretitleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            dataAttributes,
            isInverse,
            width,
            height,
            aspectRatio,
            slot,
            slotAlignment = 'content',
            primaryAction,
            secondaryAction,
            showFooter,
            footerSlot,
            ...touchableProps
        },
        ref
    ): JSX.Element => {
        const {text: slotText, ref: slotRef} = useInnerText();
        const hasActions = !!(primaryAction || secondaryAction);
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const overlayStyle = isInverse ? styles.touchableCardOverlayInverse : styles.touchableCardOverlay;
        const shouldShowFooter = showFooter && (hasActions || !!footerSlot);
        const showActionsInBody = !shouldShowFooter && hasActions;

        console.log('TODO A11Y', {slotText, slotAlignment});

        return (
            <>
                <Container
                    type={type}
                    dataAttributes={dataAttributes}
                    ref={ref}
                    isInverse={isInverse}
                    width={width}
                    height={height}
                    aspectRatio={aspectRatio}
                    {...touchableProps}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {/* this div shouldn't be needed if we don't use Boxed here, which causes several issues (see container) */}

                        <div
                            data-testid="body"
                            className={styles.containerPaddingsVariants[type]}
                            // with a footer, the bottom padding for the body is always 16px
                            style={{
                                paddingBottom: shouldShowFooter ? 16 : undefined,

                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            {isTouchable && <div className={overlayStyle} />}

                            <Asset type={type} asset={asset} />
                            <TextContent
                                type={type}
                                headline={headline}
                                pretitle={pretitle}
                                pretitleLinesMax={pretitleLinesMax}
                                title={title}
                                titleAs={titleAs}
                                titleLinesMax={titleLinesMax}
                                subtitle={subtitle}
                                subtitleLinesMax={subtitleLinesMax}
                                description={description}
                                descriptionLinesMax={descriptionLinesMax}
                            />
                            {slotAlignment === 'bottom' && <div style={{flexGrow: 1, background: '#eee'}} />}
                            {slot && (
                                <div ref={slotRef} data-testid="slot">
                                    {slot}
                                </div>
                            )}
                            {showActionsInBody && (
                                <Actions
                                    type={type}
                                    primaryAction={primaryAction}
                                    secondaryAction={secondaryAction}
                                />
                            )}
                        </div>
                        {shouldShowFooter && <div style={{flexGrow: 1, background: '#eee'}} />}
                        {shouldShowFooter && (
                            <Footer
                                type={type}
                                showFooter={showFooter}
                                footerSlot={footerSlot}
                                primaryAction={primaryAction}
                                secondaryAction={secondaryAction}
                            />
                        )}
                    </div>
                </Container>
            </>
        );
    }
);

type DataCardProps = {
    type: CardType;
    asset?: React.ReactElement;
    title?: string;
    titleAs?: HeadingType;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    extraAlignment?: SlotAlignment;
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slot?: React.ReactNode;
    isInverse?: boolean;
    aspectRatio?: AspectRatio;
    children?: undefined;
    /** @deprecated use primaryAction */
    button?: ActionButton;
    /** @deprecated use secondaryAction */
    buttonLink?: ActionButton;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
};

export const DataCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<DataCardProps>>(
    (
        {
            dataAttributes,
            type = 'default',
            button,
            primaryAction,
            buttonLink,
            secondaryAction,
            extra,
            slot,
            ...rest
        },
        ref
    ) => {
        return (
            <Card
                type={type}
                dataAttributes={{
                    'component-name': 'DataCard',
                    testid: 'DataCard',
                    ...dataAttributes,
                }}
                ref={ref}
                primaryAction={primaryAction || button}
                secondaryAction={secondaryAction || buttonLink}
                slot={slot || extra}
                {...rest}
            />
        );
    }
);

type SnapCardProps = Omit<DataCardProps, 'type'>;

/**
 * @deprecated use <Datacard type="snap" /> instead
 */
export const SnapCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<SnapCardProps>>(
    ({dataAttributes, ...rest}, ref) => {
        return (
            <DataCard
                type="snap"
                dataAttributes={{
                    'component-name': 'SnapCard',
                    testid: 'SnapCard',
                    ...dataAttributes,
                }}
                ref={ref}
                {...rest}
            />
        );
    }
);
