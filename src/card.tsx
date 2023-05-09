import * as React from 'react';
import Tag from './tag';
import Stack from './stack';
import Box from './box';
import {Text2, Text, Text6, Text3} from './text';
import {Boxed, InternalBoxed} from './boxed';
import ButtonGroup from './button-group';
import Image, {MediaBorderRadiusProvider} from './image';
import {BaseTouchable} from './touchable';
import {vars} from './skins/skin-contract.css';
import * as styles from './card.css';
import {useTheme} from './hooks';
import {sprinkles} from './sprinkles.css';
import Inline from './inline';
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconPauseFilled from './generated/mistica-icons/icon-pause-filled';
import IconPlayFilled from './generated/mistica-icons/icon-play-filled';
import {combineRefs} from './utils/common';
import Spinner from './spinner';
import Video from './video';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';

import type {VideoSource} from './video';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {ExclusifyUnion} from './utils/utility-types';
import type {
    DataAttributes,
    IconProps,
    RendersElement,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';

type CardAction = {
    label: string;
    onPress: () => void;
    Icon?: React.FC<IconProps>;
    iconSize?: number;
    iconColor?: string;
    iconBackground?: string;
    iconBackgroundInverse?: string;
};

type CardActionsGroupProps = {
    actions: Array<CardAction>;
    isInverse?: boolean;
};

const CardActionsGroup = ({actions, isInverse}: CardActionsGroupProps): JSX.Element => {
    return (
        <Inline space={0}>
            {actions.map(
                (
                    {
                        onPress,
                        label,
                        Icon,
                        iconSize = 20,
                        iconColor = vars.colors.neutralHigh,
                        iconBackground = styles.cardAction,
                        iconBackgroundInverse = styles.cardActionInverse,
                    },
                    index
                ) =>
                    Icon ? (
                        <IconButton
                            size={48}
                            key={index}
                            onPress={onPress}
                            aria-label={label}
                            className={styles.cardActionIconButton}
                            style={{display: 'flex'}}
                        >
                            <div className={isInverse ? iconBackgroundInverse : iconBackground}>
                                <Icon color={iconColor} size={iconSize} />
                            </div>
                        </IconButton>
                    ) : (
                        <div key={index} className={styles.cardActionIconButton} />
                    )
            )}
        </Inline>
    );
};

const useTopActions = (actions?: Array<CardAction>, onClose?: () => void) => {
    const {texts} = useTheme();
    const finalActions = actions ? [...actions] : [];

    if (onClose) {
        finalActions.push({
            label: texts.closeButtonLabel,
            onPress: onClose,
            Icon: IconCloseRegular,
        });
    }

    return finalActions;
};

type AspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto';

const CSS_ASPECT_RATIO = {
    '1:1': '1',
    '16:9': '16 / 9',
    '7:10': '7 / 10',
    '9:10': '9 / 10',
    auto: 'auto',
} as const;

type MaybeWithActionsProps = {
    children: React.ReactNode;
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    aspectRatio?: AspectRatio | number;
    actions?: Array<CardAction>;
    onClose?: () => void;
    isInverse?: boolean;
    'aria-label'?: string;
};

const MaybeWithActions = ({
    children,
    width = '100%',
    height = '100%',
    minWidth,
    minHeight,
    aspectRatio,
    actions,
    onClose,
    isInverse,
    'aria-label': ariaLabel,
}: MaybeWithActionsProps): JSX.Element => {
    const finalActions = useTopActions(actions, onClose);
    const hasActions = finalActions.length > 0;

    const cssAspectRatio: React.CSSProperties['aspectRatio'] = aspectRatio
        ? typeof aspectRatio === 'number'
            ? String(aspectRatio)
            : CSS_ASPECT_RATIO[aspectRatio]
        : undefined;

    return (
        <section
            aria-label={ariaLabel}
            style={{
                width,
                height,
                minWidth,
                minHeight,
                aspectRatio: cssAspectRatio,
                position: 'relative',
            }}
        >
            {children}
            {hasActions && (
                <div
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex: 2, // needed because images has zIndex 1, otherwise this component won't be shown
                    }}
                >
                    <CardActionsGroup actions={finalActions} isInverse={isInverse} />
                </div>
            )}
        </section>
    );
};

