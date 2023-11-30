'use client';
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
import IconButton from './icon-button';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconPauseFilled from './generated/mistica-icons/icon-pause-filled';
import IconPlayFilled from './generated/mistica-icons/icon-play-filled';
import {combineRefs} from './utils/common';
import Spinner from './spinner';
import Video from './video';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import classNames from 'classnames';
import Inline from './inline';
import {getPrefixedDataAttributes} from './utils/dom';
import {isRunningAcceptanceTest} from './utils/platform';
import {applyCssVars} from './utils/css';

import type {Variant} from './theme-variant-context';
import type {PressHandler} from './touchable';
import type {VideoElement, VideoSource} from './video';
import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {ExclusifyUnion} from './utils/utility-types';
import type {
    DataAttributes,
    IconProps,
    RendersElement,
    RendersNullableElement,
    TrackingEvent,
} from './utils/types';

export type CardAction = {
    label: string;
    Icon: React.FC<IconProps>;
    disabled?: boolean;
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
} & ExclusifyUnion<
    | {href: string; newTab?: boolean}
    | {to: string; fullPageOnWebView?: boolean; replace?: boolean}
    | {onPress: () => void}
>;

const useTopActions = (actions?: Array<CardAction | React.ReactElement>, onClose?: () => void) => {
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

const CardActionTypeContext = React.createContext<'default' | 'inverse' | 'media'>('default');

type CardActionsGroupProps = {
    actions?: Array<CardAction | React.ReactElement>;
    onClose?: () => void;
    padding?: number;
    type?: 'default' | 'inverse' | 'media';
};

export const TOP_ACTION_BUTTON_SIZE = 48;

export const CardActionIconButton = ({Icon, label, ...restProps}: CardAction): JSX.Element => {
    const type = React.useContext(CardActionTypeContext);

    const iconColor = {
        default: vars.colors.neutralHigh,
        inverse: vars.colors.inverse,
        media: '#000000',
    };

    const iconBackgroundStyle = {
        default: styles.cardAction,
        inverse: styles.cardActionInverse,
        media: styles.cardActionMedia,
    };
    return (
        <IconButton
            {...restProps}
            aria-label={label}
            size={TOP_ACTION_BUTTON_SIZE}
            className={styles.cardActionIconButton}
            style={{display: 'flex'}}
        >
            <div className={iconBackgroundStyle[type]}>
                <Icon color={iconColor[type]} size={20} />
            </div>
        </IconButton>
    );
};

export const CardActionsGroup = ({
    actions,
    padding = 8,
    onClose,
    type = 'default',
}: CardActionsGroupProps): JSX.Element => {
    const finalActions = useTopActions(actions, onClose);
    const hasActions = finalActions.length > 0;

    return hasActions ? (
        <CardActionTypeContext.Provider value={type}>
            <div
                style={{
                    position: 'absolute',
                    right: padding,
                    top: padding,
                    zIndex: 3, // needed because images has zIndex 1 and touchable overlay has zIndex 2
                }}
            >
                <div className={sprinkles({display: 'flex'})}>
                    {finalActions.map((action, index) => {
                        if ('label' in action) {
                            // action is a CardAction object
                            return <CardActionIconButton key={index} {...action} />;
                        }
                        // action is a React.ReactElement
                        return action;
                    })}
                </div>
            </div>
        </CardActionTypeContext.Provider>
    ) : (
        <></>
    );
};

export type AspectRatio = '1:1' | '16:9' | '7:10' | '9:10' | 'auto';

const aspectRatioToNumber = (aspectRatio?: AspectRatio | number): number => {
    if (!aspectRatio) {
        return 0;
    }
    if (typeof aspectRatio === 'number') {
        return aspectRatio;
    }
    return {
        '1:1': 1,
        '16:9': 16 / 9,
        '7:10': 7 / 10,
        '9:10': 9 / 10,
        auto: 0,
    }[aspectRatio];
};

type CardContainerProps = {
    children: React.ReactNode;
    width?: string | number;
    height?: string | number;
    aspectRatio?: AspectRatio | number;
    dataAttributes?: DataAttributes;
    className?: string;
    'aria-label'?: string;
};

const CardContainer = React.forwardRef<HTMLDivElement, CardContainerProps>(
    (
        {
            children,
            width = '100%',
            height = '100%',
            aspectRatio,
            dataAttributes,
            className,
            'aria-label': ariaLabel,
        },
        ref
    ): JSX.Element => {
        const cssAspectRatio = aspectRatioToNumber(aspectRatio);

        return (
            <section
                {...getPrefixedDataAttributes(dataAttributes)}
                ref={ref}
                aria-label={ariaLabel}
                className={classNames(className, styles.cardContainer)}
                style={{
                    width,
                    height,
                    ...(cssAspectRatio
                        ? applyCssVars({[styles.vars.aspectRatio]: String(cssAspectRatio)})
                        : {}),
                }}
            >
                {children}
            </section>
        );
    }
);

const renderBackgroundImage = (src?: string) => {
    return <Image width="100%" height="100%" src={src || ''} />;
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

const useVideoWithControls = (
    videoSrc?: VideoSource,
    poster?: string,
    videoRef?: React.RefObject<VideoElement>
) => {
    const {texts} = useTheme();
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

    if (videoStatus === 'error') {
        return {video};
    }

    const videoAction: CardAction = {
        Icon: {
            playing: CardActionPauseIcon,
            loading: CardActionPauseIcon,
            paused: CardActionPlayIcon,
            loadingTimeout: isRunningAcceptanceTest() ? CardActionPauseIcon : CardActionSpinner,
        }[videoStatus],
        onPress: onVideoControlPress,
        label: {
            playing: texts.pauseIconButtonLabel,
            loading: texts.pauseIconButtonLabel,
            paused: texts.playIconButtonLabel,
            loadingTimeout: '',
        }[videoStatus],
        disabled: videoStatus === 'loadingTimeout',
    };

    return {
        video,
        videoAction,
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

type TouchableProps = {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
} & ExclusifyUnion<
    | {href: string | undefined; newTab?: boolean}
    | {to: string | undefined; fullPageOnWebView?: boolean}
    | {onPress: PressHandler | undefined}
>;

type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

interface MediaCardBaseProps {
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
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
    actions?: Array<CardAction | React.ReactElement>;
    children?: void;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    onClose?: () => void;
}

type MediaCardProps = MediaCardBaseProps &
    ExclusifyUnion<
        | TouchableProps
        | {
              button?: RendersNullableElement<typeof ButtonPrimary>;
              buttonLink?: RendersNullableElement<typeof ButtonLink>;
          }
    >;

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
    (
        {
            media,
            icon,
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
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;

        return (
            <CardContainer
                dataAttributes={{'component-name': 'MediaCard', ...dataAttributes}}
                ref={ref}
                aria-label={ariaLabel}
                className={styles.touchableContainer}
            >
                <Boxed className={styles.boxed} width="100%" height="100%">
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={ariaLabel}
                    >
                        {isTouchable && <div className={styles.touchableMediaCardOverlay} />}
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
                            {icon && (
                                <Box
                                    className={styles.mediaCardIcon}
                                    paddingLeft={{mobile: 16, desktop: 24}}
                                    paddingTop={{mobile: 16, desktop: 24}}
                                >
                                    {icon}
                                </Box>
                            )}
                        </div>
                    </BaseTouchable>
                </Boxed>
                <CardActionsGroup onClose={onClose} actions={actions} type="media" />
            </CardContainer>
        );
    }
);

export const NakedCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
    (
        {
            media,
            icon,
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
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;
        const isCircularMedia = media && media.type === Image && (media.props as any).circular;

        return (
            <CardContainer
                ref={ref}
                dataAttributes={{'component-name': 'NakedCard', ...dataAttributes}}
                aria-label={ariaLabel}
                className={isTouchable ? styles.touchableContainer : undefined}
            >
                <BaseTouchable maybe {...touchableProps} className={styles.touchable} aria-label={ariaLabel}>
                    <div className={styles.mediaCard}>
                        <div style={{position: 'relative'}}>
                            {isTouchable && (
                                <div
                                    className={classNames(styles.touchableNakedMediaOverlay, {
                                        [styles.circularMediaOverlay]: isCircularMedia,
                                    })}
                                />
                            )}
                            {media}
                        </div>
                        <div className={styles.nakedCardContent}>
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
                        {icon && (
                            <Box
                                className={styles.mediaCardIcon}
                                paddingLeft={{mobile: 16, desktop: 24}}
                                paddingTop={{mobile: 16, desktop: 24}}
                            >
                                {icon}
                            </Box>
                        )}
                    </div>
                </BaseTouchable>
                <CardActionsGroup onClose={onClose} actions={actions} type="media" />
            </CardContainer>
        );
    }
);

type SmallNakedCardProps = MaybeTouchableCard<{
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
}>;

export const SmallNakedCard = React.forwardRef<HTMLDivElement, SmallNakedCardProps>(
    (
        {
            media,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            dataAttributes,
            'aria-label': ariaLabel,
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;
        const isCircularMedia = media && media.type === Image && (media.props as any).circular;

        return (
            <CardContainer
                ref={ref}
                dataAttributes={{'component-name': 'SmallNakedCard', ...dataAttributes}}
                aria-label={ariaLabel}
                className={isTouchable ? styles.touchableContainer : undefined}
            >
                <BaseTouchable maybe {...touchableProps} className={styles.touchable} aria-label={ariaLabel}>
                    <div className={styles.mediaCard}>
                        <div style={{position: 'relative'}}>
                            {isTouchable && (
                                <div
                                    className={classNames(styles.touchableNakedMediaOverlay, {
                                        [styles.circularMediaOverlay]: isCircularMedia,
                                    })}
                                />
                            )}
                            {media}
                        </div>
                        <div className={styles.nakedCardContent}>
                            <div>
                                <Stack space={8}>
                                    {title && (
                                        <Text2 truncate={titleLinesMax} as="h3" regular hyphens="auto">
                                            {title}
                                        </Text2>
                                    )}
                                    {subtitle && (
                                        <Text2 truncate={subtitleLinesMax} regular as="p" hyphens="auto">
                                            {subtitle}
                                        </Text2>
                                    )}
                                </Stack>
                                {description && (
                                    <Text2
                                        truncate={descriptionLinesMax}
                                        regular
                                        as="p"
                                        color={vars.colors.textSecondary}
                                        hyphens="auto"
                                    >
                                        {description}
                                    </Text2>
                                )}
                            </div>
                            {extra && <div>{extra}</div>}
                        </div>
                    </div>
                </BaseTouchable>
            </CardContainer>
        );
    }
);

interface DataCardBaseProps {
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
    actions?: Array<CardAction | React.ReactElement>;
    aspectRatio?: AspectRatio | number;
    children?: void;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    onClose?: () => void;
}

type DataCardProps = DataCardBaseProps &
    ExclusifyUnion<
        | TouchableProps
        | {
              button?: RendersNullableElement<typeof ButtonPrimary>;
              buttonLink?: RendersNullableElement<typeof ButtonLink>;
          }
    >;

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
            aspectRatio,
            ...touchableProps
        },
        ref
    ) => {
        const hasIcon = !!icon;
        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;

        const finalActions = useTopActions(actions, onClose);
        const topActionsStylesWithoutIcon = {
            marginRight: -16,
            marginTop: -24,
            width: TOP_ACTION_BUTTON_SIZE * finalActions.length,
        } as const;

        return (
            <CardContainer
                dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                ref={ref}
                aria-label={ariaLabel}
                className={styles.touchableContainer}
                aspectRatio={aspectRatio}
            >
                <Boxed className={styles.boxed} width="100%" minHeight="100%">
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={ariaLabel}
                    >
                        {isTouchable && <div className={styles.touchableCardOverlay} />}
                        <div className={styles.dataCard}>
                            <Inline space={0}>
                                <Stack space={16}>
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
                                {/** Hack to avoid content from rendering on top of the top action buttons */}
                                {!hasIcon && <div style={topActionsStylesWithoutIcon} />}
                            </Inline>

                            {extra && <div>{extra}</div>}

                            {(button || buttonLink) && (
                                <div className={styles.actions}>
                                    <ButtonGroup primaryButton={button} link={buttonLink} />
                                </div>
                            )}
                        </div>
                    </BaseTouchable>
                </Boxed>
                <CardActionsGroup onClose={onClose} actions={actions} type="default" />
            </CardContainer>
        );
    }
);

type SnapCardProps = MaybeTouchableCard<{
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
    aspectRatio?: AspectRatio | number;
    children?: void;
}>;

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
            aspectRatio,
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;
        const overlayStyle = isInverse ? styles.touchableCardOverlayInverse : styles.touchableCardOverlay;

        return (
            <CardContainer
                dataAttributes={{'component-name': 'SnapCard', ...dataAttributes}}
                ref={ref}
                className={styles.touchableContainer}
                aspectRatio={aspectRatio}
            >
                <Boxed className={styles.boxed} isInverse={isInverse} width="100%" minHeight="100%">
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={ariaLabel}
                    >
                        {isTouchable && <div className={overlayStyle} />}
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
            </CardContainer>
        );
    }
);

