import * as React from 'react';
import Box from './box';
import {Boxed} from './boxed';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import {useScreenSize, useTheme} from './hooks';
import Stack from './stack';
import {Text2, Text4, Text6} from './text';
import {createUseStyles} from './jss';
import Inline from './inline';
import {getPrefixedDataAttributes} from './utils/dom';

import type {ButtonProps} from './button';
import type {DataAttributes} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    container: {
        [theme.mq.tabletOrSmaller]: {
            maxWidth: 368,
        },
    },

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
        backgroundImage: ({largeImageUrl}) => `url(${largeImageUrl})`,
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        flex: 1,
    },
    largeImage: {
        width: '100%',
        aspectRatio: '16/9',
    },
    smallImage: {
        height: 128,
        [theme.mq.tabletOrSmaller]: {
            height: 112,
        },
    },
    iconContainer: {
        width: 80,
        height: 80,
        [theme.mq.tabletOrSmaller]: {
            width: 64,
            height: 64,
        },
    },
}));

interface BaseProps {
    title: string;
    button?:
        | React.ReactElement<ButtonProps, typeof ButtonPrimary>
        | React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    buttonLink?: React.ReactElement<ButtonProps, typeof ButtonLink>;
    description?: string;
    children?: void;
    'aria-label'?: string;
    // "data-" prefix is automatically added. For example, use "testid" instead of "data-testid"
    dataAttributes?: DataAttributes;
}

interface ImageProps extends BaseProps {
    imageUrl: string;

    largeImageUrl?: undefined;
    icon?: undefined;
}

interface LargeImageProps extends BaseProps {
    largeImageUrl: string;

    imageUrl?: undefined;
    icon?: undefined;
}

interface IconProps extends BaseProps {
    icon: React.ReactElement<any>;

    imageUrl?: undefined;
    largeImageUrl?: undefined;
}

type Props = IconProps | ImageProps | LargeImageProps;

const EmptyState: React.FC<Props> = ({
    title,
    description,
    button,
    buttonLink,
    largeImageUrl,
    imageUrl,
    icon,
    'aria-label': ariaLabel,
    dataAttributes,
}) => {
    const {colors} = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useStyles({largeImageUrl, needsButtonLinkAlignment});
    const {isTabletOrSmaller} = useScreenSize();

    let largeImage, image;
    if (largeImageUrl) {
        largeImage = <img className={classes.largeImage} alt="" src={largeImageUrl} />;
    }
    if (imageUrl) {
        image = <img className={classes.smallImage} alt="" src={imageUrl} />;
    }

    if (isTabletOrSmaller) {
        return (
            <section
                className={classes.container}
                aria-label={ariaLabel}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <Stack space={24}>
                    {largeImage ?? image ?? (icon && <div className={classes.iconContainer}>{icon}</div>)}
                    <Stack space={16}>
                        <Text4 regular>{title}</Text4>
                        <Text2 regular color={colors.textSecondary}>
                            {description}
                        </Text2>
                    </Stack>
                    {button && (
                        <Inline space={16} alignItems="center">
                            {button}
                            {buttonLink}
                        </Inline>
                    )}
                </Stack>
            </section>
        );
    }

    return (
        <Boxed dataAttributes={dataAttributes}>
            <div className={classes.desktopContainer}>
                <div className={classes.desktopContent}>
                    <Box padding={64}>
                        <Stack space={24}>
                            {image ?? (icon && <div className={classes.iconContainer}>{icon}</div>)}
                            <Stack space={16}>
                                <Text6 as="h1">{title}</Text6>
                                <Text4 light as="p" color={colors.textSecondary}>
                                    {description}
                                </Text4>
                            </Stack>
                            {button && (
                                <Inline space={16} alignItems="center">
                                    {button}
                                    {buttonLink}
                                </Inline>
                            )}
                        </Stack>
                    </Box>
                </div>
                {largeImageUrl && <div className={classes.desktopImage} />}
            </div>
        </Boxed>
    );
};

export default EmptyState;
