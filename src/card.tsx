import * as React from 'react';
import Tag from './tag';
import Stack from './stack';
import {useTheme} from './hooks';
import Box from './box';
import {Text1, Text2, Text4} from './text';
import {createUseStyles} from './jss';
import Inline from './inline';
import {ButtonLink, ButtonPrimary} from './button';
import {Boxed} from './boxed';

import type {DataAttributes} from './utils/types';

const useCardContentStyles = createUseStyles(() => ({
    actions: {
        marginLeft: ({needsButtonLinkAlignment}) => (needsButtonLinkAlignment ? -6 : 0),
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 16,
    },
}));

type CardContentProps = {
    headline?: string | React.ReactElement<typeof Tag>;
    pretitle?: string;
    title?: string;
    subtitle?: string;
    description: string;
    /** @deprecated use extra prop */
    body?: React.ReactNode;
    extra?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    title,
    subtitle,
    description,
    body,
    extra,
    button,
    buttonLink,
}) => {
    const theme = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useCardContentStyles({needsButtonLinkAlignment});
    const renderHeadline = () => {
        if (!headline) {
            return null;
        }
        if (typeof headline === 'string') {
            return <Tag color={theme.colors.promo}>{headline}</Tag>;
        }
        return headline;
    };
    return (
        <>
            <Stack space={16}>
                <Stack space={8}>
                    {(headline || pretitle || title || subtitle) && (
                        <header>
                            <Stack space={4}>
                                {renderHeadline()}
                                {pretitle && (
                                    <Box paddingTop={4}>
                                        <Text1 regular uppercase>
                                            {pretitle}
                                        </Text1>
                                    </Box>
                                )}
                                <Text4 as="h1" regular>
                                    {title}
                                </Text4>
                                <Text2 regular>{subtitle}</Text2>
                            </Stack>
                        </header>
                    )}
                    <Text2 as="p" regular color={theme.colors.textSecondary}>
                        {description}
                    </Text2>
                </Stack>
                {(extra ?? body) && <div>{extra ?? body}</div>}
            </Stack>
            {(button || buttonLink) && (
                <div className={classes.actions}>
                    <Inline space={16} alignItems="center">
                        {button}
                        {buttonLink}
                    </Inline>
                </div>
            )}
        </>
    );
};

type CardMedia =
    | {
          src: string;
          aspectRatio: number;

          height?: undefined;
      }
    | {
          src: string;
          height: number;

          aspectRatio?: undefined;
      }
    | {
          src: string;

          aspectRatio?: undefined;
          height?: undefined;
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
    media: {
        width: '100%',
        paddingTop: ({media}: {media: CardMedia}) => {
            if (media.height) {
                return media.height;
            }
            // padding percentage is relative to width. With this trick we can force aspect ratio
            if (media.aspectRatio) {
                return `${100 / media.aspectRatio}%`;
            }
            return '56.25%'; // 16/9 aspect ratio
        },
        backgroundImage: ({media}: {media: CardMedia}) => `url(${media.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    media: CardMedia;
    headline?: string | React.ReactElement<typeof Tag>;
    pretitle?: string;
    title?: string;
    description: string;
    body?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
    children?: void;
    'aria-label'?: string;
};

export const MediaCard: React.FC<MediaCardProps> = ({
    media,
    headline,
    pretitle,
    title,
    description,
    body,
    button,
    buttonLink,
    'aria-label': ariaLabel,
}) => {
    const classes = useMediaCardStyles({media});
    return (
        <Boxed className={classes.boxed}>
            <section className={classes.mediaCard} aria-label={ariaLabel}>
                <div className={classes.media}></div>
                <div className={classes.content}>
                    <CardContent
                        headline={headline}
                        pretitle={pretitle}
                        title={title}
                        description={description}
                        body={body}
                        button={button}
                        buttonLink={buttonLink}
                    />
                </div>
            </section>
        </Boxed>
    );
};

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
    icon?: React.ReactElement<any>;
    headline?: string | React.ReactElement<typeof Tag>;
    title: string;
    subtitle?: string;
    description: string;
    /** @deprecated use extra */
    body?: React.ReactNode;
    extra?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
    children?: void;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
    icon,
    headline,
    title,
    subtitle,
    description,
    body,
    extra,
    button,
    buttonLink,
    dataAttributes,
    'aria-label': ariaLabel,
}) => {
    const classes = useDataCardStyles();
    return (
        <Boxed className={classes.boxed} dataAttributes={dataAttributes}>
            <section className={classes.dataCard} aria-label={ariaLabel}>
                {icon && <Box paddingBottom={16}>{icon}</Box>}
                <CardContent
                    headline={headline}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    extra={extra ?? body}
                    button={button}
                    buttonLink={buttonLink}
                />
            </section>
        </Boxed>
    );
};
