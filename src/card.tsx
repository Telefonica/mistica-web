import * as React from 'react';
import Tag from './tag';
import Stack from './stack';
import {useTheme} from './hooks';
import Box from './box';
import {Text1, Text2, Text4} from './text';
import {createUseStyles} from './jss';
import {ButtonLink, ButtonPrimary} from './button';
import {Boxed} from './boxed';
import ButtonGroup from './button-group';
import Video from './video';
import Image, {DisableBorderRadiusProvider} from './image';
import MaybeDismissable, {useIsDismissable} from './maybe-dismissable';
import Touchable from './touchable';

import type {DataAttributes, RendersElement, RendersNullableElement, TrackingEvent} from './utils/types';

const useCardContentStyles = createUseStyles(() => ({
    actions: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
    },
}));

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
    const theme = useTheme();
    const classes = useCardContentStyles();
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
        <Stack space={16}>
            <Stack space={8}>
                {(headline || pretitle || title || subtitle) && (
                    <header>
                        <Stack space={8}>
                            {renderHeadline()}
                            <Stack space={4}>
                                {pretitle && (
                                    <Text1
                                        wordBreak
                                        truncate={pretitleLinesMax}
                                        regular
                                        transform="uppercase"
                                    >
                                        {pretitle}
                                    </Text1>
                                )}
                                <Text4 wordBreak truncate={titleLinesMax} as="h1" regular>
                                    {title}
                                </Text4>
                                <Text2 wordBreak truncate={subtitleLinesMax} regular>
                                    {subtitle}
                                </Text2>
                            </Stack>
                        </Stack>
                    </header>
                )}

                {description && (
                    <Text2
                        wordBreak
                        truncate={descriptionLinesMax}
                        as="p"
                        regular
                        color={theme.colors.textSecondary}
                    >
                        {description}
                    </Text2>
                )}
            </Stack>

            {extra && <div>{extra}</div>}

            {(button || buttonLink) && (
                <div className={classes.actions}>
                    <ButtonGroup primaryButton={button} link={buttonLink} />
                </div>
            )}
        </Stack>
    );
};

type MaybeSectionProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    className?: string;
};

const MaybeSection = ({'aria-label': ariaLabel, className, children}: MaybeSectionProps) => {
    const isDismissable = useIsDismissable();
    if (isDismissable) {
        return <div className={className}>{children}</div>;
    } else {
        return (
            <section className={className} aria-label={ariaLabel}>
                {children}
            </section>
        );
    }
};

const useMediaCardStyles = createUseStyles(() => ({
    boxed: {
        height: '100%',
        width: '100%',
    },
    mediaCard: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 16,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'column',
    },
}));

type MediaCardProps = {
    media: RendersElement<typeof Image> | RendersElement<typeof Video>;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
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
            title,
            titleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        const classes = useMediaCardStyles({media});

        const content = (
            <Boxed className={classes.boxed} dataAttributes={dataAttributes} ref={ref}>
                <MaybeSection className={classes.mediaCard} aria-label={ariaLabel}>
                    <DisableBorderRadiusProvider>{media}</DisableBorderRadiusProvider>
                    <div className={classes.content}>
                        <CardContent
                            headline={headline}
                            pretitle={pretitle}
                            pretitleLinesMax={pretitleLinesMax}
                            title={title}
                            titleLinesMax={titleLinesMax}
                            description={description}
                            descriptionLinesMax={descriptionLinesMax}
                            extra={extra}
                            button={button}
                            buttonLink={buttonLink}
                        />
                    </div>
                </MaybeSection>
            </Boxed>
        );
        return (
            <MaybeDismissable onClose={onClose} aria-label={ariaLabel}>
                {content}
            </MaybeDismissable>
        );
    }
);

const useDataCardStyles = createUseStyles(() => ({
    boxed: {
        height: '100%',
        width: '100%',
    },
    dataCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        height: '100%',
    },
}));

interface DataCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement;
    headline?: string | RendersNullableElement<typeof Tag>;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
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
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,
            extra,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        const classes = useDataCardStyles();
        const content = (
            <Boxed className={classes.boxed} dataAttributes={dataAttributes} ref={ref}>
                <MaybeSection className={classes.dataCard} aria-label={ariaLabel}>
                    {icon && <Box paddingBottom={16}>{icon}</Box>}
                    <CardContent
                        headline={headline}
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
                </MaybeSection>
            </Boxed>
        );
        return (
            <MaybeDismissable aria-label={ariaLabel} onClose={onClose}>
                {content}
            </MaybeDismissable>
        );
    }
);

const useSnapCardStyles = createUseStyles((theme) => ({
    boxed: {
        height: '100%',
    },
    touchable: {
        display: 'flex',
        height: '100%',
        [theme.mq.supportsHover]: {
            '&:hover': {
                backgroundColor: ({isTouchable, isInverse}) =>
                    // @todo: define hover background color for inverse and for dark mode
                    isTouchable && !isInverse && !theme.isDarkMode
                        ? theme.colors.backgroundAlternative
                        : 'transparent',
            },
        },
    },
    snapCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        minHeight: 80,
        minWidth: 104,
        [theme.mq.desktopOrBigger]: {
            padding: 24,
        },
    },
}));

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
        const isTouchable = Boolean(touchableProps.to || touchableProps.href || touchableProps.onPress);
        const classes = useSnapCardStyles({isTouchable, isInverse, hasIcon: !!icon});
        const {colors} = useTheme();

        return (
            <Boxed className={classes.boxed} dataAttributes={dataAttributes} ref={ref} isInverse={isInverse}>
                <Touchable maybe {...touchableProps} className={classes.touchable} aria-label={ariaLabel}>
                    <section className={classes.snapCard}>
                        <div>
                            {icon && <Box paddingBottom={16}>{icon}</Box>}
                            <Stack space={4}>
                                {title && (
                                    <Text2 wordBreak truncate={titleLinesMax} as="h1" regular>
                                        {title}
                                    </Text2>
                                )}
                                {subtitle && (
                                    <Text2
                                        wordBreak
                                        truncate={subtitleLinesMax}
                                        regular
                                        color={colors.textSecondary}
                                    >
                                        {subtitle}
                                    </Text2>
                                )}
                            </Stack>
                        </div>
                        {extra && <Box paddingTop={16}>{extra}</Box>}
                    </section>
                </Touchable>
            </Boxed>
        );
    }
);
