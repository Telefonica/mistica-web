import * as React from 'react';
import Box from './box';
import {Boxed} from './boxed';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import {useScreenSize, useTheme} from './hooks';
import {createUseStyles} from './jss';
import Stack from './stack';
import {Text2, Text4} from './text';
import ButtonGroup from './button-group';

import type {DataAttributes, RendersNullableElement} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    container: {
        [theme.mq.desktopOrBigger]: {
            maxWidth: 392,
        },
    },
    image: {
        height: 80,
        display: 'block', // to avoid letter's descenders bottom space
        [theme.mq.tabletOrSmaller]: {
            height: 64,
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

interface CommonProps {
    title: string;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    description?: string;
    children?: void;
    'aria-label'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
}

interface IconProps extends CommonProps {
    icon: React.ReactElement;
    imageUrl?: undefined;
}

interface ImageProps extends CommonProps {
    imageUrl: string;
    icon?: undefined;
}

type Props = IconProps | ImageProps;

const EmptyStateCard: React.FC<Props> = ({
    title,
    description,
    button,
    secondaryButton,
    buttonLink,
    icon,
    imageUrl,
    'aria-label': ariaLabel,
    dataAttributes,
}) => {
    const {colors} = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useStyles({needsButtonLinkAlignment});
    const {isTabletOrSmaller} = useScreenSize();

    let image;
    if (imageUrl) {
        image = <img className={classes.image} alt="" src={imageUrl} />;
    }
    if (process.env.NODE_ENV !== 'production' && button && !button?.props?.small) {
        console.error('button property in EmptyStateCard must be a a small Button. Set small prop to true');
    }
    return (
        <Boxed dataAttributes={dataAttributes}>
            <Box paddingY={isTabletOrSmaller ? 24 : 40} paddingX={isTabletOrSmaller ? 16 : 40}>
                <section className={classes.container} aria-label={ariaLabel}>
                    <Stack space={16}>
                        {image ?? (icon && <div className={classes.iconContainer}>{icon}</div>)}
                        <Box>
                            <Stack space={8}>
                                <Text4 regular>{title}</Text4>
                                <Text2 regular color={colors.textSecondary}>
                                    {description}
                                </Text2>
                            </Stack>
                        </Box>
                        {(button || secondaryButton || buttonLink) && (
                            <ButtonGroup
                                primaryButton={button}
                                secondaryButton={secondaryButton}
                                link={buttonLink}
                            />
                        )}
                    </Stack>
                </section>
            </Box>
        </Boxed>
    );
};

export default EmptyStateCard;
