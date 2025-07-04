// spec: https://www.figma.com/design/tKdPOfcUALzVIh5oizFbm7
'use client';
import * as React from 'react';
import * as styles from './internal-card.css';
import * as mediaStyles from './image.css';
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
import {AspectRatioContainer, aspectRatioToNumber} from './utils/aspect-ratio-support';
import classnames from 'classnames';
import {vars as skinVars} from './skins/skin-contract.css';
import Stack from './stack';
import Inline from './inline';
import {IconButton, ToggleIconButton} from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import Image from './image';
import Video from './video';
import * as tokens from './text-tokens';
import {isRunningAcceptanceTest} from './utils/platform';
import {combineRefs} from './utils/common';
import IconPauseFilled from './generated/mistica-icons/icon-pause-filled';
import IconPlayFilled from './generated/mistica-icons/icon-play-filled';
import Spinner from './spinner';

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

const DEBUG = 0;

const dbg = (value: any) => (DEBUG ? value : undefined);

type CardType = 'data' | 'media' | 'cover' | 'naked';
type CardSize = 'snap' | 'default' | 'display';
type Media = RendersElement<typeof Image> | RendersElement<typeof Video>;

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
    aspectRatio?: CardAspectRatio;
    dataAttributes?: DataAttributes;
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-description'?: string; // W3C Editor's Draft for ARIA 1.3
    'aria-describedby'?: React.AriaAttributes['aria-describedby'];
    onClose?: () => void;
    closeButtonLabel?: string;
    showFooter?: boolean;
    children?: React.ReactNode;
};

type MediaProps = {
    /** @deprecated use imageSrc, imageSrcSet, videoSrc and related props */
    media?: Media;
    backgroundColor?: string;
    imageSrc?: string;
    imageSrcSet?: string;
    videoSrc?: VideoSource;
    videoRef?: React.RefObject<VideoElement>;
    mediaAspectRatio?: MediaAspectRatio;
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
    MediaProps &
    TextContentProps &
    AssetProps &
    ActionsProps &
    TopActionsProps &
    SlotProps &
    FooterProps;

type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

type PrivateContainerProps = {
    children?: React.ReactNode;
};

const Container = React.forwardRef<HTMLDivElement, PrivateContainerProps & ContainerProps & MediaProps>(
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

type BackgroundImageOrVideoProps = {
    video?: React.ReactNode;
    src?: string;
    srcSet?: string;
};

const BackgroundImageOrVideo = ({video, src, srcSet}: BackgroundImageOrVideoProps): JSX.Element => {
    // @TODO: move to prop?
    const isExternalInverse = useIsInverseVariant();
    return (
        <ThemeVariant
            // this avoids color flickering while loading the image
            variant={isExternalInverse ? 'inverse' : 'default'}
        >
            <div
                className={styles.backgroundImageOrVideoContainer}
                // remove video border radius
                style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}
            >
                {video ? (
                    video
                ) : (
                    <Image width="100%" height="100%" src={src || ''} srcSet={srcSet} noBorderRadius />
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
    videoRef?: React.RefObject<VideoElement>
): {
    video?: React.ReactNode;
    videoAction?: CardAction;
} => {
    const {texts, t} = useTheme();
    const videoController = React.useRef<VideoElement>(null);
    const [videoStatus, dispatch] = React.useReducer(videoReducer, 'loading');

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
                height="100%"
                onError={() => dispatch('fail')}
                onPause={() => dispatch('pause')}
                onPlay={() => dispatch('play')}
            />
        ) : undefined;
    }, [videoRef, videoSrc, poster]);

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
              disabled: videoStatus === 'loadingTimeout',
              checked: videoStatus === 'paused',
          }
        : undefined;

    return {
        video,
        videoAction,
    };
};

type MediaComponentProps = {
    imageSrc?: string;
    imageSrcSet?: string;
    video?: React.ReactNode;
};

const Media = ({imageSrc, imageSrcSet, video}: MediaComponentProps): JSX.Element => {
    if (video) {
        return <>{video}</>;
    }
    if (imageSrc !== undefined || imageSrcSet !== undefined) {
        return <Image src={imageSrc || ''} srcSet={imageSrcSet} width="100%" height="100%" noBorderRadius />;
    }
    return <></>;
};

type FooterProps = {
    size: CardSize;
    variant?: Variant;
    footerSlot?: React.ReactNode;
    hasBackgroundImage?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: Variant;
};

