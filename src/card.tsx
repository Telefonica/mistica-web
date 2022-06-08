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
import Touchable from './touchable';

import type {DataAttributes, RendersElement, RendersNullableElement} from './utils/types';

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
    title?: string;
    subtitle?: string;
    description?: string;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    title,
    subtitle,
    description,
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
                                    <Text1 regular transform="uppercase">
                                        {pretitle}
                                    </Text1>
                                )}
                                <Text4 as="h1" regular>
                                    {title}
                                </Text4>
                                <Text2 regular>{subtitle}</Text2>
                            </Stack>
                        </Stack>
                    </header>
                )}

                {description && (
                    <Text2 as="p" regular color={theme.colors.textSecondary}>
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

const useMediaCardStyles = createUseStyles(() => ({
    boxed: {
        height: '100%',
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
    title?: string;
    description?: string;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    'aria-label'?: string;
};

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
    (
        {media, headline, pretitle, title, description, extra, button, buttonLink, 'aria-label': ariaLabel},
        ref
    ) => {
        const classes = useMediaCardStyles({media});
        return (
            <Boxed className={classes.boxed} ref={ref}>
                <section className={classes.mediaCard} aria-label={ariaLabel}>
                    <DisableBorderRadiusProvider>{media}</DisableBorderRadiusProvider>
                    <div className={classes.content}>
                        <CardContent
                            headline={headline}
                            pretitle={pretitle}
                            title={title}
                            description={description}
                            extra={extra}
                            button={button}
                            buttonLink={buttonLink}
                        />
                    </div>
                </section>
            </Boxed>
        );
    }
);

const useDataCardStyles = createUseStyles(() => ({
    boxed: {
        height: '100%',
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
    subtitle?: string;
    description?: string;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
}

export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
    (
        {
            icon,
            headline,
            title,
            subtitle,
            description,
            extra,
            button,
            buttonLink,
            dataAttributes,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const classes = useDataCardStyles();
        return (
            <Boxed className={classes.boxed} dataAttributes={dataAttributes} ref={ref}>
                <section className={classes.dataCard} aria-label={ariaLabel}>
                    {icon && <Box paddingBottom={16}>{icon}</Box>}
                    <CardContent
                        headline={headline}
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        extra={extra}
                        button={button}
                        buttonLink={buttonLink}
                    />
                </section>
            </Boxed>
        );
    }
);

const useSnapCardStyles = createUseStyles((theme) => ({
    boxed: {
        height: '100%',
    },
    touchable: {
        height: '100%',
        [theme.mq.supportsHover]: {
            '&:hover': {
                backgroundColor: ({isTouchable}) =>
                    isTouchable ? theme.colors.backgroundAlternative : 'transparent',
            },
        },
    },
    snapCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: ({hasIcon}) => (hasIcon ? 'flex-start' : 'flex-end'),
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
    subtitle?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
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
    ({icon, title, subtitle, dataAttributes, 'aria-label': ariaLabel, ...touchableProps}, ref) => {
        const isTouchable = Boolean(touchableProps.to || touchableProps.href || touchableProps.onPress);
        const classes = useSnapCardStyles({isTouchable, hasIcon: !!icon});
        const {colors} = useTheme();

        return (
            <Boxed className={classes.boxed} dataAttributes={dataAttributes} ref={ref}>
                <Touchable maybe {...touchableProps} className={classes.touchable} aria-label={ariaLabel}>
                    <section className={classes.snapCard}>
                        {icon && <Box paddingBottom={16}>{icon}</Box>}
                        <Stack space={4}>
                            {title && (
                                <Text2 as="h1" regular>
                                    {title}
                                </Text2>
                            )}
                            {subtitle && (
                                <Text2 regular color={colors.textSecondary}>
                                    {subtitle}
                                </Text2>
                            )}
                        </Stack>
                    </section>
                </Touchable>
            </Boxed>
        );
    }
);
