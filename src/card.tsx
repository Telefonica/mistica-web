import * as React from 'react';
import {Inline, Text4, Text2, Text1, createUseStyles, useTheme, ButtonPrimary, ButtonLink, Box} from '.';
import PromoTag from './promo-tag';
import Stack from './stack';

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
    headline?: string;
    pretitle?: string;
    title?: string;
    subtitle?: string;
    description: string;
    body?: React.ReactNode;
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
    button,
    buttonLink,
}) => {
    const theme = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useCardContentStyles({needsButtonLinkAlignment});
    return (
        <>
            <Stack space={16}>
                <Stack space={8}>
                    <header>
                        <Stack space={4}>
                            {headline && <PromoTag>{headline}</PromoTag>}
                            {pretitle && (
                                <Box paddingTop={4}>
                                    <Text1 regular uppercase>
                                        {pretitle}
                                    </Text1>
                                </Box>
                            )}
                            <Text4 as="h1" light>
                                {title}
                            </Text4>
                            <Text2 regular>{subtitle}</Text2>
                        </Stack>
                    </header>
                    <Text2 as="p" regular color={theme.colors.textSecondary}>
                        {description}
                    </Text2>
                </Stack>
                {body && <div>{body}</div>}
            </Stack>
            {(button || buttonLink) && (
                <div className={classes.actions}>
                    <Inline space={16}>
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

const useMediaCardStyles = createUseStyles((theme) => ({
    mediaCard: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        height: '100%',
        border: `1px solid ${theme.colors.border}`,
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
        background: theme.colors.background,
        padding: 16,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'column',
    },
}));

type MediaCardProps = {
    media: CardMedia;
    headline?: string;
    pretitle?: string;
    title?: string;
    description: string;
    body?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
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
}) => {
    const classes = useMediaCardStyles({media});
    return (
        <article className={classes.mediaCard}>
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
        </article>
    );
};

const useDataCardStyles = createUseStyles((theme) => ({
    dataCard: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        padding: '24px 16px',
        height: '100%',
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
    },
}));

interface DataCardProps {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement<any>;
    headline?: string;
    title: string;
    subtitle?: string;
    description: string;
    body?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
}

export const DataCard: React.FC<DataCardProps> = ({
    icon,
    headline,
    title,
    subtitle,
    description,
    body,
    button,
    buttonLink,
}) => {
    const classes = useDataCardStyles();
    return (
        <article className={classes.dataCard}>
            {icon && <Box paddingBottom={16}>{icon}</Box>}
            <CardContent
                headline={headline}
                title={title}
                subtitle={subtitle}
                description={description}
                body={body}
                button={button}
                buttonLink={buttonLink}
            />
        </article>
    );
};
