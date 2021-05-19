import * as React from 'react';
import Box from './box';
import {Boxed} from './boxed';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import {FeedbackScreen} from './feedback-screen';
import {useScreenSize, useTheme} from './hooks';
import Stack from './stack';
import {Text4, Text6} from './text';
import ResponsiveLayout from './responsive-layout';
import {createUseStyles} from './jss';
import Inline from './inline';

const useStyles = createUseStyles((theme) => ({
    desktopContainer: {
        display: 'flex',
        justifyContent: 'spaceBetween',
    },
    desktopContent: {
        [theme.mq.desktopOrBigger]: {
            width: '50%',
        },
    },
    desktopImage: {
        backgroundImage: ({imageUrl}) => `url(${imageUrl})`,
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        flex: 1,
    },
    desktopActions: {
        marginLeft: ({needsButtonLinkAlignment}) => (needsButtonLinkAlignment ? -6 : 0),
    },
    mobileImage: {
        width: '100%',
    },
    smallImage: {
        height: 128,
        [theme.mq.mobile]: {
            height: 112,
        },
    },
}));

interface BaseProps {
    title: string;
    button?: React.ReactElement<typeof ButtonPrimary> | React.ReactElement<typeof ButtonSecondary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
    description?: string;
}

interface ImageProps extends BaseProps {
    imageUrl: string;
    icon?: undefined;
}

interface IconProps extends BaseProps {
    icon: React.ReactElement<any> | string;
    imageUrl?: undefined;
}

type Props = IconProps | ImageProps;

const EmptyStateScreen: React.FC<Props> = ({title, description, button, buttonLink, imageUrl, icon}) => {
    const {colors} = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useStyles({imageUrl, needsButtonLinkAlignment});
    const {isMobile, isTablet} = useScreenSize();

    let image, smallImage;
    if (imageUrl) {
        image = <img className={classes.mobileImage} alt="" src={imageUrl} />;
    }
    if (typeof icon === 'string') {
        smallImage = <img className={classes.smallImage} alt="" src={icon} />;
    }

    if (isMobile) {
        return (
            <FeedbackScreen
                icon={image ?? smallImage ?? icon}
                title={title}
                description={description}
                primaryButton={button}
                link={buttonLink}
            />
        );
    }

    if (isTablet && image) {
        smallImage = image;
        imageUrl = undefined;
    }

    return (
        <ResponsiveLayout>
            <Boxed>
                <div className={classes.desktopContainer}>
                    <div className={classes.desktopContent}>
                        <Box padding={64} role="article">
                            <Stack space={24}>
                                {smallImage ?? icon}
                                <Stack space={16}>
                                    <Text6 as="h1">{title}</Text6>
                                    <Text4 light as="p" color={colors.textSecondary}>
                                        {description}
                                    </Text4>
                                </Stack>
                                {(button || buttonLink) && (
                                    <div className={classes.desktopActions}>
                                        <Inline space={16} alignItems="center">
                                            {button}
                                            {buttonLink}
                                        </Inline>
                                    </div>
                                )}
                            </Stack>
                        </Box>
                    </div>
                    {imageUrl && <div className={classes.desktopImage} />}
                </div>
            </Boxed>
        </ResponsiveLayout>
    );
};

export default EmptyStateScreen;
