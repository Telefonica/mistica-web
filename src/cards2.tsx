// spec: https://www.figma.com/design/tKdPOfcUALzVIh5oizFbm7
'use client';
import * as React from 'react';
import * as styles from './cards2.css';
import {Text} from './text';
import {useInnerText, useTheme} from './hooks';
import {
    ThemeVariant,
    useIsInverseOrMediaVariant,
    useIsInverseVariant,
    useThemeVariant,
} from './theme-variant-context';
import Tag from './tag';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {InternalBoxed} from './boxed';
import {BaseTouchable, type PressHandler} from './touchable';
import {aspectRatioToNumber} from './utils/aspect-ratio-support';
import classnames from 'classnames';
import {vars as skinVars} from './skins/skin-contract.css';
import Stack from './stack';
import Inline from './inline';
import {IconButton, ToggleIconButton} from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import Image from './image';
import * as tokens from './text-tokens';

import type {
    DataAttributes,
    HeadingType,
    IconProps,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {Variant} from './theme-variant-context';
import type {VideoElement, VideoSource} from './video';

export type AspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto' | number;

const DEBUG = 0;

const dbg = (value: any) => (DEBUG ? value : undefined);

type CardType = 'data' | 'media' | 'cover' | 'naked';
type CardSize = 'snap' | 'default' | 'display';

type ActionButton =
    | RendersNullableElement<typeof ButtonPrimary>
    | RendersNullableElement<typeof ButtonSecondary>
    | RendersNullableElement<typeof ButtonLink>
    | undefined;

export type SlotAlignment = 'content' | 'bottom';

type ContainerProps = {
    type: CardType;
    size: CardSize;
    variant?: Variant;
    width?: string | number;
    height?: string | number;
    aspectRatio?: AspectRatio;
    children?: React.ReactNode;
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    onClose?: () => void;
    closeButtonLabel?: string;
};

type BackgroundProps = {
    backgroundColor?: string;
    backgroundImageSrc?: string;
    backgroundImageSrcSet?: string;
};

type TextContentProps = {
    size: CardSize;
    variant?: Variant;
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
    withTextShadow?: boolean;
};

type AssetProps = {
    size: CardSize;
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
    BackgroundProps &
    TextContentProps &
    AssetProps &
    ActionsProps &
    TopActionsProps &
    SlotProps &
    FooterProps;

type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps & BackgroundProps>(
    (
        {
            children,
            width,
            height,
            aspectRatio,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            'aria-description': ariaDescription,
            'aria-describedby': ariaDescribedby,
            dataAttributes,
            backgroundColor,
            variant,
        },
        ref
    ): JSX.Element => {
        const aspectRatioValue = width && height ? undefined : aspectRatioToNumber(aspectRatio);
        const aspectRatioStyle = aspectRatioValue
            ? applyCssVars({[styles.vars.aspectRatio]: String(aspectRatioValue)})
            : {};

        // @TODO verify this. Color cards have border?
        const boxedBorderStyleOverride = backgroundColor ? 'none' : undefined;

        return (
            // aria-description should be vaild, but this eslint rule is complaining about it
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props
            <section
                ref={ref}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-description={ariaDescription}
                aria-describedby={ariaDescribedby}
                className={classnames(styles.container)}
                {...getPrefixedDataAttributes(dataAttributes)}
                style={{
                    width: width || '100%',
                    height: height || '100%',
                    ...aspectRatioStyle,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        position: 'relative',
                        minHeight: '100%',
                    }}
                >
                    <InternalBoxed
                        // Without setting the width here, the component fails to get the correct width in some cases
                        // even if we set the 100% width style in the boxed class
                        width="100%"
                        height="100%"
                        variant={variant}
                        className={classnames(styles.boxed)}
                        background={backgroundColor}
                        borderRadius={skinVars.borderRadii.container}
                        border={boxedBorderStyleOverride}
                    >
                        {children}
                    </InternalBoxed>
                </div>
            </section>
        );
    }
);

type FillerProps = {
    minHeight?: number;
};

const Filler = ({minHeight}: FillerProps) => (
    <div
        style={{
            flexGrow: 1,
            flexShrink: 0,
            minHeight,
            border: dbg('1px solid green'),
            background: dbg('rgba(200,255,200,0.4)'),
        }}
    />
);

const Asset = ({size, type, asset}: AssetProps): JSX.Element | null => {
    // @TODO: review this logic
    if (!asset) {
        return null;
    }

    // Flexible Spacing (mode A according to specs)
    if (type === 'cover') {
        return <div data-testid="asset">{asset}</div>;
    }

    // Content-Follows Spacing (mode C according to specs)
    if (size === 'snap' || size === 'default') {
        return <div data-testid="asset">{asset}</div>;
    }

    return <div data-testid="asset">{asset}</div>;
};

type BackgroundImageProps = {
    src?: string;
    srcSet?: string;
};

const BackgroundImage = ({src, srcSet}: BackgroundImageProps): JSX.Element => {
    // @TODO: move to prop?
    const isExternalInverse = useIsInverseVariant();
    return (
        <div
            style={{
                // class displayCardBackground
                width: '100%',
                height: '100%',
                position: 'absolute',
                objectFit: 'cover',
                zIndex: 0,
            }}
        >
            <ThemeVariant
                // this avoids color flickering while loading the image
                variant={isExternalInverse ? 'inverse' : 'default'}
            >
                <Image width="100%" height="100%" src={src || ''} srcSet={srcSet} noBorderRadius />
            </ThemeVariant>
        </div>
    );
};

type FooterProps = {
    size: CardSize;
    isInverse?: boolean;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
    hasBackgroundImage?: boolean;
};

const Footer = ({
    size,
    isInverse,
    footerSlot,
    primaryAction,
    secondaryAction,
    hasBackgroundImage,
}: FooterProps & ActionsProps): JSX.Element => {
    const hasActions = !!(primaryAction || secondaryAction);
    return (
        <>
            <Filler />
            <div
                data-testid="footer"
                className={styles.containerPaddingXVariants[size]}
                style={{
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderTop: `1px solid ${isInverse ? skinVars.colors.dividerInverse : skinVars.colors.divider}`,
                    position: 'relative',
                    // @FIXME: the color should be the color token "cardFooterOverlay"
                    background: hasBackgroundImage ? 'rgba(0, 0, 0, 0.7)' : undefined,
                    backdropFilter: hasBackgroundImage ? 'blur(12px)' : undefined,
                }}
            >
                <Stack space={16}>
                    {footerSlot}
                    {hasActions && (
                        <Inline space="between" alignItems="center">
                            {primaryAction}
                            {secondaryAction}
                        </Inline>
                    )}
                </Stack>
            </div>
        </>
    );
};

type ActionsProps = {
    size: CardSize;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
};

const Actions = ({size, primaryAction, secondaryAction}: ActionsProps): JSX.Element => {
    return (
        <div
            style={{
                paddingTop: size === 'display' ? 24 : 16,
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

type BaseIconButtonAction = {
    Icon: (props: IconProps) => JSX.Element;
    label: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    'aria-current'?: React.AriaAttributes['aria-current'];
};

type IconButtonAction = BaseIconButtonAction &
    ExclusifyUnion<
        | {href: string; newTab?: boolean}
        | {
              to: string;
              newTab?: boolean;
              fullPageOnWebView?: boolean;
              replace?: boolean;
          }
        | {onPress: () => void}
    >;

type ToggleIconButtonAction = {
    checkedProps: BaseIconButtonAction;
    uncheckedProps: BaseIconButtonAction;
    onChange?: (checked: boolean) => void | undefined | Promise<void>;
    checked?: boolean;
    defaultChecked?: boolean;
};

export type CardAction = {
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
} & ExclusifyUnion<IconButtonAction | ToggleIconButtonAction>;

type TopActionsArray = ReadonlyArray<CardAction | React.ReactElement>;

export const CardActionIconButton = (props: CardAction): JSX.Element => {
    const variant = useThemeVariant();

    if (props.Icon) {
        return (
            <IconButton
                small
                {...props}
                aria-label={props.label}
                type="neutral"
                backgroundType="transparent"
            />
        );
    }

    const {checkedProps, uncheckedProps, ...rest} = props;
    return (
        <ToggleIconButton
            small
            {...rest}
            checkedProps={{
                ...checkedProps,
                'aria-label': props.checkedProps.label,
                type: variant === 'media' ? 'neutral' : 'brand',
                backgroundType: 'solid',
            }}
            uncheckedProps={{
                ...uncheckedProps,
                'aria-label': props.uncheckedProps.label,
                type: 'neutral',
                backgroundType: 'transparent',
            }}
        />
    );
};

type TopActionsProps = {
    size?: CardSize;
    variant?: Variant;
    onClose?: () => void;
    closeButtonLabel?: string;
    topActions?: TopActionsArray;
};

const TopActions = ({onClose, closeButtonLabel, topActions, variant}: TopActionsProps): JSX.Element => {
    const {texts, t} = useTheme();
    const actions = topActions ? [...topActions] : [];

    if (onClose) {
        actions.push({
            label: closeButtonLabel || texts.closeButtonLabel || t(tokens.closeButtonLabel),
            onPress: onClose,
            Icon: IconCloseRegular,
        });
    }

    if (actions.length === 0) {
        return <></>;
    }

    return (
        <ThemeVariant variant={variant}>
            <div className={styles.topActionsContainer}>
                {actions.map((action, index) => {
                    if ('Icon' in action || 'checkedProps' in action) {
                        return <CardActionIconButton key={index} {...action} />;
                    }
                    return action;
                })}
            </div>
        </ThemeVariant>
    );
};

const TextContent = ({
    size: size,
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
    variant,
    withTextShadow,
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

    const colors =
        colorVariants[variant as keyof typeof colorVariants] ||
        colorVariants[themeVariant as keyof typeof colorVariants] ||
        colorVariants.default;
    const textVariant = textVariants[size] || textVariants.default;
    const textShadowStyle = withTextShadow ? '0 0 20px rgba(0,0,0,1)' : undefined;

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
                        textShadow={textShadowStyle}
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
                        textShadow={textShadowStyle}
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
                        textShadow={textShadowStyle}
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
                        textShadow={textShadowStyle}
                    >
                        {description}
                    </Text>
                </div>
            )}
        </div>
    );
};

export const InternalCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<CardProps>>(
    (
        {
            type,
            size,
            backgroundColor: backgroundColorProp,
            backgroundImageSrc,
            backgroundImageSrcSet,
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
            variant: variantProp,
            width,
            height,
            aspectRatio,
            slot,
            slotAlignment = 'content',
            primaryAction,
            secondaryAction,
            showFooter,
            footerSlot,
            topActions,
            onClose,
            closeButtonLabel,
            ...touchableProps
        },
        ref
    ): JSX.Element => {
        // @TODO: A11Y
        const {/* text: slotText, */ ref: slotRef} = useInnerText();
        const hasActions = !!(primaryAction || secondaryAction);
        const hasAssetOrHeadline = !!(asset || headline);
        // We consider any string (including empty string) as an image source
        // If the source is not valid, it shoud show an empty case
        const hasBackgroundImage =
            type === 'cover' &&
            (typeof backgroundImageSrc === 'string' || typeof backgroundImageSrcSet === 'string');
        const hasVideo = false; // TODO
        const hasCustomBackground = !!(backgroundColorProp || hasBackgroundImage || hasVideo);
        const hasGradient = hasBackgroundImage || hasVideo;

        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const isInverseOutside = useIsInverseOrMediaVariant();
        const isExternalInverse = useIsInverseVariant();
        const variant = variantProp || (type === 'cover' && hasCustomBackground ? 'media' : undefined);

        const isInverseStyle = variant ? variant === 'inverse' || variant === 'media' : isInverseOutside;

        const overlayStyle = isInverseStyle
            ? styles.touchableCardOverlayInverse
            : styles.touchableCardOverlay;
        const shouldShowFooter = showFooter && (hasActions || !!footerSlot);
        const showActionsInBody = !shouldShowFooter && hasActions;
        const topActionsLength = (topActions ? topActions.length : 0) + (onClose ? 1 : 0);

        // @TODO: REVIEW THIS
        const backgroundColor =
            hasBackgroundImage || hasVideo
                ? 'transparent'
                : backgroundColorProp ||
                  (variant === 'alternative'
                      ? skinVars.colors.backgroundAlternative
                      : variant === 'media'
                        ? isExternalInverse
                            ? skinVars.colors.backgroundContainerBrandOverInverse
                            : skinVars.colors.backgroundBrand
                        : undefined);

        console.log({
            type,
            asset,
            variantProp,
            variant,
            isInverse: isInverseStyle,
            backgroundColor,
            backgroundColorProp,
        });

        return (
            <Container
                type={type}
                size={size}
                dataAttributes={dataAttributes}
                ref={ref}
                variant={variant}
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                backgroundColor={backgroundColor}
            >
                {hasBackgroundImage && (
                    <BackgroundImage src={backgroundImageSrc} srcSet={backgroundImageSrcSet} />
                )}
                <TopActions
                    onClose={onClose}
                    closeButtonLabel={closeButtonLabel}
                    topActions={topActions}
                    variant={variant}
                />

                <BaseTouchable
                    maybe
                    className={classnames(styles.touchable, styles.touchableContainer)}
                    {...touchableProps}
                >
                    {isTouchable && <div className={overlayStyle} />}
                    <div
                        data-testid="body"
                        className={classnames(styles.touchable, {
                            [styles.containerPaddingTopVariants[size]]: !!asset,
                        })}
                        style={{
                            // with a footer, the bottom padding for the body is always 16px
                            border: dbg('2px solid red'),
                        }}
                    >
                        {!!asset && (
                            <div className={classnames(styles.containerPaddingXVariants[size])}>
                                <Asset type={type} size={size} asset={asset} />
                            </div>
                        )}
                        {type === 'cover' && (
                            <Filler minHeight={type === 'cover' && topActionsLength && !asset ? 48 : 0} />
                        )}
                        <div
                            className={classnames(
                                styles.containerPaddingXVariants[size],
                                styles.containerPaddingBottomVariants[size],
                                styles.containerPaddingTopVariants[size]
                            )}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: type === 'cover' ? undefined : '100%',
                                // padding overrides for specific cases
                                paddingTop: type === 'cover' ? 40 : asset ? 16 : undefined,
                                paddingBottom: shouldShowFooter ? 16 : undefined,
                                border: dbg('2px solid blue'),
                                background: hasGradient ? skinVars.colors.cardContentOverlay : undefined,
                            }}
                        >
                            <div className={styles.contentContainer}>
                                <div className={styles.textContent}>
                                    <TextContent
                                        variant={variant}
                                        size={size}
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
                                        withTextShadow={hasGradient}
                                    />
                                </div>
                                {!hasAssetOrHeadline && type !== 'cover' && (
                                    <div
                                        style={{
                                            flexShrink: 0,
                                            flexGrow: 0,
                                            width: topActionsLength * 48 - 24,
                                            background: dbg('#fee'),
                                        }}
                                    />
                                )}
                            </div>
                            {type !== 'cover' && slotAlignment === 'bottom' && <Filler />}
                            {slot && (
                                <div ref={slotRef} data-testid="slot">
                                    {slot}
                                </div>
                            )}
                            {type !== 'cover' && slotAlignment === 'content' && showActionsInBody && (
                                <Filler />
                            )}
                            {showActionsInBody && (
                                <Actions
                                    size={size}
                                    primaryAction={primaryAction}
                                    secondaryAction={secondaryAction}
                                />
                            )}
                        </div>
                    </div>
                </BaseTouchable>
                {shouldShowFooter && (
                    <Footer
                        isInverse={isInverseStyle}
                        size={size}
                        footerSlot={footerSlot}
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        hasBackgroundImage={hasBackgroundImage}
                    />
                )}
            </Container>
        );
    }
);

type DataCardProps = {
    size?: CardSize;
    background?: string;
    variant?: Variant;
    /** @deprecated use variant */
    isInverse?: boolean;
    asset?: React.ReactElement;
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
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    extraAlignment?: SlotAlignment;
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    aspectRatio?: AspectRatio;
    children?: undefined;
    /** @deprecated use primaryAction */
    button?: ActionButton;
    /** @deprecated use secondaryAction */
    buttonLink?: ActionButton;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    onClose?: () => void;
    closeButtonLabel?: string;
    /** @deprecated use topActions */
    actions?: TopActionsArray;
    topActions?: TopActionsArray;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
};

export const DataCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<DataCardProps>>(
    (
        {
            dataAttributes,
            size = 'default',
            // handle deprecations
            button,
            primaryAction,
            buttonLink,
            secondaryAction,
            extra,
            slot,
            actions,
            topActions,
            isInverse,
            variant,
            // pass through props
            ...rest
        },
        ref
    ) => {
        return (
            <InternalCard
                type="data"
                size={size}
                dataAttributes={{
                    'component-name': 'DataCard',
                    testid: 'DataCard',
                    ...dataAttributes,
                }}
                ref={ref}
                primaryAction={primaryAction || button}
                secondaryAction={secondaryAction || buttonLink}
                topActions={topActions || actions}
                slot={slot || extra}
                variant={variant || (isInverse ? 'inverse' : undefined)}
                {...rest}
            />
        );
    }
);

type SnapCardProps = Omit<DataCardProps, 'size'>;

/**
 * @deprecated use <Datacard size="snap" /> instead
 */
export const SnapCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<SnapCardProps>>(
    ({dataAttributes, ...rest}, ref) => {
        return (
            <DataCard
                size="snap"
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

type CoverCardBaseProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    size?: 'default' | 'display';
    variant?: Variant;
    aspectRatio?: AspectRatio;
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    topActions?: ReadonlyArray<CardAction | React.ReactElement>;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    onClose?: () => void;
    closeButtonLabel?: string;
    dataAttributes?: DataAttributes;
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
    slotAlignment?: SlotAlignment;
    slot?: React.ReactNode;
};

type ImageProps = {
    backgroundImageSrc?: string;
    backgroundImageSrcSet?: string;
};

type BackgroundColorProps = {
    backgroundColor?: string;
};

type VideoProps = {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

export const CoverCard = React.forwardRef<
    HTMLDivElement,
    MaybeTouchableCard<CoverCardBaseProps & ExclusifyUnion<ImageProps | VideoProps | BackgroundColorProps>>
>(({size = 'default', ...rest}, ref) => {
    return <InternalCard size={size} {...rest} ref={ref} type="cover" />;
});

type PosterCardBaseProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    aspectRatio?: AspectRatio;
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    /** @deprecated use topActions */
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    topActions?: ReadonlyArray<CardAction | React.ReactElement>;
    onClose?: () => void;
    closeButtonLabel?: string;
    dataAttributes?: DataAttributes;
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
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slotAlignment?: SlotAlignment;
    slot?: React.ReactNode;
};

type DeprecatedImageProps = {
    backgroundImage: string | {src: string; srcSet?: string} | {src?: string; srcSet: string};
};

type DeprecatedBackgroundColorProps = {
    backgroundColor?: string | undefined;
    /** @deprecated use variant */
    isInverse?: boolean;
    variant?: Variant;
};

/**
 * @deprecated use CoverCard
 */
export const PosterCard = React.forwardRef<
    HTMLDivElement,
    MaybeTouchableCard<
        PosterCardBaseProps &
            ExclusifyUnion<DeprecatedImageProps | DeprecatedBackgroundColorProps /* | VideoProps  */>
    >
>(({isInverse, variant, actions, topActions, extra, slot, backgroundImage, ...rest}, ref) => {
    const backgroundImageProps = {
        backgroundImageSrc: typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.src,
        backgroundImageSrcSet: typeof backgroundImage === 'string' ? undefined : backgroundImage?.srcSet,
    } as BackgroundImageProps;
    return (
        <CoverCard
            ref={ref}
            size="display"
            variant={variant || (isInverse ? 'inverse' : undefined)}
            topActions={topActions || actions}
            slot={slot || extra}
            {...backgroundImageProps}
            {...rest}
        />
    );
});