const renderBackgroundImage = (src?: string) => {
    // Adding '//:0' to force an error in case src is undefined
    // https://stackoverflow.com/a/5775621
    return <Image width="100%" height="100%" src={src ?? '//:0'} />;
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
    },

    paused: {
        play: 'playing',
        reset: 'loading',
    },

    error: {
        reset: 'loading',
    },
};

const videoReducer = (state: VideoState, action: VideoAction): VideoState =>
    transitions[state][action] || state;

const getVideoActionIcon = (state: VideoState) => {
    switch (state) {
        case 'playing':
            return IconPauseFilled;
        case 'paused':
        case 'loading':
            return IconPlayFilled;
        case 'loadingTimeout':
            return Spinner;
        default:
            return undefined;
    }
};

const useVideoWithControls = (
    videoSrc?: VideoSource,
    poster?: string,
    videoRef?: React.RefObject<HTMLVideoElement>
) => {
    const videoController = React.useRef<HTMLVideoElement>(null);
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
        return videoSrc ? (
            <Video
                ref={combineRefs(videoController, videoRef)}
                src={videoSrc}
                width="100%"
                height="100%"
                poster={poster}
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

    return {
        video,
        videoStatus,
        onVideoControlPress,
    };
};

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    pretitleLinesMax,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    extra,
    button,
    buttonLink,
}) => {
    const {textPresets} = useTheme();
    const renderHeadline = () => {
        if (!headline) {
            return null;
        }
        if (typeof headline === 'string') {
            return <Tag type="promo">{headline}</Tag>;
        }
        return headline;
    };
    return (
        <div
            className={sprinkles({
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
            })}
        >
            <div>
                <Stack space={8}>
                    {(headline || pretitle || title || subtitle) && (
                        <header>
                            <Stack space={8}>
                                {renderHeadline()}
                                <Stack space={4}>
                                    {pretitle && (
                                        <Text2 truncate={pretitleLinesMax} as="div" regular hyphens="auto">
                                            {pretitle}
                                        </Text2>
                                    )}
                                    <Text
                                        mobileSize={18}
                                        mobileLineHeight="24px"
                                        desktopSize={20}
                                        desktopLineHeight="28px"
                                        truncate={titleLinesMax}
                                        weight={textPresets.cardTitle.weight}
                                        as="h3"
                                        hyphens="auto"
                                    >
                                        {title}
                                    </Text>
                                    <Text2 truncate={subtitleLinesMax} as="div" regular hyphens="auto">
                                        {subtitle}
                                    </Text2>
                                </Stack>
                            </Stack>
                        </header>
                    )}

                    {description && (
                        <Text2
                            truncate={descriptionLinesMax}
                            as="p"
                            regular
                            color={vars.colors.textSecondary}
                            hyphens="auto"
                        >
                            {description}
                        </Text2>
                    )}
                </Stack>

                {extra && <div>{extra}</div>}
            </div>

            {(button || buttonLink) && (
                <div className={styles.actions}>
                    <ButtonGroup primaryButton={button} link={buttonLink} />
                </div>
            )}
        </div>
    );
};

type MediaCardProps = {
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    actions?: Array<CardAction>;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    onClose?: () => void;
};

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
    (
        {
            media,
            headline,
            pretitle,
            pretitleLinesMax,
            subtitle,
            subtitleLinesMax,
            title,
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            actions,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        return (
            <MaybeWithActions onClose={onClose} actions={actions} aria-label={ariaLabel} isInverse>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'MediaCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.mediaCard}>
                        <MediaBorderRadiusProvider value={false}>{media}</MediaBorderRadiusProvider>
                        <div className={styles.mediaCardContent}>
                            <CardContent
                                headline={headline}
                                pretitle={pretitle}
                                pretitleLinesMax={pretitleLinesMax}
                                title={title}
                                titleLinesMax={titleLinesMax}
                                subtitle={subtitle}
                                subtitleLinesMax={subtitleLinesMax}
                                description={description}
                                descriptionLinesMax={descriptionLinesMax}
                                extra={extra}
                                button={button}
                                buttonLink={buttonLink}
                            />
                        </div>
                    </div>
                </Boxed>
            </MaybeWithActions>
        );
    }
);

