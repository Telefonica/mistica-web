import * as React from 'react';
import Box from './box';
import {Boxed} from './boxed';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import {useScreenSize, useTheme} from './hooks';
import Inline from './inline';
import {createUseStyles} from './jss';
import Stack from './stack';
import {Text2, Text4} from './text';

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

type Props = {
    title: string;
    button?: React.ReactElement<typeof ButtonPrimary> | React.ReactElement<typeof ButtonSecondary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
    icon: React.ReactElement<any> | string;
    description?: string;
};

const EmptyState: React.FC<Props> = ({title, description, button, buttonLink, icon}) => {
    const {colors} = useTheme();
    const needsButtonLinkAlignment = buttonLink && !button;
    const classes = useStyles({needsButtonLinkAlignment});
    const {isMobile} = useScreenSize();

    let image;
    if (typeof icon === 'string') {
        image = <img className={classes.image} alt="" src={icon} />;
    }

    return (
        <Boxed>
            <Box paddingY={isMobile ? 24 : 40} paddingX={isMobile ? 16 : 40}>
                <div className={classes.container}>
                    <Stack space={16}>
                        {image ?? icon}
                        <Box paddingRight={isMobile ? 48 : 0}>
                            <Stack space={8}>
                                <Text4 light>{title}</Text4>
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
                </div>
            </Box>
        </Boxed>
    );
};

export default EmptyState;
