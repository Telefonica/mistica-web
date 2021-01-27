import * as React from 'react';
import {Inline, Text5, Text7, Text8, createUseStyles, useTheme, ButtonPrimary, ButtonLink} from '.';
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
    description: string;
    body?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    title,
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
                    {headline && <PromoTag>{headline}</PromoTag>}
                    <Stack space={4}>
                        <Text8 regular>{pretitle}</Text8>
                        <Text5 light>{title}</Text5>
                    </Stack>
                    <Text7 regular color={theme.colors.textSecondary}>
                        {description}
                    </Text7>
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
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '0 0 4px 4px',
        borderTop: 0,
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
    title,
    description,
    pretitle,
    headline,
    button,
    buttonLink,
    media,
    body,
}) => {
    const classes = useMediaCardStyles({media});
    return (
        <div className={classes.mediaCard}>
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
        </div>
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
    icon: {
        marginBottom: 16,
        width: 40,
        height: 40,
        overflow: 'hidden',
        borderRadius: '50%',
        backgroundColor: ({iconBackgroundColor}) => iconBackgroundColor ?? theme.colors.iconDisabled,
        backgroundImage: ({iconBackgroundImage}) =>
            iconBackgroundImage ? `url("${iconBackgroundImage}")` : 'initial',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

type DataCardProps = {
    /**
     * Typically a mistica-icons component element
     */
    icon?: React.ReactElement<any>;
    iconBackgroundColor?: string;
    iconBackgroundImage?: string;
    headline?: string;
    pretitle?: string;
    title: string;
    description: string;
    body?: React.ReactNode;
    button?: React.ReactElement<typeof ButtonPrimary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
};

export const DataCard: React.FC<DataCardProps> = ({
    title,
    description,
    pretitle,
    headline,
    button,
    buttonLink,
    icon,
    iconBackgroundColor,
    iconBackgroundImage,
    body,
}) => {
    const classes = useDataCardStyles({iconBackgroundColor, iconBackgroundImage});
    return (
        <div className={classes.dataCard}>
            {(icon || iconBackgroundImage) && <div className={classes.icon}>{icon}</div>}
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
    );
};