interface DataCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    actions?: Array<CardAction>;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    onClose?: () => void;
}

export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
    (
        {
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            actions,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        const finalActions = useTopActions(actions, onClose);
        const hasActions = finalActions.length > 0;
        const hasIcon = !!icon;

        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;
        const topActionsStylesWithoutIcon = {marginRight: -8, marginTop: -16} as const;

        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.dataCard}>
                        <div
                            className={sprinkles({
                                display: 'flex',
                            })}
                        >
                            <Stack space={16} className={sprinkles({flex: 1})}>
                                {hasIcon ? icon : null}
                                <CardContent
                                    headline={headline}
                                    pretitle={pretitle}
                                    pretitleLinesMax={pretitleLinesMax}
                                    title={title}
                                    titleLinesMax={titleLinesMax}
                                    subtitle={subtitle}
                                    subtitleLinesMax={subtitleLinesMax}
                                    description={description}
                                    descriptionLinesMax={descriptionLinesMax}
                                />
                            </Stack>
                            {hasActions && (
                                <div style={hasIcon ? topActionsStylesWithIcon : topActionsStylesWithoutIcon}>
                                    <CardActionsGroup actions={finalActions} />
                                </div>
                            )}
                        </div>

                        {extra && <div>{extra}</div>}

                        {(button || buttonLink) && (
                            <div className={styles.actions}>
                                <ButtonGroup primaryButton={button} link={buttonLink} />
                            </div>
                        )}
                    </div>
                </Boxed>
            </section>
        );
    }
);

interface SnapCardBaseProps {
    icon?: React.ReactElement;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    extra?: React.ReactNode;
    isInverse?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    children?: void;
}

interface SnapCardToProps extends SnapCardBaseProps {
    to?: string;
    fullPageOnWebView?: boolean;
    href?: undefined;
    onPress?: undefined;
}

interface SnapCardHrefProps extends SnapCardBaseProps {
    href?: string;
    newTab?: boolean;
    onPress?: undefined;
    to?: undefined;
}

interface SnapCardOnPressProps extends SnapCardBaseProps {
    onPress?: () => void;
    href?: undefined;
    to?: undefined;
}

type SnapCardProps = SnapCardToProps | SnapCardHrefProps | SnapCardOnPressProps;

export const SnapCard = React.forwardRef<HTMLDivElement, SnapCardProps>(
    (
        {
            icon,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            dataAttributes,
            'aria-label': ariaLabel,
            extra,
            isInverse = false,
            ...touchableProps
        },
        ref
    ) => {
        const {isDarkMode} = useTheme();
        const isTouchable = Boolean(touchableProps.to || touchableProps.href || touchableProps.onPress);

        return (
            <Boxed
                className={styles.boxed}
                dataAttributes={{'component-name': 'SnapCard', ...dataAttributes}}
                ref={ref}
                isInverse={isInverse}
                width="100%"
                height="100%"
            >
                <BaseTouchable
                    maybe
                    {...touchableProps}
                    className={
                        // @todo: define hover background color for inverse and for dark mode
                        isTouchable && !isInverse && !isDarkMode
                            ? styles.snapCardTouchableHover
                            : styles.snapCardTouchableHoverTransparent
                    }
                    aria-label={ariaLabel}
                >
                    <section className={styles.snapCard}>
                        <div>
                            {icon && <Box paddingBottom={16}>{icon}</Box>}
                            <Stack space={4}>
                                {title && (
                                    <Text2 truncate={titleLinesMax} as="h3" regular hyphens="auto">
                                        {title}
                                    </Text2>
                                )}
                                {subtitle && (
                                    <Text2
                                        truncate={subtitleLinesMax}
                                        regular
                                        color={vars.colors.textSecondary}
                                        as="p"
                                        hyphens="auto"
                                    >
                                        {subtitle}
                                    </Text2>
                                )}
                            </Stack>
                        </div>
                        {extra && <div>{extra}</div>}
                    </section>
                </BaseTouchable>
            </Boxed>
        );
    }
);

