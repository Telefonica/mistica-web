import * as React from 'react';
import Box from './box';
import {Boxed} from './boxed';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import {useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import {createUseStyles} from './jss';
import Stack from './stack';
import {Text2, Text4} from './text';

import type {DataAttributes} from './utils/types';

const useStyles = createUseStyles((theme) => ({
    container: {
        [theme.mq.desktopOrBigger]: {
            maxWidth: 392,
        },
    },
    image: {
        height: 80,
        [theme.mq.mobile]: {
            height: 64,
        },
    },
    actions: {
        marginLeft: ({needsButtonLinkAlignment}) => (needsButtonLinkAlignment ? -6 : 0),
    },
}));

interface CommonProps {
    title: string;
    button?: React.ReactElement<typeof ButtonPrimary> | React.ReactElement<typeof ButtonSecondary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
    description?: string;
    children?: void;
    'aria-label'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
}

interface IconProps extends CommonProps {
    icon: React.ReactElement<any>;
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
    buttonLink,
    icon,
    imageUrl,
    'aria-label': ariaLabel,
    dataAttributes,
}) => {
    const {colors} = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useStyles({needsButtonLinkAlignment});
    const {isMobile} = useScreenSize();

    let image;
    if (imageUrl) {
        image = <img className={classes.image} alt="" src={imageUrl} />;
    }

    return (
        <Boxed dataAttributes={dataAttributes}>
            <Box paddingY={isMobile ? 24 : 40} paddingX={isMobile ? 16 : 40}>
                <article className={classes.container} aria-label={ariaLabel}>
                    <Stack space={16}>
                        {image ?? icon}
                        <Box paddingRight={isMobile ? 48 : 0}>
                            <Stack space={8}>
                                <Text4 regular>{title}</Text4>
                                <Text2 regular color={colors.textSecondary}>
                                    {description}
                                </Text2>
                            </Stack>
                        </Box>
                        {(button || buttonLink) && (
                            <div className={classes.actions}>
                                <Inline space={16} alignItems="center">
                                    {button}
                                    {buttonLink}
                                </Inline>
                            </div>
                        )}
                    </Stack>
                </article>
            </Box>
        </Boxed>
    );
};

export default EmptyStateCard;
