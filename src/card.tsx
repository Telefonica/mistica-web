'use client';
import * as React from 'react';
import Tag from './tag';
import Stack from './stack';
import Box from './box';
import {Text2, Text, Text6, Text3} from './text';
import {Boxed, InternalBoxed} from './boxed';
import ButtonGroup from './button-group';
import Image from './image';
import {BaseTouchable} from './touchable';
import {vars} from './skins/skin-contract.css';
import * as styles from './card.css';
import * as mediaStyles from './image.css';
import {useTheme} from './hooks';
import {sprinkles} from './sprinkles.css';
import {InternalIconButton, InternalToggleIconButton} from './icon-button';
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

const useInnerText = () => {
    const [text, setText] = React.useState('');

    const ref: React.LegacyRef<HTMLElement> = React.useCallback((node: HTMLElement) => {
        if (node) {
            // jsdom doesn't implements innerText. Using textContent as fallback in unit tests although it's not the same
            setText((process.env.NODE_ENV === 'test' ? node.textContent : node.innerText) || '');
        }
    }, []);

    return {text, ref};
};

type BaseIconButtonAction = {
    Icon: React.FC<IconProps>;
    label: string;
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

const useTopActions = (actions?: ReadonlyArray<CardAction | React.ReactElement>, onClose?: () => void) => {
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
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    onClose?: () => void;
    padding?: number;
    type?: 'default' | 'inverse' | 'media';
};

export const CardActionIconButton = (props: CardAction): JSX.Element => {
    const type = React.useContext(CardActionTypeContext);

    return (
        <ThemeVariant isInverse={type === 'inverse'}>
            {/** we render IconButton if Icon prop was passed. Otherwise, ToggleIconButton will be used */}
            {props.Icon ? (
                <InternalIconButton
                    {...props}
                    aria-label={props.label}
                    small
                    isOverMedia={type === 'media'}
                    type="neutral"
                    backgroundType="transparent"
                />
            ) : (
                <InternalToggleIconButton
                    {...props}
                    checkedProps={{
                        ...props.checkedProps,
                        'aria-label': props.checkedProps.label,
                        type: type === 'media' ? 'neutral' : 'brand',
                        backgroundType: 'solid',
                    }}
                    uncheckedProps={{
                        ...props.uncheckedProps,
                        'aria-label': props.uncheckedProps.label,
                        type: 'neutral',
                        backgroundType: 'transparent',
                    }}
                    small
                    isOverMedia={type === 'media'}
                />
            )}
        </ThemeVariant>
    );
};

export const CardActionsGroup = ({
    actions,
    padding = 16,
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
                <Inline space={16}>
                    {finalActions.map((action, index) => {
                        if ('Icon' in action || 'checkedProps' in action) {
                            // action is a CardAction object
                            return <CardActionIconButton key={index} {...action} />;
                        }
                        // action is a React.ReactElement
                        return action;
                    })}
                </Inline>
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
        {children, width, height, aspectRatio, dataAttributes, className, 'aria-label': ariaLabel},
        ref
    ): JSX.Element => {
        const cssAspectRatio = width && height ? undefined : aspectRatioToNumber(aspectRatio);

        return (
            <section
                {...getPrefixedDataAttributes(dataAttributes)}
                ref={ref}
                aria-label={ariaLabel}
                className={classNames(className, styles.cardContainer)}
                style={{
                    width: width || '100%',
                    height: height || '100%',
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

export const useVideoWithControls = (
    videoSrc?: VideoSource,
    poster?: string,
    videoRef?: React.RefObject<VideoElement>
): {
    video?: React.ReactNode;
    videoAction?: CardAction;
} => {
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

    const videoAction: CardAction | undefined = video
        ? {
              uncheckedProps: {
                  Icon:
                      videoStatus === 'loadingTimeout' && !isRunningAcceptanceTest()
                          ? CardActionSpinner
                          : CardActionPauseIcon,
                  label: videoStatus === 'loadingTimeout' ? '' : texts.pauseIconButtonLabel,
              },
              checkedProps: {
                  Icon: CardActionPlayIcon,
                  label: texts.playIconButtonLabel,
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

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    headlineRef?: (instance: HTMLElement | null) => void;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    extraRef?: (instance: HTMLElement | null) => void;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    headlineRef,
    pretitle,
    pretitleLinesMax,
    title,
    titleAs = 'h3',
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
    extra,
    extraRef,
    button,
    buttonLink,
}) => {
    const {textPresets} = useTheme();
    return (
        <div
            className={sprinkles({
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
            })}
        >
            {/** using flex instead of nested Stacks, this way we can rearrange texts so the DOM structure makes more sense for screen reader users */}
            <div className={styles.flexColumn}>
                {title && (
                    <div style={{paddingBottom: subtitle || description ? 4 : 0}}>
                        <Text
                            mobileSize={18}
                            mobileLineHeight="24px"
                            desktopSize={20}
                            desktopLineHeight="28px"
                            truncate={titleLinesMax}
                            weight={textPresets.cardTitle.weight}
                            as={titleAs}
                            hyphens="auto"
                        >
                            {title}
                        </Text>
                    </div>
                )}
                {headline && (
                    // assuming that the headline will always be followed by one of: pretitle, title, subtitle, description
                    <div ref={headlineRef} style={{order: -2, paddingBottom: 8}}>
                        {typeof headline === 'string' ? <Tag type="promo">{headline}</Tag> : headline}
                    </div>
                )}
                {pretitle && (
                    <div style={{order: -1, paddingBottom: 4}}>
                        <Text2 truncate={pretitleLinesMax} as="div" regular hyphens="auto">
                            {pretitle}
                        </Text2>
                    </div>
                )}
                {subtitle && (
                    <div style={{paddingBottom: description ? 4 : 0}}>
                        <Text2 truncate={subtitleLinesMax} as="div" regular hyphens="auto">
                            {subtitle}
                        </Text2>
                    </div>
                )}
                {description && (
                    // this is tricky, when headline exists, the 8px padding is added by it.
                    // Otherwise, only 4px are added by title|pretitle|subtitle, so we need to add 4px more
                    <div
                        style={{
                            paddingTop: pretitle || title || subtitle ? 4 : 0,
                        }}
                    >
                        <Text2
                            truncate={descriptionLinesMax}
                            as="p"
                            regular
                            color={vars.colors.textSecondary}
                            hyphens="auto"
                        >
                            {description}
                        </Text2>
                    </div>
                )}
                {extra && <div ref={extraRef}>{extra}</div>}
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
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

interface MediaCardBaseProps {
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    icon?: React.ReactElement;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
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
            titleAs = 'h3',
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            actions,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabelProp,
            onClose,
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const {text: headlineText, ref: headlineRef} = useInnerText();
        const {text: extraText, ref: extraRef} = useInnerText();

        const ariaLabel =
            ariaLabelProp ||
            [title, headlineText, pretitle, subtitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                dataAttributes={{'component-name': 'MediaCard', ...dataAttributes}}
                ref={ref}
                aria-label={isTouchable ? undefined : ariaLabelProp}
                className={styles.touchableContainer}
            >
                <Boxed className={styles.boxed} width="100%" height="100%">
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={isTouchable ? ariaLabel : undefined}
                    >
                        {isTouchable && <div className={styles.touchableMediaCardOverlay} />}
                        <div className={styles.mediaCard}>
                            <div style={applyCssVars({[mediaStyles.vars.mediaBorderRadius]: '0px'})}>
                                {media}
                            </div>
                            <div className={styles.mediaCardContent}>
                                <CardContent
                                    headline={headline}
                                    headlineRef={headlineRef}
                                    pretitle={pretitle}
                                    pretitleLinesMax={pretitleLinesMax}
                                    title={title}
                                    titleAs={titleAs}
                                    titleLinesMax={titleLinesMax}
                                    subtitle={subtitle}
                                    subtitleLinesMax={subtitleLinesMax}
                                    description={description}
                                    descriptionLinesMax={descriptionLinesMax}
                                    extra={extra}
                                    extraRef={extraRef}
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
                                    <div
                                        style={applyCssVars({
                                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                        })}
                                    >
                                        {icon}
                                    </div>
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
            titleAs = 'h3',
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            actions,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabelProp,
            onClose,
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const isCircularMedia = media && media.type === Image && (media.props as any).circular;
        const {text: headlineText, ref: headlineRef} = useInnerText();
        const {text: extraText, ref: extraRef} = useInnerText();

        const ariaLabel =
            ariaLabelProp ||
            [title, headlineText, pretitle, subtitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                ref={ref}
                dataAttributes={{'component-name': 'NakedCard', ...dataAttributes}}
                aria-label={isTouchable ? undefined : ariaLabelProp}
                className={isTouchable ? styles.touchableContainer : undefined}
            >
                <BaseTouchable
                    maybe
                    {...touchableProps}
                    className={styles.touchable}
                    aria-label={isTouchable ? ariaLabel : undefined}
                >
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
                                headlineRef={headlineRef}
                                pretitle={pretitle}
                                pretitleLinesMax={pretitleLinesMax}
                                title={title}
                                titleAs={titleAs}
                                titleLinesMax={titleLinesMax}
                                subtitle={subtitle}
                                subtitleLinesMax={subtitleLinesMax}
                                description={description}
                                descriptionLinesMax={descriptionLinesMax}
                                extra={extra}
                                extraRef={extraRef}
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
                                <div
                                    style={applyCssVars({
                                        [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                    })}
                                >
                                    {icon}
                                </div>
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
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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
            titleAs = 'h3',
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            dataAttributes,
            'aria-label': ariaLabelProp,
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const isCircularMedia = media && media.type === Image && (media.props as any).circular;
        const {textPresets} = useTheme();
        const {text: extraText, ref: extraRef} = useInnerText();

        const ariaLabel =
            ariaLabelProp || [title, subtitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                ref={ref}
                dataAttributes={{'component-name': 'SmallNakedCard', ...dataAttributes}}
                aria-label={isTouchable ? undefined : ariaLabelProp}
                className={isTouchable ? styles.touchableContainer : undefined}
            >
                <BaseTouchable
                    maybe
                    {...touchableProps}
                    className={styles.touchable}
                    aria-label={isTouchable ? ariaLabel : undefined}
                >
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
                                <Stack space={4}>
                                    {title && (
                                        <Text
                                            desktopSize={16}
                                            mobileSize={14}
                                            mobileLineHeight="20px"
                                            desktopLineHeight="24px"
                                            truncate={titleLinesMax}
                                            weight={textPresets.cardTitle.weight}
                                            as={titleAs}
                                            hyphens="auto"
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    {subtitle && (
                                        <Text2 truncate={subtitleLinesMax} regular as="p" hyphens="auto">
                                            {subtitle}
                                        </Text2>
                                    )}
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
                                </Stack>
                            </div>
                            {extra && <div ref={extraRef}>{extra}</div>}
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
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
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
            titleAs = 'h3',
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
            'aria-label': ariaLabelProp,
            onClose,
            aspectRatio,
            ...touchableProps
        },
        ref
    ) => {
        const hasIconOrHeadline = !!icon || !!headline;
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const {text: headlineText, ref: headlineRef} = useInnerText();
        const {text: extraText, ref: extraRef} = useInnerText();

        const finalActions = useTopActions(actions, onClose);

        const ariaLabel =
            ariaLabelProp ||
            [title, headlineText, pretitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                ref={ref}
                aria-label={isTouchable ? undefined : ariaLabelProp}
                className={styles.touchableContainer}
                aspectRatio={aspectRatio}
            >
                <Boxed className={styles.boxed} width="100%" minHeight="100%">
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={isTouchable ? ariaLabel : undefined}
                    >
                        {isTouchable && <div className={styles.touchableCardOverlay} />}
                        <div className={styles.dataCard}>
                            <Inline space={0}>
                                <Stack space={16}>
                                    {icon && (
                                        <div
                                            style={applyCssVars({
                                                [mediaStyles.vars.mediaBorderRadius]:
                                                    vars.borderRadii.mediaSmall,
                                            })}
                                        >
                                            {icon}
                                        </div>
                                    )}
                                    <CardContent
                                        headline={headline}
                                        headlineRef={headlineRef}
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
                                </Stack>
                                {/** Hack to avoid content from rendering on top of the top action buttons */}
                                {!hasIconOrHeadline && (
                                    <div
                                        style={applyCssVars({
                                            [styles.vars.topActionsCount]: String(finalActions.length),
                                        })}
                                        className={styles.dataCardTopActionsWithoutIcon}
                                    />
                                )}
                            </Inline>

                            {extra && <div ref={extraRef}>{extra}</div>}

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
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
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
            titleAs = 'h3',
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            dataAttributes,
            'aria-label': ariaLabelProp,
            extra,
            isInverse = false,
            aspectRatio,
            ...touchableProps
        },
        ref
    ) => {
        const {textPresets} = useTheme();
        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const overlayStyle = isInverse ? styles.touchableCardOverlayInverse : styles.touchableCardOverlay;
        const {text: extraText, ref: extraRef} = useInnerText();

        const ariaLabel =
            ariaLabelProp || [title, subtitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                dataAttributes={{'component-name': 'SnapCard', ...dataAttributes}}
                ref={ref}
                className={styles.touchableContainer}
                aspectRatio={aspectRatio}
                aria-label={isTouchable ? undefined : ariaLabelProp}
            >
                <Boxed className={styles.boxed} isInverse={isInverse} width="100%" minHeight="100%">
                    <BaseTouchable
                        maybe
                        {...touchableProps}
                        className={styles.touchable}
                        aria-label={isTouchable ? ariaLabel : undefined}
                    >
                        {isTouchable && <div className={overlayStyle} />}
                        <section className={styles.snapCard}>
                            <div>
                                {icon && (
                                    <div
                                        style={applyCssVars({
                                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                        })}
                                    >
                                        <Box paddingBottom={16}>{icon}</Box>
                                    </div>
                                )}
                                <Stack space={4}>
                                    {title && (
                                        <Text
                                            desktopSize={16}
                                            mobileSize={14}
                                            mobileLineHeight="20px"
                                            desktopLineHeight="24px"
                                            truncate={titleLinesMax}
                                            weight={textPresets.cardTitle.weight}
                                            as={titleAs}
                                            hyphens="auto"
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    {subtitle && (
                                        <Text2
                                            truncate={subtitleLinesMax}
                                            regular
                                            color={vars.colors.textPrimary}
                                            as="p"
                                            hyphens="auto"
                                        >
                                            {subtitle}
                                        </Text2>
                                    )}
                                    {description && (
                                        <Text2
                                            truncate={descriptionLinesMax}
                                            regular
                                            color={vars.colors.textSecondary}
                                            as="p"
                                            hyphens="auto"
                                        >
                                            {description}
                                        </Text2>
                                    )}
                                </Stack>
                            </div>
                            {extra && <div ref={extraRef}>{extra}</div>}
                        </section>
                    </BaseTouchable>
                </Boxed>
            </CardContainer>
        );
    }
);

interface DisplayCardContentProps {
    title?: React.ReactNode;
    headline?: React.ReactNode;
    pretitle?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    extra?: React.ReactNode;
    headlineRef?: (instance: HTMLElement | null) => void;
    extraRef?: (instance: HTMLElement | null) => void;
}

const DisplayCardContent: React.FC<DisplayCardContentProps> = ({
    title,
    headline,
    pretitle,
    subtitle,
    description,
    extra,
    headlineRef,
    extraRef,
}) => {
    // using flex instead of nested Stacks, this way we can rearrange texts so the DOM structure makes more sense for screen reader users
    return (
        <div className={styles.flexColumn}>
            {title && <div style={{paddingBottom: subtitle || description ? 4 : 0}}>{title}</div>}
            {headline && (
                // assuming that the headline will always be followed by one of: pretitle, title, subtitle, description
                <div ref={headlineRef} style={{order: -2, paddingBottom: 16}}>
                    {headline}
                </div>
            )}
            {pretitle && <div style={{order: -1, paddingBottom: 4}}>{pretitle}</div>}

            {subtitle && <div style={{paddingBottom: subtitle ? 4 : 0}}>{subtitle}</div>}
            {description && (
                // this is tricky, the padding between a headline and a description is 16px
                // but the padding between a title|pretitle|subtitle and a description is 8px (4px + 4px)
                <div
                    style={{
                        paddingTop: pretitle || title || subtitle ? 4 : 0,
                    }}
                >
                    {description}
                </div>
            )}
            {extra && <div ref={extraRef}>{extra}</div>}
        </div>
    );
};

interface CommonDisplayCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    headline?: React.ReactComponentElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    'aria-label'?: string;
    aspectRatio?: AspectRatio | number;
    extra?: React.ReactNode;
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
            titleAs = 'h3',
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
            'aria-label': ariaLabelProp,
            ...touchableProps
        },
        ref
    ) => {
        const hasImage = backgroundImage !== undefined;
        const hasVideo = backgroundVideo !== undefined;
        const image = renderBackgroundImage(backgroundImage);
        const {video, videoAction} = useVideoWithControls(backgroundVideo, poster, backgroundVideoRef);
        const {text: headlineText, ref: headlineRef} = useInnerText();
        const {text: extraText, ref: extraRef} = useInnerText();

        if (hasVideo) {
            actions = videoAction ? [videoAction] : [];
        }

        const isExternalInverse = useIsInverseVariant();
        const withGradient = hasImage || hasVideo;
        const textShadow = withGradient ? '0 0 16px rgba(0,0,0,0.4)' : undefined;
        const hasTopActions = actions?.length || onClose;

        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
        const overlayStyle =
            hasImage || hasVideo
                ? styles.touchableCardOverlayMedia
                : isInverse
                  ? styles.touchableCardOverlayInverse
                  : styles.touchableCardOverlay;

        const ariaLabel =
            ariaLabelProp ||
            [title, headlineText, pretitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                dataAttributes={dataAttributes}
                ref={ref}
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                aria-label={isTouchable ? undefined : ariaLabelProp}
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
                        aria-label={isTouchable ? ariaLabel : undefined}
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
                                    <div
                                        style={applyCssVars({
                                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                        })}
                                    >
                                        <Box paddingBottom={withGradient ? 0 : 40} paddingX={24}>
                                            {icon}
                                        </Box>
                                    </div>
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
                                        <DisplayCardContent
                                            title={
                                                title ? (
                                                    <Text6
                                                        forceMobileSizes
                                                        truncate={titleLinesMax}
                                                        as={titleAs}
                                                        textShadow={textShadow}
                                                        hyphens="auto"
                                                    >
                                                        {title}
                                                    </Text6>
                                                ) : undefined
                                            }
                                            headline={headline}
                                            pretitle={
                                                pretitle ? (
                                                    <Text2
                                                        forceMobileSizes
                                                        truncate={pretitleLinesMax}
                                                        as="div"
                                                        regular
                                                        textShadow={textShadow}
                                                    >
                                                        {pretitle}
                                                    </Text2>
                                                ) : undefined
                                            }
                                            description={
                                                description ? (
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
                                                ) : undefined
                                            }
                                            extra={extra}
                                            headlineRef={headlineRef}
                                            extraRef={extraRef}
                                        />

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
            dataAttributes={{'component-name': 'DisplayMediaCard', ...dataAttributes}}
        />
    )
);

export const DisplayDataCard = React.forwardRef<HTMLDivElement, DisplayDataCardProps>(
    ({dataAttributes, ...props}, ref) => (
        <DisplayCard
            {...props}
            ref={ref}
            dataAttributes={{'component-name': 'DisplayDataCard', ...dataAttributes}}
        />
    )
);

interface PosterCardBaseProps {
    /** @deprecated use aria-label */
    ariaLabel?: string;
    'aria-label'?: string;
    aspectRatio?: AspectRatio | number;
    width?: number | string;
    height?: number | string;
    icon?: React.ReactElement;
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    onClose?: () => void;
    dataAttributes?: DataAttributes;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
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
            ariaLabel: deprecatedAriaLabel,
            ['aria-label']: ariaLabelProp = deprecatedAriaLabel,
            actions,
            onClose,
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleAs = 'h3',
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            extra,
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
        const {text: headlineText, ref: headlineRef} = useInnerText();
        const {text: extraText, ref: extraRef} = useInnerText();

        if (hasVideo) {
            actions = videoAction ? [videoAction] : [];
        }

        const isExternalInverse = useIsInverseVariant();
        const withGradient = hasImage || hasVideo;
        const textShadow = withGradient ? '0 0 16px rgba(0,0,0,0.4)' : undefined;
        const hasTopActions = actions?.length || onClose;
        const {textPresets} = useTheme();

        const isTouchable = !!(touchableProps.href || touchableProps.to || touchableProps.onPress);
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

        const ariaLabel =
            ariaLabelProp ||
            [title, headlineText, pretitle, subtitle, description, extraText].filter(Boolean).join(' ');

        return (
            <CardContainer
                width={width}
                height={height}
                dataAttributes={{'component-name': 'PosterCard', ...dataAttributes}}
                ref={ref}
                aspectRatio={aspectRatio}
                className={styles.touchableContainer}
                aria-label={isTouchable ? undefined : ariaLabelProp}
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
                        aria-label={isTouchable ? ariaLabel : undefined}
                    >
                        {isTouchable && <div className={overlayStyle} />}

                        <div className={styles.displayCardContainer} aria-hidden={isTouchable}>
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
                                    <div
                                        style={applyCssVars({
                                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                        })}
                                    >
                                        <Box
                                            paddingBottom={withGradient ? 0 : 40}
                                            paddingX={{mobile: 16, desktop: 24}}
                                        >
                                            {icon}
                                        </Box>
                                    </div>
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
                                    <DisplayCardContent
                                        title={
                                            title ? (
                                                <Text
                                                    desktopSize={20}
                                                    mobileSize={18}
                                                    mobileLineHeight="24px"
                                                    desktopLineHeight="28px"
                                                    truncate={titleLinesMax}
                                                    weight={textPresets.cardTitle.weight}
                                                    as={titleAs}
                                                >
                                                    {title}
                                                </Text>
                                            ) : undefined
                                        }
                                        headline={headline}
                                        pretitle={
                                            pretitle ? (
                                                <Text2
                                                    forceMobileSizes
                                                    truncate={pretitleLinesMax}
                                                    as="div"
                                                    regular
                                                    textShadow={textShadow}
                                                >
                                                    {pretitle}
                                                </Text2>
                                            ) : undefined
                                        }
                                        subtitle={
                                            subtitle ? (
                                                <Text2
                                                    forceMobileSizes
                                                    truncate={subtitleLinesMax}
                                                    as="div"
                                                    regular
                                                    textShadow={textShadow}
                                                >
                                                    {subtitle}
                                                </Text2>
                                            ) : undefined
                                        }
                                        description={
                                            description ? (
                                                <Text2
                                                    forceMobileSizes
                                                    truncate={descriptionLinesMax}
                                                    as="p"
                                                    regular
                                                    textShadow={textShadow}
                                                    color={
                                                        withGradient
                                                            ? vars.colors.textPrimary
                                                            : vars.colors.textSecondary
                                                    }
                                                >
                                                    {description}
                                                </Text2>
                                            ) : undefined
                                        }
                                        headlineRef={headlineRef}
                                        extra={extra}
                                        extraRef={extraRef}
                                    />
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