interface CommonDisplayCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    actions?: Array<CardAction>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    headline?: React.ReactComponentElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title: string;
    titleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    button?: React.ReactComponentElement<typeof ButtonPrimary>;
    secondaryButton?: React.ReactComponentElement<typeof ButtonSecondary>;
    buttonLink?: React.ReactComponentElement<typeof ButtonLink>;
    'aria-label'?: string;
}

type DisplayMediaCardBaseProps = {
    aspectRatio?: AspectRatio | number;
    width?: number | string;
    height?: number | string;
};

interface DisplayMediaCardWithImageProps extends CommonDisplayCardProps {
    backgroundImage: string;
}

type DisplayMediaCardWithVideoProps = Omit<CommonDisplayCardProps, 'actions' | 'onClose'> & {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<HTMLVideoElement>;
};

type DisplayMediaCardProps = DisplayMediaCardBaseProps &
    ExclusifyUnion<DisplayMediaCardWithImageProps | DisplayMediaCardWithVideoProps>;

interface DisplayDataCardProps extends CommonDisplayCardProps {
    extra?: React.ReactNode;
    isInverse?: boolean;
}

type GenericDisplayCardProps = ExclusifyUnion<
    (DisplayMediaCardProps & {isInverse: true}) | DisplayDataCardProps
>;

