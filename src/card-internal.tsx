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

const DEBUG = 0;
const dbg = (value: any) => (DEBUG ? value : undefined);

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
    media?: DeprecatedMediaProp;
    backgroundColor?: string;
    imageSrc?: string;
    imageSrcSet?: string;
    imageAlt?: string;
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
};

type AssetProps = {
    size: CardSize;
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
export type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

type PrivateContainerProps = {
    children?: React.ReactNode;
};

const Container = React.forwardRef<HTMLDivElement, PrivateContainerProps & ContainerProps & MediaProps>(
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
                    border: dbg('1px solid lime'),
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
                        background={type === 'naked' ? 'transparent' : backgroundColor}
                        borderRadius={type === 'naked' ? '0px' : skinVars.borderRadii.container}
                        border={type === 'naked' ? 'none' : boxedBorderStyleOverride}
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

type PrivateAssetProps = {
    type: CardType;
    absolute?: boolean;
};

const Asset = ({size, absolute, asset, type}: AssetProps & PrivateAssetProps): JSX.Element | null => {
    if (!asset) {
        return null;
    }

    if (absolute) {
        return (
            <div
                style={{position: 'absolute', top: 0, left: 0}}
                className={classnames(
                    styles.containerPaddingXVariants[size],
                    styles.containerPaddingTopVariants[size]
                )}
            >
                <div data-testid="asset">{asset}</div>
            </div>
        );
    }

    return (
        <div className={classnames({[styles.containerPaddingXVariants[size]]: type !== 'naked'})}>
            <div data-testid="asset">{asset}</div>
        </div>
    );
};

export type BackgroundImageOrVideoProps = {
    video?: React.ReactNode;
    variant?: Variant;
    src?: string;
    srcSet?: string;
    imageAlt?: string;
};

const BackgroundImageOrVideo = ({
    video,
    src,
    srcSet,
    imageAlt,
    variant,
}: BackgroundImageOrVideoProps): JSX.Element => {
    return (
        <ThemeVariant variant={variant}>
            <div
                className={styles.backgroundImageOrVideoContainer}
                // remove video border radius
                style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}
            >
                {video ? (
                    video
                ) : (
                    <Image width="100%" height="100%" src={src || ''} srcSet={srcSet} alt={imageAlt} />
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
              disabled: videoStatus === 'loadingTimeout',
              checked: videoStatus === 'paused',
          }
        : undefined;

    return {
        video,
        videoAction,
    };
};

type ActionsProps = {
    size: CardSize;
    buttonPrimary?: CardActionButtonPrimary;
    buttonSecondary?: CardActionButtonSecondary;
    buttonLink?: CardActionButtonLink;
};

const Actions = ({size, buttonPrimary, buttonSecondary, buttonLink}: ActionsProps): JSX.Element => {
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

type TopActionsProps = {
    size?: CardSize;
    variant?: Variant;
    onClose?: () => void;
    closeButtonLabel?: string;
    topActions?: TopActionsArray;
    videoAction?: CardAction;
    containerStyles?: React.CSSProperties;
};

export const TopActions = ({
    onClose,
    closeButtonLabel,
    topActions,
    videoAction,
    variant,
    containerStyles = {},
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
            <div className={styles.topActionsContainer} style={containerStyles}>
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

    const mediaElement = video ? (
        video
    ) : imageSrc !== undefined || imageSrcSet !== undefined ? (
        <Image src={imageSrc || ''} srcSet={imageSrcSet} {...imageProps} />
    ) : null;

    if (!mediaElement) {
        return <></>;
    }

    const commonContainerStyles = {
        border: dbg('2px solid green'),
        // overrides media border radius
        ...(type === 'naked' ? undefined : applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})),
    };

    if (mediaPosition === 'top') {
        // using AspectRatioContainer because the <video> element flashes with the poster image size while loading
        return (
            <AspectRatioContainer aspectRatio={aspectRatioAsNumber} style={commonContainerStyles}>
                {mediaElement}
                <Asset absolute size={size} asset={asset} type={type} />
            </AspectRatioContainer>
        );
    }

    // in left/right media position, mediaAspectRatio is ignored
    return (
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
            {mediaPosition !== 'right' && <Asset absolute size={size} asset={asset} type={type} />}
        </div>
    );
};

type FooterProps = {
    type: CardType;
    size: CardSize;
    variant?: Variant;
    footerSlot?: React.ReactNode;
    hasBackgroundImageOrVideo?: boolean;
    footerBackgroundColor?: string;
    footerVariant?: Variant;
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
}: FooterProps & ActionsProps): JSX.Element => {
    const hasButtons = !!(buttonPrimary || buttonSecondary || buttonLink);
    const isInverse = variant === 'inverse' || variant === 'media';
    const noPadding = type === 'naked';

    return (
        <ThemeVariant variant={footerVariant || variant}>
            <Filler />
            <div
                // The divider is outside the footer because it has a conditional margin
                // @TODO use Divider component here?
                style={{
                    borderTop: footerBackgroundColor
                        ? undefined
                        : `1px solid ${isInverse ? skinVars.colors.dividerInverse : skinVars.colors.divider}`,
                    marginRight: noPadding ? 16 : 0,
                    backdropFilter: hasBackgroundImageOrVideo ? 'blur(12px)' : undefined,
                }}
            />
            <div
                data-testid="footer"
                className={classnames({[styles.containerPaddingXVariants[size]]: !noPadding})}
                style={{
                    paddingTop: 16,
                    paddingBottom: noPadding ? 0 : 16,
                    paddingRight: noPadding ? 16 : undefined,

                    position: 'relative',
                    // @FIXME: the color should be the color token "cardFooterOverlay"
                    background:
                        footerBackgroundColor ||
                        (hasBackgroundImageOrVideo ? 'rgba(0, 0, 0, 0.7)' : undefined),
                    backdropFilter: hasBackgroundImageOrVideo ? 'blur(12px)' : undefined,
                }}
            >
                <Stack space={16}>
                    {footerSlot}
                    {hasButtons && (
                        // @FIXME if the secondary action is a link, it should bleed right
                        // perhaps we could create styles to override button styles (small, bleed)
                        // see spec related to button group alignment
                        // https://www.figma.com/design/koROdh3HpEPG2O8jG52Emh/%F0%9F%94%B8-Buttons-Specs?node-id=4337-1606&t=HtImvar8DMbivDqC-0
                        <Inline space="between" alignItems="center">
                            {buttonPrimary}
                            {buttonSecondary}
                        </Inline>
                    )}
                </Stack>
            </div>
        </ThemeVariant>
    );
};

type PrivateTextContentProps = {
    withTextShadow?: boolean;
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
    const textShadowStyle = withTextShadow ? '0 0 15px rgba(0, 0, 0, 0.4)' : undefined;

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
            imageAlt = '',
            videoSrc,
            videoRef,
            media,
            mediaAspectRatio = 'auto',
            mediaPosition: mediaPositionProp = 'top',
            mediaWidth = 150,
            circledImage,
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
            ...touchableProps
        },
        ref
    ): JSX.Element => {
        // @TODO: A11Y
        const {/* text: slotText, */ ref: slotRef} = useInnerText();
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const hasButtons = !!(buttonPrimary || buttonSecondary || buttonLink);

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

        const isExternalInverse = useIsInverseVariant();
        const externalInverseOrDefault = isExternalInverse ? 'inverse' : 'default';
        // @TODO review
        const variant =
            variantProp ||
            (backgroundColorProp
                ? externalInverseOrDefault
                : type === 'cover' && hasCustomBackground
                  ? 'media'
                  : externalInverseOrDefault);

        const isInverseStyle = variant ? variant === 'inverse' || variant === 'media' : isExternalInverse;
        const overlayStyle = isInverseStyle
            ? styles.touchableCardOverlayInverse
            : styles.touchableCardOverlay;

        // If the card has actions and an onClose handler, the footer will always be shown
        // If the footer has no content, it will not be shown
        const shouldShowFooter =
            (showFooterProp && (hasButtons || !!footerSlot)) || (hasButtons && touchableProps.onPress);

        const showVideoActionInContentContainer = hasMedia && videoAction && mediaPosition !== 'left';
        const showVideoActionInMediaContainer = hasMedia && videoAction && mediaPosition === 'left';
        const videoActionInMediaContainerLeftPosition = Number.isFinite(mediaWidth)
            ? `calc(${mediaWidth}px - 48px)`
            : `calc(${mediaWidth} - 48px)`;

        const showActionsInBody = !shouldShowFooter && hasButtons;
        const topActionsLengthInContent =
            (topActions?.length || 0) + (onClose ? 1 : 0) + (showVideoActionInContentContainer ? 1 : 0);

        const hasAssetInContent = asset && !(hasMedia && mediaPosition === 'left');
        const shouldAddContentSpacingForTopActions =
            type !== 'cover' && topActionsLengthInContent > 0 && !hasAssetInContent && !headline;

        // see asset spacing config in spec
        const isAssetConfigA = type === 'cover' || (type === 'data' && size === 'display');

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
                    <BackgroundImageOrVideo
                        video={video}
                        src={imageSrc}
                        srcSet={imageSrcSet}
                        imageAlt={imageAlt}
                        variant={variant}
                    />
                )}
                <TopActions
                    onClose={onClose}
                    closeButtonLabel={closeButtonLabel}
                    topActions={topActions}
                    videoAction={showVideoActionInContentContainer ? videoAction : undefined}
                    variant={hasMedia ? 'media' : variant}
                />
                <TopActions
                    videoAction={showVideoActionInMediaContainer ? videoAction : undefined}
                    variant="media"
                    containerStyles={{left: videoActionInMediaContainerLeftPosition, right: 'unset'}}
                />

                <BaseTouchable
                    maybe
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
                        border: dbg('3px solid #f0f'),
                    }}
                >
                    {isTouchable && <div className={overlayStyle} />}
                    {hasDeprecatedMedia && (
                        <div
                            style={
                                type === 'naked'
                                    ? undefined
                                    : applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})
                            }
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
                            imageSrc={imageSrc}
                            imageSrcSet={imageSrcSet}
                            mediaWidth={mediaWidth}
                            circledImage={circledImage}
                        />
                    )}
                    <div
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
                                minHeight={type === 'cover' && topActionsLengthInContent && !asset ? 48 : 0}
                            />
                        )}
                        <div
                            className={classnames(
                                styles.containerPaddingXVariants[size],
                                styles.containerPaddingBottomVariants[size],
                                styles.containerPaddingTopVariants[size]
                            )}
                            style={{
                                border: dbg('1px solid blue'),
                                display: 'flex',
                                flexDirection: 'column',
                                height: isAssetConfigA ? undefined : '100%',
                                background: hasBackgroundImageOrVideo
                                    ? skinVars.colors.cardContentOverlay
                                    : undefined,
                                // padding overrides for specific cases
                                paddingTop: isAssetConfigA ? 40 : asset ? 16 : isNaked ? 0 : undefined,
                                paddingLeft:
                                    isNaked && (mediaPosition !== 'left' || !hasMedia) ? 0 : undefined,
                                paddingRight: isNaked && mediaPosition !== 'right' ? 16 : undefined,
                                paddingBottom: shouldShowFooter ? 16 : isNaked ? 0 : undefined,
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
                                {shouldAddContentSpacingForTopActions && (
                                    <div
                                        style={{
                                            flexShrink: 0,
                                            flexGrow: 0,
                                            width:
                                                topActionsLengthInContent * 48 -
                                                // required space depends on the card padding
                                                (type === 'naked' ? 0 : size === 'display' ? 24 : 16) -
                                                //
                                                8,
                                            background: dbg('#fee'),
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
                            {!isAssetConfigA && slotAlignment === 'content' && showActionsInBody && (
                                <Filler />
                            )}
                            {showActionsInBody && (
                                <Actions
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
                        hasBackgroundImageOrVideo={hasBackgroundImageOrVideo}
                    />
                )}
            </Container>
        );
    }
);