const Footer = ({
    size,
    variant,
    footerSlot,
    primaryAction,
    secondaryAction,
    hasBackgroundImage,
    footerVariant,
    footerBackgroundColor,
}: FooterProps & ActionsProps): JSX.Element => {
    const hasActions = !!(primaryAction || secondaryAction);
    const isInverse = variant === 'inverse' || variant === 'media';
    return (
        <ThemeVariant variant={footerVariant || variant}>
            <Filler />
            <div
                data-testid="footer"
                className={styles.containerPaddingXVariants[size]}
                style={{
                    paddingTop: 16,
                    paddingBottom: 16,

                    borderTop: footerBackgroundColor
                        ? undefined
                        : `1px solid ${isInverse ? skinVars.colors.dividerInverse : skinVars.colors.divider}`,
                    position: 'relative',
                    // @FIXME: the color should be the color token "cardFooterOverlay"
                    background:
                        footerBackgroundColor || (hasBackgroundImage ? 'rgba(0, 0, 0, 0.7)' : undefined),
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
        </ThemeVariant>
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
    videoAction?: CardAction;
};

const TopActions = ({
    onClose,
    closeButtonLabel,
    topActions,
    videoAction,
    variant,
}: TopActionsProps): JSX.Element => {
    const {texts, t} = useTheme();
    const actions = topActions ? [...topActions] : [];

    if (videoAction) {
        actions.unshift(videoAction);
    }

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
            imageSrc,
            imageSrcSet,
            videoSrc,
            videoRef,
            media,
            mediaAspectRatio = 'auto',
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
            showFooter: showFooterProp,
            footerBackgroundColor,
            footerVariant,
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
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const hasActions = !!(primaryAction || secondaryAction);
        const hasAssetOrHeadline = !!(asset || headline);

        // We consider any string (including empty string) as an image/video source
        const hasBackgroundImage = type === 'cover' && (imageSrc !== undefined || imageSrcSet !== undefined);
        const hasBackgroundVideo = type === 'cover' && videoSrc !== undefined;
        const hasCustomBackground = !!(backgroundColorProp || hasBackgroundImage || hasBackgroundVideo);
        const hasBackgroundImageOrVideo = hasBackgroundImage || hasBackgroundVideo;

        // In this context "media" refers to the image or video that is placed inside the card, not the background
        const hasMediaImage = type === 'media' && (imageSrc !== undefined || imageSrcSet !== undefined);
        const hasMediaVideo = type === 'media' && videoSrc !== undefined;
        const hasDeprecatedMedia = type === 'media' && !!media;
        const hasMediaSources = hasMediaImage || hasMediaVideo;
        const hasMedia = hasMediaSources || hasDeprecatedMedia;

        const shouldShowVideo = hasMediaVideo || hasBackgroundVideo;

        const {video, videoAction} = useVideoWithControls(
            shouldShowVideo ? videoSrc : undefined,
            imageSrc,
            videoRef
        );

        const isInverseOutside = useIsInverseOrMediaVariant();
        const isExternalInverse = useIsInverseVariant();
        const variant = variantProp || (type === 'cover' && hasCustomBackground ? 'media' : undefined);
        const isInverseStyle = variant ? variant === 'inverse' || variant === 'media' : isInverseOutside;
        const overlayStyle = isInverseStyle
            ? styles.touchableCardOverlayInverse
            : styles.touchableCardOverlay;

        // If the card has actions and an onClose handler, the footer will always be shown
        // If the footer has no content, it will not be shown
        const shouldShowFooter =
            (showFooterProp && (hasActions || !!footerSlot)) || (hasActions && touchableProps.onPress);

        const showActionsInBody = !shouldShowFooter && hasActions;
        const topActionsLength = (topActions?.length || 0) + (onClose ? 1 : 0) + (videoAction ? 1 : 0);

        // @TODO: REVIEW THIS
        const backgroundColor =
            hasBackgroundImage || hasBackgroundVideo
                ? 'transparent'
                : backgroundColorProp ||
                  (variant === 'alternative'
                      ? skinVars.colors.backgroundAlternative
                      : variant === 'media'
                        ? isExternalInverse
                            ? skinVars.colors.backgroundContainerBrandOverInverse
                            : skinVars.colors.backgroundBrand
                        : undefined);

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
                {hasBackgroundImageOrVideo && (
                    <BackgroundImageOrVideo video={video} src={imageSrc} srcSet={imageSrcSet} />
                )}
                <TopActions
                    onClose={onClose}
                    closeButtonLabel={closeButtonLabel}
                    topActions={topActions}
                    videoAction={videoAction}
                    variant={hasMedia ? 'media' : variant}
                />

                <BaseTouchable
                    maybe
                    className={classnames(styles.touchable, styles.touchableContainer)}
                    {...touchableProps}
                >
                    {isTouchable && <div className={overlayStyle} />}
                    {hasDeprecatedMedia && (
                        <div style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}>{media}</div>
                    )}
                    {hasMediaSources && (
                        // using AspectRatioContainer because the <video> element flashes with the poster image size while loading
                        <AspectRatioContainer
                            aspectRatio={aspectRatioToNumber(mediaAspectRatio)}
                            style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}
                        >
                            <Media video={video} imageSrc={imageSrc} imageSrcSet={imageSrcSet} />
                        </AspectRatioContainer>
                    )}
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
                                background: hasBackgroundImageOrVideo
                                    ? skinVars.colors.cardContentOverlay
                                    : undefined,
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
                                        withTextShadow={hasBackgroundImageOrVideo}
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
                        variant={variant}
                        footerVariant={footerVariant}
                        footerBackgroundColor={footerBackgroundColor}
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
    aspectRatio?: CardAspectRatio;
    /** @deprecated use primaryAction */
    button?: ActionButton;
    /** @deprecated use secondaryAction */
    buttonLink?: ActionButton;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    /** @deprecated use topActions */
    actions?: TopActionsArray;
    topActions?: TopActionsArray;
    footerBackgroundColor?: string;
    footerVariant?: Variant;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
    children?: undefined;
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
                dataAttributes={{'component-name': 'DataCard', testid: 'DataCard', ...dataAttributes}}
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
                dataAttributes={{'component-name': 'SnapCard', testid: 'SnapCard', ...dataAttributes}}
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
    aspectRatio?: CardAspectRatio;
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    topActions?: ReadonlyArray<CardAction | React.ReactElement>;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    onClose?: () => unknown;
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
    children?: undefined;
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
    aspectRatio?: CardAspectRatio;
    width?: number | string;
    height?: number | string;
    asset?: React.ReactElement;
    /** @deprecated use topActions */
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    topActions?: ReadonlyArray<CardAction | React.ReactElement>;
    onClose?: () => unknown;
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
    children?: undefined;
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
>(({isInverse, variant, actions, topActions, extra, slot, backgroundImage, dataAttributes, ...rest}, ref) => {
    const imageProps = {
        imageSrc: typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.src,
        imageSrcSet: typeof backgroundImage === 'string' ? undefined : backgroundImage?.srcSet,
    } as BackgroundImageOrVideoProps;
    return (
        <CoverCard
            ref={ref}
            size="default"
            variant={variant || (isInverse ? 'inverse' : undefined)}
            dataAttributes={{'component-name': 'PosterCard', testid: 'PosterCard', ...dataAttributes}}
            topActions={topActions || actions}
            slot={slot || extra}
            {...imageProps}
            {...rest}
        />
    );
});

interface MediaCardProps {
    size?: CardSize;
    /** @deprecated use imageSrc, imageSrcSet, videoSrc and related props */
    media: Media;
    imageSrc?: string;
    imageSrcSet?: string;
    videoSrc?: VideoSource;
    /** @deprecated use imageSrc */
    poster?: string;
    variant?: Variant;
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
    /** @deprecated use slot */
    extra?: React.ReactNode;
    slot?: React.ReactNode;
    /** @deprecated use topActions */
    actions?: TopActionsArray;
    topActions?: TopActionsArray;
    /** @deprecated use primaryAction */
    button?: ActionButton;
    /** @deprecated use secondaryAction */
    buttonLink?: ActionButton;
    primaryAction?: ActionButton;
    secondaryAction?: ActionButton;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    onClose?: () => unknown;
    closeButtonLabel?: string;
    footerBackgroundColor?: string;
    footerVariant?: Variant;
    showFooter?: boolean;
    footerSlot?: React.ReactNode;
    children?: undefined;
}

export const MediaCard = React.forwardRef<HTMLDivElement, MaybeTouchableCard<MediaCardProps>>(
    (
        {
            size = 'default',
            slot,
            extra,
            topActions,
            actions,
            button,
            buttonLink,
            variant,
            primaryAction,
            secondaryAction,
            dataAttributes,
            ...rest
        },
        ref
    ) => {
        return (
            <InternalCard
                dataAttributes={{'component-name': 'MediaCard', testid: 'MediaCard'}}
                type="media"
                variant={variant}
                size={size}
                slot={slot || extra}
                topActions={topActions || actions}
                primaryAction={primaryAction || button}
                secondaryAction={secondaryAction || buttonLink}
                ref={ref}
                {...rest}
            />
        );
    }
);
