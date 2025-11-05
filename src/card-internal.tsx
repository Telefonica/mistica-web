// spec: https://www.figma.com/design/tKdPOfcUALzVIh5oizFbm7
'use client';
import * as React from 'react';
import * as styles from './card-internal.css';
import * as mediaStyles from './image.css';
import * as tokens from './text-tokens';
import {Text} from './text';
import {useInnerText, useTheme} from './hooks';
import {ThemeVariant, useIsInverseVariant, useThemeVariant} from './theme-variant-context';
import Tag from './tag';
import Stack from './stack';
import Image from './image';
import Video from './video';
import Inline from './inline';
import Spinner from './spinner';
import IconPlayFilled from './generated/mistica-icons/icon-play-filled';
import IconPauseFilled from './generated/mistica-icons/icon-pause-filled';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {InternalBoxed} from './boxed';
import {BaseTouchable, type PressHandler} from './touchable';
import {AspectRatioContainer, aspectRatioToNumber} from './utils/aspect-ratio-support';
import {vars as skinVars} from './skins/skin-contract.css';
import {IconButton, ToggleIconButton} from './icon-button';
import {combineRefs} from './utils/common';
import {isRunningAcceptanceTest} from './utils/platform';
import classnames from 'classnames';
import ButtonGroup from './button-group';
import {isBiggerHeading} from './utils/headings';
import {applyAlpha} from './utils/color';