interface CommonDisplayCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    actions?: Array<CardAction | React.ReactElement>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    headline?: React.ReactComponentElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title: string;
    titleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    'aria-label'?: string;
    aspectRatio?: AspectRatio | number;
}

type DisplayMediaCardBaseProps = {
    width?: number | string;
    height?: number | string;
};

type DisplayMediaCardWithImageProps = CommonDisplayCardProps & {
    backgroundImage: string;
};

type DisplayMediaCardWithVideoProps = Omit<CommonDisplayCardProps, 'actions' | 'onClose'> & {
    backgroundVideo: VideoSource;
    poster?: string;
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

type DisplayMediaCardProps = DisplayMediaCardBaseProps &
    ExclusifyUnion<DisplayMediaCardWithImageProps | DisplayMediaCardWithVideoProps> &
    ExclusifyUnion<
        | TouchableProps
        | {
              button?: React.ReactComponentElement<typeof ButtonPrimary>;
              secondaryButton?: React.ReactComponentElement<typeof ButtonSecondary>;
              buttonLink?: React.ReactComponentElement<typeof ButtonLink>;
          }
    >;

type DisplayDataCardProps = CommonDisplayCardProps & {
    extra?: React.ReactNode;
    isInverse?: boolean;
} & ExclusifyUnion<
        | TouchableProps
        | {
              button?: React.ReactComponentElement<typeof ButtonPrimary>;
              secondaryButton?: React.ReactComponentElement<typeof ButtonSecondary>;
              buttonLink?: React.ReactComponentElement<typeof ButtonLink>;
          }
    >;

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
            ...touchableProps
        },
        ref
    ) => {
        const hasImage = backgroundImage !== undefined;
        const hasVideo = backgroundVideo !== undefined;
        const image = renderBackgroundImage(backgroundImage);
        const {video, videoAction} = useVideoWithControls(backgroundVideo, poster, backgroundVideoRef);

        if (hasVideo) {
            actions = videoAction ? [videoAction] : [];
        }

        const isExternalInverse = useIsInverseVariant();
        const withGradient = hasImage || hasVideo;
        const textShadow = withGradient ? '0 0 16px rgba(0,0,0,0.4)' : undefined;
        const hasTopActions = actions?.length || onClose;

        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;
        const overlayStyle =
            hasImage || hasVideo
                ? styles.touchableCardOverlayMedia
                : isInverse
                ? styles.touchableCardOverlayInverse
                : styles.touchableCardOverlay;

        return (
            <CardContainer
                dataAttributes={dataAttributes}
                ref={ref}
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                aria-label={ariaLabel}
                className={styles.touchableContainer}
            >
                <InternalBoxed
                    borderRadius={vars.borderRadii.legacyDisplay}
                    className={styles.boxed}
                    width="100%"
                    minHeight="100%"
                    isInverse={isInverse}
                    background={
                        hasImage || hasVideo
                            ? isExternalInverse
                                ? vars.colors.backgroundContainerBrandOverInverse
                                : vars.colors.backgroundContainer
                            : undefined
                    }
                >
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={ariaLabel}
                    >
                        {isTouchable && <div className={overlayStyle} />}

                        <div className={styles.displayCardContainer}>
                            {(hasImage || hasVideo) && (
                                <ThemeVariant isInverse={isExternalInverse}>
                                    <div className={styles.displayCardBackground}>
                                        {hasVideo ? video : image}
                                    </div>
                                </ThemeVariant>
                            )}

                            <div
                                className={styles.displayCardContent}
                                style={{
                                    paddingTop: withGradient && !icon && !hasTopActions && !hasVideo ? 0 : 24,
                                }}
                            >
                                {icon ? (
                                    <Box paddingBottom={withGradient ? 0 : 40} paddingX={24}>
                                        {icon}
                                    </Box>
                                ) : (
                                    <Box
                                        paddingBottom={
                                            hasTopActions || hasVideo ? (withGradient ? 24 : 64) : 0
                                        }
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
                                                        color={
                                                            withGradient
                                                                ? vars.colors.textPrimary
                                                                : vars.colors.textSecondary
                                                        }
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
                    </BaseTouchable>
                </InternalBoxed>
                <CardActionsGroup
                    onClose={onClose}
                    actions={actions}
                    type={hasImage || hasVideo ? 'media' : isInverse ? 'inverse' : 'default'}
                />
            </CardContainer>
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
    actions?: Array<CardAction | React.ReactElement>;
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
    backgroundVideoRef?: React.RefObject<VideoElement>;
};

type PosterCardWithBackgroundColorProps = PosterCardBaseProps & {
    backgroundColor?: string;
} & ExclusifyUnion<
        | {
              variant: Variant;
          }
        | {
              isInverse: boolean;
          }
    >;

type PosterCardProps = MaybeTouchableCard<
    ExclusifyUnion<PosterCardWithImageProps | PosterCardWithVideoProps | PosterCardWithBackgroundColorProps>
>;

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
            variant,
            isInverse,
            backgroundColor,
            ...touchableProps
        },
        ref
    ) => {
        const hasImage = backgroundImage !== undefined;
        const hasVideo = backgroundVideo !== undefined;
        const image = renderBackgroundImage(backgroundImage);
        const {video, videoAction} = useVideoWithControls(backgroundVideo, poster, backgroundVideoRef);

        if (hasVideo) {
            actions = videoAction ? [videoAction] : [];
        }

        const isExternalInverse = useIsInverseVariant();
        const withGradient = hasImage || hasVideo;
        const textShadow = withGradient ? '0 0 16px rgba(0,0,0,0.4)' : undefined;
        const hasTopActions = actions?.length || onClose;
        const {textPresets} = useTheme();

        const isTouchable = touchableProps.href || touchableProps.to || touchableProps.onPress;
        const normalizedVariant = variant || (isInverse ? 'inverse' : 'default');

        const calcBackgroundColor = () => {
            if (backgroundColor) {
                return backgroundColor;
            }

            return {
                default: vars.colors.backgroundContainer,
                inverse: isExternalInverse
                    ? vars.colors.backgroundContainerBrandOverInverse
                    : vars.colors.backgroundBrand,
                alternative: vars.colors.backgroundAlternative,
            }[normalizedVariant];
        };

        const overlayStyle =
            hasImage || hasVideo
                ? styles.touchableCardOverlayMedia
                : normalizedVariant === 'inverse'
                ? styles.touchableCardOverlayInverse
                : styles.touchableCardOverlay;

        return (
            <CardContainer
                width={width}
                height={height}
                dataAttributes={{...dataAttributes, 'component-name': 'PosterCard'}}
                ref={ref}
                aspectRatio={aspectRatio}
                aria-label={ariaLabel}
                className={styles.touchableContainer}
            >
                <InternalBoxed
                    borderRadius={vars.borderRadii.legacyDisplay}
                    className={styles.boxed}
                    width="100%"
                    minHeight="100%"
                    isInverse={hasImage || hasVideo || normalizedVariant === 'inverse'}
                    background={
                        hasImage || hasVideo
                            ? isExternalInverse
                                ? vars.colors.backgroundContainerBrandOverInverse
                                : vars.colors.backgroundContainer
                            : calcBackgroundColor()
                    }
                >
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={ariaLabel}
                    >
                        {isTouchable && <div className={overlayStyle} />}

                        <div className={styles.displayCardContainer}>
                            {(hasImage || hasVideo) && (
                                <ThemeVariant isInverse={isExternalInverse}>
                                    <div className={styles.displayCardBackground}>
                                        {hasVideo ? video : image}
                                    </div>
                                </ThemeVariant>
                            )}
                            <Box
                                className={styles.displayCardContent}
                                paddingTop={
                                    withGradient && !icon && !hasTopActions && !hasVideo
                                        ? 0
                                        : {mobile: icon ? 16 : 24, desktop: 24}
                                }
                            >
                                {icon ? (
                                    <Box
                                        paddingBottom={withGradient ? 0 : 40}
                                        paddingX={{mobile: 16, desktop: 24}}
                                    >
                                        {icon}
                                    </Box>
                                ) : (
                                    <Box
                                        paddingBottom={
                                            hasTopActions || hasVideo ? (withGradient ? 24 : 64) : 0
                                        }
                                    />
                                )}
                                <Box
                                    paddingX={{mobile: 16, desktop: 24}}
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
                            </Box>
                        </div>
                    </BaseTouchable>
                </InternalBoxed>
                <CardActionsGroup
                    onClose={onClose}
                    actions={actions}
                    type={
                        hasImage || hasVideo
                            ? 'media'
                            : normalizedVariant === 'inverse'
                            ? 'inverse'
                            : 'default'
                    }
                />
            </CardContainer>
        );
    }
);