const DisplayCard = React.forwardRef<HTMLDivElement, GenericDisplayCardProps>(
    (
        {
            isInverse,
            backgroundImage,
            backgroundVideo,
            backgroundVideoRef,
            poster,
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            button,
            secondaryButton,
            onClose,
            actions,
            buttonLink,
            dataAttributes,
            width,
            height,
            aspectRatio,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const image = renderBackgroundImage(backgroundImage);
        const {video, videoStatus, onVideoControlPress} = useVideoWithControls(
            backgroundVideo,
            poster,
            backgroundVideoRef
        );

        if (backgroundVideo) {
            actions = [
                {
                    Icon: getVideoActionIcon(videoStatus),
                    onPress: onVideoControlPress,
                    label: 'Video controls',
                    iconSize: videoStatus === 'loadingTimeout' ? 16 : 12,
                    iconColor: vars.colors.inverse,
                    iconBackground: styles.videoAction,
                    iconBackgroundInverse: styles.videoAction,
                },
            ];
        }

        const isExternalInverse = useIsInverseVariant();
        const withGradient = !!backgroundImage || !!backgroundVideo;
        const textShadow = withGradient ? '0 0 16px rgba(0,0,0,0.4)' : undefined;
        const hasTopActions = actions?.length || onClose;

        return (
            <MaybeWithActions
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                onClose={onClose}
                actions={actions}
                aria-label={ariaLabel}
                isInverse={isInverse}
            >
                <InternalBoxed
                    borderRadius={vars.borderRadii.legacyDisplay}
                    className={styles.boxed}
                    dataAttributes={dataAttributes}
                    ref={ref}
                    width="100%"
                    minHeight="100%"
                    isInverse={isInverse}
                    background={
                        backgroundImage || backgroundVideo
                            ? isExternalInverse
                                ? vars.colors.backgroundContainerBrandOverInverse
                                : vars.colors.backgroundContainer
                            : undefined
                    }
                >
                    <div className={styles.displayCardContainer}>
                        <ThemeVariant isInverse={isExternalInverse}>
                            <div
                                className={styles.displayCardBackground}
                                style={{
                                    zIndex: 0,
                                }}
                            >
                                {backgroundVideo ? video : backgroundImage ? image : undefined}
                            </div>
                        </ThemeVariant>

                        <div
                            className={styles.displayCardContent}
                            style={{
                                paddingTop: withGradient && !icon && !hasTopActions ? 0 : 24,
                                zIndex: 1,
                            }}
                        >
                            {icon ? (
                                <Box paddingBottom={withGradient ? 0 : 40} paddingX={24}>
                                    {icon}
                                </Box>
                            ) : (
                                <Box
                                    paddingBottom={actions?.length || onClose ? (withGradient ? 24 : 64) : 0}
                                />
                            )}
                            <Box
                                paddingX={24}
                                paddingTop={withGradient ? 40 : 0}
                                paddingBottom={24}
                                className={withGradient ? styles.displayCardGradient : undefined}
                            >
                                <Stack space={24}>
                                    <div>
                                        <Stack space={8}>
                                            {(headline || pretitle || title) && (
                                                <header>
                                                    <Stack space={16}>
                                                        {headline}
                                                        <Stack space={4}>
                                                            {pretitle && (
                                                                <Text2
                                                                    forceMobileSizes
                                                                    truncate={pretitleLinesMax}
                                                                    as="div"
                                                                    regular
                                                                    textShadow={textShadow}
                                                                >
                                                                    {pretitle}
                                                                </Text2>
                                                            )}
                                                            <Text6
                                                                forceMobileSizes
                                                                truncate={titleLinesMax}
                                                                as="h3"
                                                                textShadow={textShadow}
                                                                hyphens="auto"
                                                            >
                                                                {title}
                                                            </Text6>
                                                        </Stack>
                                                    </Stack>
                                                </header>
                                            )}

                                            {description && (
                                                <Text3
                                                    forceMobileSizes
                                                    truncate={descriptionLinesMax}
                                                    as="p"
                                                    regular
                                                    color={vars.colors.textSecondary}
                                                    textShadow={textShadow}
                                                    hyphens="auto"
                                                >
                                                    {description}
                                                </Text3>
                                            )}
                                        </Stack>
                                        {extra}
                                    </div>
                                    {(button || secondaryButton || buttonLink) && (
                                        <ButtonGroup
                                            primaryButton={button}
                                            secondaryButton={secondaryButton}
                                            link={buttonLink}
                                        />
                                    )}
                                </Stack>
                            </Box>
                        </div>
                    </div>
                </InternalBoxed>
            </MaybeWithActions>
        );
    }
);

export const DisplayMediaCard = React.forwardRef<HTMLDivElement, DisplayMediaCardProps>(
    ({dataAttributes, ...props}, ref) => (
        <DisplayCard
            {...props}
            ref={ref}
            isInverse
            dataAttributes={{...dataAttributes, 'component-name': 'DisplayMediaCard'}}
        />
    )
);

export const DisplayDataCard = React.forwardRef<HTMLDivElement, DisplayDataCardProps>(
    ({dataAttributes, ...props}, ref) => (
        <DisplayCard
            {...props}
            ref={ref}
            dataAttributes={{...dataAttributes, 'component-name': 'DisplayDataCard'}}
        />
    )
);

interface PosterCardBaseProps {
    ariaLabel?: string;
    aspectRatio?: AspectRatio | number;
    width?: number | string;
    height?: number | string;
    icon?: React.ReactElement;
    actions?: Array<CardAction>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
}

interface PosterCardWithImageProps extends PosterCardBaseProps {
    backgroundImage: string;
}

type PosterCardWithVideoProps = Omit<PosterCardBaseProps, 'actions' | 'onClose'> & {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<HTMLVideoElement>;
};

type PosterCardProps = ExclusifyUnion<PosterCardWithImageProps | PosterCardWithVideoProps>;

const POSTER_CARD_MIN_WIDTH = 140;
const POSTER_CARD_MIN_HEIGHT = 112;
export const PosterCard = React.forwardRef<HTMLDivElement, PosterCardProps>(
    (
        {
            dataAttributes,
            backgroundImage,
            backgroundVideo,
            poster,
            backgroundVideoRef,
            width,
            height,
            aspectRatio = '7:10',
            ariaLabel,
            actions,
            onClose,
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            description,
            descriptionLinesMax,
        },
        ref
    ) => {
        const image = renderBackgroundImage(backgroundImage);
        const {video, videoStatus, onVideoControlPress} = useVideoWithControls(
            backgroundVideo,
            poster,
            backgroundVideoRef
        );

        if (backgroundVideo) {
            actions = [
                {
                    Icon: getVideoActionIcon(videoStatus),
                    onPress: onVideoControlPress,
                    label: 'Video controls',
                    iconSize: videoStatus === 'loadingTimeout' ? 16 : 12,
                    iconColor: vars.colors.inverse,
                    iconBackground: styles.videoAction,
                    iconBackgroundInverse: styles.videoAction,
                },
            ];
        }

        const isExternalInverse = useIsInverseVariant();
        const withGradient = !!backgroundImage || !!backgroundVideo;
        const textShadow = withGradient ? '0 0 16px rgba(0,0,0,0.4)' : undefined;
        const hasTopActions = actions?.length || onClose;
        const {textPresets} = useTheme();

        return (
            <MaybeWithActions
                width={width}
                height={height}
                minWidth={POSTER_CARD_MIN_WIDTH}
                minHeight={POSTER_CARD_MIN_HEIGHT}
                aspectRatio={aspectRatio}
                onClose={onClose}
                actions={actions}
                aria-label={ariaLabel}
                isInverse
            >
                <InternalBoxed
                    borderRadius={vars.borderRadii.legacyDisplay}
                    className={styles.boxed}
                    dataAttributes={dataAttributes}
                    ref={ref}
                    width="100%"
                    minHeight="100%"
                    isInverse
                    background={
                        backgroundImage || backgroundVideo
                            ? isExternalInverse
                                ? vars.colors.backgroundContainerBrandOverInverse
                                : vars.colors.backgroundContainer
                            : undefined
                    }
                >
                    <div className={styles.displayCardContainer}>
                        <ThemeVariant isInverse={isExternalInverse}>
                            <div
                                className={styles.displayCardBackground}
                                style={{
                                    zIndex: 0,
                                }}
                            >
                                {backgroundVideo ? video : backgroundImage ? image : undefined}
                            </div>
                        </ThemeVariant>

                        <div
                            className={styles.displayCardContent}
                            style={{
                                paddingTop: withGradient && !icon && !hasTopActions ? 0 : 24,
                                zIndex: 1,
                            }}
                        >
                            {icon ? (
                                <Box paddingBottom={withGradient ? 0 : 40} paddingX={24}>
                                    {icon}
                                </Box>
                            ) : (
                                <Box
                                    paddingBottom={actions?.length || onClose ? (withGradient ? 24 : 64) : 0}
                                />
                            )}
                            <Box
                                paddingX={16}
                                paddingTop={withGradient ? 40 : 0}
                                paddingBottom={24}
                                className={withGradient ? styles.displayCardGradient : undefined}
                            >
                                <Stack space={24}>
                                    <div>
                                        <Stack space={8}>
                                            {(headline || pretitle || title) && (
                                                <header>
                                                    <Stack space={16}>
                                                        {headline}
                                                        <Stack space={4}>
                                                            {pretitle && (
                                                                <Text2
                                                                    forceMobileSizes
                                                                    truncate={pretitleLinesMax}
                                                                    as="div"
                                                                    regular
                                                                    textShadow={textShadow}
                                                                    hyphens="auto"
                                                                >
                                                                    {pretitle}
                                                                </Text2>
                                                            )}
                                                            <Text
                                                                desktopSize={20}
                                                                mobileSize={18}
                                                                mobileLineHeight="24px"
                                                                desktopLineHeight="28px"
                                                                truncate={titleLinesMax}
                                                                weight={textPresets.cardTitle.weight}
                                                                as="h3"
                                                                hyphens="auto"
                                                            >
                                                                {title}
                                                            </Text>
                                                        </Stack>
                                                    </Stack>
                                                </header>
                                            )}
                                            {description && (
                                                <Text2
                                                    forceMobileSizes
                                                    truncate={descriptionLinesMax}
                                                    as="p"
                                                    regular
                                                    textShadow={textShadow}
                                                    hyphens="auto"
                                                >
                                                    {description}
                                                </Text2>
                                            )}
                                        </Stack>
                                    </div>
                                </Stack>
                            </Box>
                        </div>
                    </div>
                </InternalBoxed>
            </MaybeWithActions>
        );
    }
);