import type {
    DataAttributes,
    HeadingType,
    IconProps,
    RendersElement,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';
import type {ExclusifyUnion} from './utils/utility-types';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {Variant} from './theme-variant-context';
import type {VideoElement, VideoSource, AspectRatio as VideoAspectRatio} from './video';
import type {AspectRatio as ImageAspectRatio} from './image';

export type CardAspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto' | number;
export type MediaAspectRatio = ImageAspectRatio | VideoAspectRatio | 'auto' | number;

export type CardType = 'data' | 'media' | 'cover' | 'naked';
export type CardSize = 'snap' | 'default' | 'display';
export type MediaPosition = 'top' | 'left' | 'right';

/** @deprecated use imageSrc, imageSrcSet, videoSrc and related props */
export type DeprecatedMediaProp = RendersElement<typeof Image> | RendersElement<typeof Video>;

export type SlotAlignment = 'content' | 'bottom';

export type CardActionButtonPrimary = RendersNullableElement<typeof ButtonPrimary>;
export type CardActionButtonSecondary = RendersNullableElement<typeof ButtonSecondary>;
export type CardActionButtonLink = RendersNullableElement<typeof ButtonLink>;

type ContainerProps = {
    type: CardType;
    size: CardSize;
    variant?: Variant;
    width?: string | number;
    height?: string | number;
    /** Gradient overlay color for cover cards. If not set it uses the theme color */
    gradientOverlayColor?: 'transparent' | string;
    aspectRatio?: CardAspectRatio;
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
};

type ButtonsProps = {
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    buttonLink?: CardActionButtonLink;
};

type MediaProps = {
    /** @deprecated use imageSrc, imageSrcSet, videoSrc and related props */
    media?: DeprecatedMediaProp;
    backgroundColor?: string;
    imageSrc?: string;
    imageSrcSet?: string;
    imageAlt?: string;
    imageFit?: 'fit' | 'fill' | 'fill-center';
    videoSrc?: VideoSource;
    videoRef?: React.RefObject<VideoElement>;
    mediaPosition?: MediaPosition;
    /** Ignored when mediaPosition !== 'top' */
    mediaAspectRatio?: MediaAspectRatio;
    /** Ignored when mediaPosition === 'top' */
    mediaWidth?: string | number;
    circledImage?: boolean;
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
    asset?: React.ReactElement;
};

type TopActionsProps = {
    onClose?: () => void;
    closeButtonLabel?: string;
    topActions?: TopActionsArray;
    videoAction?: CardAction;
};

type SlotProps = {
    slot?: React.ReactNode;
    slotAlignment?: SlotAlignment;
};

type FooterProps = {
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
    footerBackgroundColor?: string;
    footerVariant?: 'default' | 'inverse';
};

type NoChildrenProps = {
    children?: undefined;
};

type CardProps = ContainerProps &
    MediaProps &
    TextContentProps &
    AssetProps &
    ButtonsProps &
    TopActionsProps &
    SlotProps &
    FooterProps &
    NoChildrenProps;

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

type TouchableCard<T> = T & TouchableProps;
export type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

type PrivateContainerProps = {
    children?: React.ReactNode;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps & MediaProps & PrivateContainerProps>(
    (
        {
            type,
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

        const boxedBorderStyleOverride = backgroundColor ? 'none' : undefined;
        const isNaked = type === 'naked';

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
                {...getPrefixedDataAttributes(dataAttributes, 'InternalCard')}
                style={{
                    width: width || '100%',
                    height: height || '100%',
                    position: 'relative',
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
                        background={isNaked ? 'transparent' : backgroundColor}
                        borderRadius={isNaked ? 'none' : skinVars.borderRadii.container}
                        border={isNaked ? 'none' : boxedBorderStyleOverride}
                        overflow="visible"
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
        }}
    />
);

type PrivateAssetProps = {
    size: CardSize;
    type: CardType;
    absolute?: boolean;
};

const Asset = ({size, absolute, asset, type}: AssetProps & PrivateAssetProps): JSX.Element | null => {
    if (!asset) {
        return null;
    }

    const assetWithContainer = (
        <div
            data-testid="asset"
            aria-hidden
            style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: skinVars.borderRadii.mediaSmall})}
        >
            {asset}
        </div>
    );

    if (absolute) {
        return (
            <div
                style={{position: 'absolute', top: 0, left: 0}}
                className={classnames(
                    styles.containerPaddingXVariants[size],
                    styles.containerPaddingTopVariants[size]
                )}
            >
                {assetWithContainer}
            </div>
        );
    }

    return (
        <div className={classnames({[styles.containerPaddingXVariants[size]]: type !== 'naked'})}>
            {assetWithContainer}
        </div>
    );
};

export type BackgroundImageOrVideoProps = {
    video?: React.ReactNode;
    src?: string;
    srcSet?: string;
    backgroundVariant: Variant;
};

const BackgroundImageOrVideo = ({
    video,
    src,
    srcSet,
    backgroundVariant,
}: BackgroundImageOrVideoProps): JSX.Element => {
    return (
        <ThemeVariant variant={backgroundVariant}>
            <div
                className={styles.backgroundImageOrVideoContainer}
                style={applyCssVars({
                    [mediaStyles.vars.mediaBorderRadius]: '0px',
                    borderRadius: skinVars.borderRadii.container,
                    overflow: 'hidden',
                })}
            >
                {video ? (
                    video
                ) : (
                    <Image
                        dataAttributes={{testid: 'image'}}
                        width="100%"
                        height="100%"
                        src={src || ''}
                        srcSet={srcSet}
                        alt=""
                    />
                )}
            </div>
        </ThemeVariant>
    );
};

type VideoState = 'loading' | 'loadingTimeout' | 'playing' | 'paused' | 'error';

type VideoAction = 'play' | 'pause' | 'fail' | 'showSpinner' | 'reset';

const transitions: Record<VideoState, Partial<Record<VideoAction, VideoState>>> = {
    loading: {
        showSpinner: 'loadingTimeout',
        play: 'playing',
        pause: 'paused',
        fail: 'error',
    },

    loadingTimeout: {
        play: 'playing',
        pause: 'paused',
        fail: 'error',
        reset: 'loading',
    },

    playing: {
        pause: 'paused',
        reset: 'loading',
        fail: 'error',
    },

    paused: {
        play: 'playing',
        reset: 'loading',
        fail: 'error',
    },

    error: {
        reset: 'loading',
    },
};

const videoReducer = (state: VideoState, action: VideoAction): VideoState =>
    transitions[state][action] || state;

export const CardActionSpinner = ({color}: IconProps): React.ReactElement => (
    <Spinner color={color} size={16} delay="0" />
);

const CardActionPauseIcon = ({color}: IconProps) => <IconPauseFilled color={color} size={12} />;

const CardActionPlayIcon = ({color}: IconProps) => <IconPlayFilled color={color} size={12} />;

export const useVideoWithControls = (
    videoSrc?: VideoSource,
    poster?: string,
    videoRef?: React.RefObject<VideoElement>,
    autoHeight?: boolean
): {
    video?: React.ReactNode;
    videoAction?: CardAction;
} => {
    const {texts, t} = useTheme();
    const videoController = React.useRef<VideoElement>(null);
    const [videoStatus, dispatch] = React.useReducer(
        videoReducer,
        process.env.NODE_ENV === 'test' ? 'playing' : 'loading'
    );

    React.useEffect(() => {
        const loadingTimeoutId = setTimeout(() => dispatch('showSpinner'), 2000);
        videoController.current?.load();

        return () => {
            clearTimeout(loadingTimeoutId);
            dispatch('reset');
        };
    }, [videoSrc]);

    const video = React.useMemo(() => {
        return videoSrc !== undefined ? (
            <Video
                ref={combineRefs(videoController, videoRef)}
                src={videoSrc}
                poster={poster}
                width="100%"
                height={autoHeight ? undefined : '100%'}
                onError={() => dispatch('fail')}
                onPause={() => dispatch('pause')}
                onPlay={() => dispatch('play')}
            />
        ) : undefined;
    }, [videoRef, videoSrc, poster, autoHeight]);

    const onVideoControlPress = () => {
        const video = videoController.current;
        if (video) {
            if (videoStatus === 'loading') {
                dispatch('showSpinner');
            } else if (videoStatus === 'paused') {
                video.play();
            } else if (videoStatus === 'playing') {
                video.pause();
            }
        }
    };

    if (videoStatus === 'error') {
        return {video};
    }

    const videoAction: CardAction | undefined = video
        ? {
              uncheckedProps: {
                  Icon:
                      videoStatus === 'loadingTimeout' && !isRunningAcceptanceTest()
                          ? CardActionSpinner
                          : CardActionPauseIcon,
                  label:
                      videoStatus === 'loadingTimeout'
                          ? ''
                          : texts.pauseIconButtonLabel || t(tokens.pauseIconButtonLabel),
              },
              checkedProps: {
                  Icon: CardActionPlayIcon,
                  label: texts.playIconButtonLabel || t(tokens.playIconButtonLabel),
              },
              onChange: onVideoControlPress,
              disabled: isRunningAcceptanceTest() ? false : videoStatus === 'loadingTimeout',
              checked: videoStatus === 'paused',
          }
        : undefined;

    return {
        video,
        videoAction,
    };
};

type PrivateButtonsProps = {
    size: CardSize;
};

const Buttons = ({
    size,
    buttonPrimary,
    buttonSecondary,
    buttonLink,
}: ButtonsProps & PrivateButtonsProps): JSX.Element => {
    return (
        <div className={styles.actionsContainerVariants[size]}>
            <ButtonGroup primaryButton={buttonPrimary} secondaryButton={buttonSecondary} link={buttonLink} />
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

export type TopActionsArray = ReadonlyArray<CardAction | React.ReactElement>;

export const CardActionIconButton = (props: CardAction): JSX.Element => {
    const variant = useThemeVariant();

    if (props.Icon) {
        return (
            <IconButton
                {...props}
                small
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

type PrivateTopActionsProps = {
    actions?: TopActionsArray;
    testid?: string;
    variant?: Variant;
    containerStyles?: React.CSSProperties;
};

export const TopActions = ({
    testid = 'topActions',
    onClose,
    closeButtonLabel,
    actions: actionsProp,
    variant,
    containerStyles = {},
}: Omit<TopActionsProps, 'topActions'> & PrivateTopActionsProps): JSX.Element => {
    const {texts, t} = useTheme();
    const actions = actionsProp ? [...actionsProp] : [];

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
            <div className={styles.topActionsContainer} style={containerStyles} data-testid={testid}>
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

type MediaComponentProps = {
    type: CardType;
    size: CardSize;
    asset?: React.ReactElement;
    imageSrc?: string;
    imageSrcSet?: string;
    imageAlt?: string;
    imageFit: 'fit' | 'fill' | 'fill-center';
    video?: React.ReactNode;
    mediaAspectRatio: MediaAspectRatio;
    mediaPosition: MediaPosition;
    mediaWidth: string | number;
    videoAction?: CardAction;
    circledImage?: boolean;
};

const Media = ({
    type,
    size,
    asset,
    imageSrc,
    imageSrcSet,
    imageFit,
    imageAlt = '',
    video,
    mediaAspectRatio,
    mediaPosition,
    mediaWidth,
    circledImage,
}: MediaComponentProps): JSX.Element => {
    const aspectRatioAsNumber = aspectRatioToNumber(mediaAspectRatio);

    const imageProps =
        type === 'naked' && circledImage
            ? {circular: true}
            : {
                  width: '100%',
                  height: mediaPosition === 'top' ? (aspectRatioAsNumber === 0 ? undefined : '100%') : '100%',
              };

    const renderMedia = () => {
        if (video) {
            return video;
        }
        if (imageSrc !== undefined || imageSrcSet !== undefined) {
            const isLeftOrRight = mediaPosition === 'left' || mediaPosition === 'right';
            const imageFitProps = {
                fit: {objectFit: 'contain', objectPosition: `bottom ${mediaPosition}`},
                fill: {objectFit: 'cover', objectPosition: mediaPosition},
                'fill-center': {objectFit: 'cover', objectPosition: 'center'},
            } as const;

            return (
                <Image
                    src={imageSrc || ''}
                    srcSet={imageSrcSet}
                    {...imageProps}
                    dataAttributes={{testid: 'image'}}
                    alt={imageAlt}
                    {...(isLeftOrRight ? imageFitProps[imageFit] : {})}
                />
            );
        }
        return null;
    };

    const mediaElement = renderMedia();

    if (!mediaElement) {
        return <></>;
    }

    const commonContainerStyles = {
        // overrides media border radius
        ...(type === 'naked' ? undefined : applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})),
    };

    if (mediaPosition === 'top') {
        // using AspectRatioContainer because the <video> element flashes with the poster image size while loading
        return (
            <>
                <AspectRatioContainer aspectRatio={aspectRatioAsNumber} style={commonContainerStyles}>
                    {mediaElement}
                </AspectRatioContainer>
                <Asset absolute size={size} asset={asset} type={type} />
            </>
        );
    }

    // in left/right media position, mediaAspectRatio is ignored
    return (
        <>
            <div
                style={{
                    ...commonContainerStyles,
                    width: mediaWidth,
                    flexShrink: 0,
                    flexGrow: 0,
                    height: '100%',
                    position: 'relative',
                }}
            >
                {mediaElement}
            </div>
            {mediaPosition !== 'right' && <Asset absolute size={size} asset={asset} type={type} />}
        </>
    );
};

type PrivateFooterProps = {
    type: CardType;
    size: CardSize;
    variant?: Variant;
    hasBackgroundImageOrVideo?: boolean;
    isInverseOutside: boolean;
    overlayColor: string;
};

const Footer = ({
    type,
    size,
    variant,
    footerSlot,
    buttonPrimary,
    buttonSecondary,
    buttonLink,
    hasBackgroundImageOrVideo,
    footerVariant,
    footerBackgroundColor,
    isInverseOutside,
    overlayColor,
}: FooterProps & ButtonsProps & PrivateFooterProps): JSX.Element => {
    const hasButtons = !!(buttonPrimary || buttonSecondary || buttonLink);
    const has3Buttons = !!(buttonPrimary && buttonSecondary && buttonLink);
    const isInverseCard = variant === 'inverse' || variant === 'media';
    const isNaked = type === 'naked';
    const backgroundColor =
        footerBackgroundColor ||
        (footerVariant && footerVariant !== variant
            ? footerVariant === 'default'
                ? skinVars.colors.backgroundContainer
                : isInverseOutside
                  ? skinVars.colors.backgroundContainerBrandOverInverse
                  : skinVars.colors.backgroundContainerBrand
            : undefined);

    return (
        <ThemeVariant variant={footerVariant || variant}>
            <Filler />
            <div
                style={{
                    background: backgroundColor || (hasBackgroundImageOrVideo ? overlayColor : undefined),
                    position: 'relative',
                    backdropFilter: hasBackgroundImageOrVideo ? 'blur(12px)' : undefined,
                    borderBottomLeftRadius: isNaked ? 0 : skinVars.borderRadii.container,
                    borderBottomRightRadius: isNaked ? 0 : skinVars.borderRadii.container,
                }}
            >
                <div
                    // The divider is outside the footer because it has a conditional right margin
                    style={{
                        borderTop: backgroundColor
                            ? undefined
                            : `1px solid ${isInverseCard ? skinVars.colors.dividerInverse : skinVars.colors.divider}`,
                        marginRight: isNaked ? 16 : 0,
                    }}
                />
                <div
                    data-testid="footer"
                    className={classnames({[styles.containerPaddingXVariants[size]]: !isNaked})}
                    style={{
                        paddingTop: 16,
                        paddingBottom: isNaked ? 0 : 16,
                        paddingRight: isNaked ? 16 : undefined,
                    }}
                >
                    <Stack space={16}>
                        {footerSlot}
                        {hasButtons &&
                            // @FIXME: We should use the ButtonGroup component
                            // https://jira.tid.es/browse/WEB-2278
                            // https://www.figma.com/design/koROdh3HpEPG2O8jG52Emh/%F0%9F%94%B8-Buttons-Specs?node-id=4337-1606&t=HtImvar8DMbivDqC-0
                            (has3Buttons ? (
                                <Stack space={16}>
                                    <Inline space="between" alignItems="center">
                                        {buttonPrimary}
                                        {buttonSecondary}
                                    </Inline>
                                    <div
                                        // bleed workaround
                                        style={{marginLeft: -12}}
                                    >
                                        {buttonLink}
                                    </div>
                                </Stack>
                            ) : (
                                <Inline space="between" alignItems="center">
                                    {buttonPrimary}
                                    {buttonSecondary}
                                    {buttonLink}
                                </Inline>
                            ))}
                    </Stack>
                </div>
            </div>
        </ThemeVariant>
    );
};

type PrivateTextContentProps = {
    size: CardSize;
    variant?: Variant;
    withTextShadow?: boolean;
    headlineRef?: (element: HTMLHeadingElement | null) => void;
    hasCustomBackground: boolean;
};

const TextContent = ({
    type,
    hasCustomBackground,
    headlineRef,
    size,
    variant,
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
    withTextShadow,
}: TextContentProps & PrivateTextContentProps): JSX.Element => {
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
            description:
                type === 'cover' && hasCustomBackground
                    ? colorValues.textPrimaryInverse
                    : colorValues.textSecondaryInverse,
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
    const textShadowStyle = withTextShadow ? '0 0 15px rgba(0, 0, 0, 0.4)' : undefined;

    const headlineElement = headline && (
        // Read order 2. Visual order 1
        <div style={{paddingBottom: 8, order: 1}} data-testid="headline" ref={headlineRef}>
            {typeof headline === 'string' ? <Tag type="promo">{headline}</Tag> : headline}
        </div>
    );

    const pretitleElement = pretitle && (
        // Read order: 3 or 1. Visual order 2
        <div style={{paddingBottom: 4, order: 2}} data-testid="pretitle">
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
    );

    const titleElement = title && (
        // Read order: 1 or 3. Visual order 3
        <div style={{paddingBottom: 4, order: 3}} data-testid="title">
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
    );

    const subtitleElement = subtitle && (
        // Read order: 4. Visual order 4
        <div style={{paddingBottom: 0, order: 4}} data-testid="subtitle">
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
    );

    const descriptionElement = description && (
        // Read order: 5. Visual order 5
        <div style={{paddingTop: 4, order: 5}} data-testid="description">
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
    );

    const [title1, title2] =
        title && isBiggerHeading(titleAs, pretitleAs)
            ? [titleElement, pretitleElement]
            : [pretitleElement, titleElement];

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {title1}
            {headlineElement}
            {title2}
            {subtitleElement}
            {descriptionElement}
        </div>
    );
};

const SKIN_OVERLAY_COLORS = [
    skinVars.colors.cardContentOverlay as string,
    skinVars.colors.cardFooterOverlay as string,
];

const RGBA_REGEX = /rgba\([^,]+,\s*[^,]+,\s*[^,]+,\s*([^)]+)\)/g;

const replaceRgbaWithColor = (stringWithRgbaColors: string, newColor: string): string => {
    return stringWithRgbaColors.replace(RGBA_REGEX, (_, alpha) => applyAlpha(newColor, parseFloat(alpha)));
};

export const InternalCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<CardProps>>(
    (
        {
            type,
            size,
            backgroundColor: backgroundColorProp,
            imageSrc,
            imageSrcSet,
            imageAlt = '',
            imageFit = 'fill-center',
            videoSrc,
            videoRef,
            media,
            mediaAspectRatio: mediaAspectRatioProp = 'auto',
            mediaPosition: mediaPositionProp = 'top',
            mediaWidth = 150,
            circledImage,
            asset,
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
            dataAttributes,
            variant: variantProp,
            width,
            height,
            aspectRatio,
            slot,
            slotAlignment = 'content',
            buttonPrimary,
            buttonSecondary,
            buttonLink,
            showFooter: showFooterProp,
            footerBackgroundColor,
            footerVariant,
            footerSlot,
            topActions,
            onClose,
            closeButtonLabel,
            'aria-label': ariaLabelProp,
            'aria-labelledby': ariaLabeledByProp,
            'aria-description': ariaDescriptionProp,
            'aria-describedby': ariaDescribedByProp,
            gradientOverlayColor,
            ...touchableProps
        },
        ref
    ): JSX.Element => {
        const {text: slotText, ref: slotRef} = useInnerText();
        const {text: headlineText, ref: headlineRef} = useInnerText();
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const hasButtons = !!(buttonPrimary || buttonSecondary || buttonLink);
        const {colorValues} = useTheme();

        // In this context "media" refers to the image or video that is placed inside the card, not the background
        const typeAllowsMedia = type === 'media' || type === 'naked';
        const hasMediaImage = typeAllowsMedia && (imageSrc !== undefined || imageSrcSet !== undefined);
        const hasMediaVideo = typeAllowsMedia && videoSrc !== undefined;
        const hasMediaSources = hasMediaImage || hasMediaVideo;
        const hasDeprecatedMedia = typeAllowsMedia && !!media && !hasMediaSources;
        const hasMedia = hasMediaSources || hasDeprecatedMedia;
        const isNaked = type === 'naked';

        // If no media is provided, we use the "top" media position to simplify logic
        const mediaPosition = hasMedia ? mediaPositionProp : 'top';
        // Override mediaAspectRatio for naked cards with circled image
        const mediaAspectRatio = type === 'naked' && circledImage ? 1 : mediaAspectRatioProp;

        // We consider any string (including empty string) as an image/video source. If not valid a fallback image will be used.
        const hasBackgroundImage = type === 'cover' && (imageSrc !== undefined || imageSrcSet !== undefined);
        const hasBackgroundVideo = type === 'cover' && videoSrc !== undefined;
        const hasCustomBackground = !!backgroundColorProp || hasBackgroundImage || hasBackgroundVideo;
        const hasBackgroundImageOrVideo = hasBackgroundImage || hasBackgroundVideo;

        const shouldShowVideo = hasMediaVideo || hasBackgroundVideo;
        const {video, videoAction} = useVideoWithControls(
            shouldShowVideo ? videoSrc : undefined,
            imageSrc,
            videoRef,
            type === 'cover' || mediaPosition !== 'top' ? false : aspectRatioToNumber(mediaAspectRatio) === 0
        );

        const isInverseOutside = useIsInverseVariant();
        const externalVariant = isInverseOutside ? 'inverse' : 'default';
        const backgroundVariant = variantProp || externalVariant;
        const variant: Variant =
            variantProp || (type === 'cover' && hasCustomBackground ? 'media' : 'default');

        const overlayStyle =
            variant === 'inverse' ? styles.touchableCardOverlayInverse : styles.touchableCardOverlay;

        // If the card has actions and an onClose handler, the footer will always be shown
        // If the footer has no content, it will not be shown
        const shouldShowFooter =
            (showFooterProp && (hasButtons || !!footerSlot)) || (hasButtons && touchableProps.onPress);

        const showButtonsInBody = !shouldShowFooter && hasButtons;

        const topActionsLengthWithoutVideo = (topActions?.length || 0) + (onClose ? 1 : 0);
        const topActionsLength = videoAction
            ? topActionsLengthWithoutVideo + 1
            : topActionsLengthWithoutVideo;

        const hasAssetInContent = asset && !(hasMedia && mediaPosition === 'left');
        const shouldAddContentSpacingForTopActions =
            type !== 'cover' && topActionsLength > 0 && !hasAssetInContent && !headline;

        // See asset spacing config in spec
        const isAssetConfigA = type === 'cover' || (type === 'data' && size === 'display');

        const borderRadius = skinVars.borderRadii.container;

        const backgroundColor =
            hasBackgroundImage || hasBackgroundVideo
                ? 'transparent'
                : backgroundColorProp ||
                  (variant === 'media'
                      ? isInverseOutside
                          ? skinVars.colors.backgroundContainerBrandOverInverse
                          : skinVars.colors.backgroundBrand
                      : variant === 'alternative'
                        ? skinVars.colors.backgroundAlternative
                        : undefined);

        const ariaLabel =
            ariaLabelProp ||
            (ariaLabeledByProp
                ? undefined
                : (title && isBiggerHeading(titleAs, pretitleAs)
                      ? [title, headlineText, pretitle, subtitle, description, slotText]
                      : [pretitle, headlineText, title, subtitle, description, slotText]
                  )
                      .filter(Boolean)
                      .join(' '));

        const calcOverlayBackgrounds = () => {
            if (gradientOverlayColor === 'transparent') {
                return ['transparent', 'transparent'];
            }
            if (gradientOverlayColor) {
                return [
                    replaceRgbaWithColor(colorValues.cardContentOverlay, gradientOverlayColor),
                    replaceRgbaWithColor(colorValues.cardFooterOverlay, gradientOverlayColor),
                ];
            } else {
                return SKIN_OVERLAY_COLORS;
            }
        };

        const [contentOverlayBackground, footerOverlayBackground] = calcOverlayBackgrounds();

        return (
            <Container
                aria-label={isTouchable ? undefined : ariaLabelProp}
                aria-labelledby={isTouchable ? undefined : ariaLabeledByProp}
                aria-description={isTouchable ? undefined : ariaDescriptionProp}
                aria-describedby={isTouchable ? undefined : ariaDescribedByProp}
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
                {hasBackgroundImageOrVideo && (
                    <BackgroundImageOrVideo
                        video={video}
                        src={imageSrc}
                        srcSet={imageSrcSet}
                        backgroundVariant={backgroundVariant}
                    />
                )}

                {videoAction && (
                    // The video action is placed first in the card reading order, so it is placed outside the other topActions container
                    <div data-testid="videoAction">
                        <TopActions
                            testid="videoAction"
                            variant="media"
                            actions={[videoAction]}
                            containerStyles={{
                                position: 'absolute',
                                top: 16,
                                left:
                                    mediaPosition === 'left'
                                        ? typeof mediaWidth === 'number'
                                            ? `calc(${mediaWidth}px - 48px)`
                                            : `calc(${mediaWidth} - 48px)`
                                        : 'auto',
                                right:
                                    mediaPosition !== 'left'
                                        ? topActionsLengthWithoutVideo * 48 + 16
                                        : 'auto',
                            }}
                        />
                    </div>
                )}

                <BaseTouchable
                    maybe
                    aria-label={isTouchable ? ariaLabel : undefined}
                    aria-labelledby={isTouchable ? ariaLabeledByProp : undefined}
                    aria-description={isTouchable ? ariaDescriptionProp : undefined}
                    aria-describedby={isTouchable ? ariaDescribedByProp : undefined}
                    className={classnames(styles.touchable, styles.touchableContainer)}
                    {...touchableProps}
                    style={{
                        flexDirection:
                            mediaPosition === 'top'
                                ? 'column'
                                : mediaPosition === 'left'
                                  ? 'row'
                                  : 'row-reverse',
                        justifyItems: 'stretch',
                        borderTopLeftRadius: isNaked && !hasMedia ? 0 : `calc(${borderRadius} - 1px)`,
                        borderTopRightRadius: isNaked && !hasMedia ? 0 : `calc(${borderRadius} - 1px)`,
                        borderBottomLeftRadius:
                            shouldShowFooter || isNaked ? 0 : `calc(${borderRadius} - 1px)`,
                        borderBottomRightRadius:
                            shouldShowFooter || isNaked ? 0 : `calc(${borderRadius} - 1px)`,
                        overflow: 'hidden',
                        zIndex: 1, // this way the touchable focus ring is above the footer
                    }}
                >
                    {isTouchable && <div className={overlayStyle} />}
                    {hasDeprecatedMedia && (
                        <div
                            style={{
                                // for some reason, this width is required to pass headless screenshot tests
                                // otherwise, it gets 0px width and the media is not visible
                                width: '100%',
                                ...(type === 'naked'
                                    ? undefined
                                    : applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})),
                            }}
                        >
                            {media}
                        </div>
                    )}
                    {hasDeprecatedMedia && <Asset absolute size={size} asset={asset} type={type} />}

                    {hasMedia && (
                        <Media
                            type={type}
                            size={size}
                            mediaAspectRatio={mediaAspectRatio}
                            mediaPosition={mediaPosition}
                            asset={asset}
                            video={video}
                            imageFit={imageFit}
                            imageSrc={imageSrc}
                            imageSrcSet={imageSrcSet}
                            imageAlt={imageAlt}
                            mediaWidth={mediaWidth}
                            circledImage={circledImage}
                        />
                    )}
                    <div
                        aria-hidden={isTouchable}
                        data-testid="body"
                        className={classnames(styles.touchable, {
                            [styles.containerPaddingTopVariants[size]]:
                                !!asset && type !== 'naked' && (!hasMedia || mediaPosition === 'right'),
                        })}
                    >
                        {(!hasMedia || mediaPosition === 'right') && (
                            <Asset size={size} asset={asset} type={type} />
                        )}
                        {isAssetConfigA && (
                            <Filler
                                minHeight={type === 'cover' && topActionsLength > 0 && !asset ? 48 + 8 : 0}
                            />
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
                                height: isAssetConfigA ? undefined : '100%',
                                background: hasBackgroundImageOrVideo ? contentOverlayBackground : undefined,
                                // padding overrides for specific cases
                                paddingTop:
                                    isAssetConfigA && hasBackgroundImageOrVideo
                                        ? 40
                                        : asset
                                          ? 16
                                          : isNaked && mediaPosition !== 'top'
                                            ? 16
                                            : isNaked && !hasMedia
                                              ? 0
                                              : undefined,
                                paddingLeft:
                                    isNaked && (mediaPosition !== 'left' || !hasMedia) ? 0 : undefined,
                                paddingRight: isNaked && mediaPosition !== 'right' ? 16 : undefined,
                                paddingBottom: shouldShowFooter ? 16 : isNaked ? 0 : undefined,
                                borderBottomLeftRadius: shouldShowFooter ? 0 : borderRadius,
                                borderBottomRightRadius: shouldShowFooter ? 0 : borderRadius,
                            }}
                        >
                            <div className={styles.contentContainer}>
                                <div className={styles.textContent}>
                                    <TextContent
                                        type={type}
                                        hasCustomBackground={hasCustomBackground}
                                        headlineRef={headlineRef}
                                        variant={variant}
                                        size={size}
                                        headline={headline}
                                        pretitle={pretitle}
                                        pretitleAs={pretitleAs}
                                        pretitleLinesMax={pretitleLinesMax}
                                        title={title}
                                        titleAs={titleAs}
                                        titleLinesMax={titleLinesMax}
                                        subtitle={subtitle}
                                        subtitleLinesMax={subtitleLinesMax}
                                        description={description}
                                        descriptionLinesMax={descriptionLinesMax}
                                        withTextShadow={hasBackgroundImageOrVideo}
                                    />
                                </div>
                                {shouldAddContentSpacingForTopActions && (
                                    <div
                                        style={{
                                            flexShrink: 0,
                                            flexGrow: 0,
                                            width:
                                                topActionsLengthWithoutVideo * 48 -
                                                // required space depends on the card padding
                                                (type === 'naked' ? 0 : size === 'display' ? 24 : 16) -
                                                //
                                                8,
                                        }}
                                    />
                                )}
                            </div>
                            {!isAssetConfigA && slotAlignment === 'bottom' && <Filler />}
                            {slot && (
                                <div ref={slotRef} data-testid="slot">
                                    {slot}
                                </div>
                            )}
                            {!isAssetConfigA && slotAlignment === 'content' && showButtonsInBody && (
                                <Filler />
                            )}
                            {showButtonsInBody && (
                                <Buttons
                                    size={size}
                                    buttonPrimary={buttonPrimary}
                                    buttonSecondary={buttonSecondary}
                                    buttonLink={buttonLink}
                                />
                            )}
                        </div>
                    </div>
                </BaseTouchable>
                {shouldShowFooter && (
                    <Footer
                        type={type}
                        variant={variant}
                        footerVariant={footerVariant}
                        footerBackgroundColor={footerBackgroundColor}
                        size={size}
                        footerSlot={footerSlot}
                        buttonPrimary={buttonPrimary}
                        buttonSecondary={buttonSecondary}
                        buttonLink={buttonLink}
                        hasBackgroundImageOrVideo={hasBackgroundImageOrVideo}
                        isInverseOutside={isInverseOutside}
                        overlayColor={footerOverlayBackground}
                    />
                )}
                <TopActions
                    onClose={onClose}
                    closeButtonLabel={closeButtonLabel}
                    actions={topActions}
                    variant={
                        hasBackgroundImageOrVideo || (hasMedia && mediaPosition !== 'left')
                            ? 'media'
                            : variant
                    }
                />
            </Container>
        );
    }
);
