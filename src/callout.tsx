import * as React from 'react';
import Stack from './stack';
import {useTheme} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {createUseStyles} from './jss';
import {Text2, Text3} from './text';
import IconClose from './icons/icon-close';
import IconButton from './icon-button';
import classNames from 'classnames';
import Box from './box';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import Inline from './inline';

const useStyles = createUseStyles(({colors}) => ({
    container: {
        background: colors.backgroundAlternative,
        borderRadius: 4,
        padding: 16,
        overflow: 'hidden',
        display: 'flex',
        minHeight: 56,
    },
    content: {
        alignSelf: 'center',
        flex: 1,
    },
    inverse: {
        background: colors.backgroundContainer,
    },
    iconButton: {
        marginTop: -8,
        marginRight: -8,
    },
    actions: {
        marginLeft: ({needsButtonLinkAlignment}) => (needsButtonLinkAlignment ? -6 : 0),
    },
}));

type Props = {
    title?: string;
    description: string;
    onClose?: () => void;
    icon?: React.ReactElement<any>;
    button?: React.ReactElement<typeof ButtonPrimary> | React.ReactElement<typeof ButtonSecondary>;
    buttonLink?: React.ReactElement<typeof ButtonLink>;
};

const Callout: React.FC<Props> = ({title, description, icon, onClose, button, buttonLink}) => {
    const needsButtonLinkAlignment = buttonLink && !button;
    const isInverse = useIsInverseVariant();
    const classes = useStyles({needsButtonLinkAlignment});
    const {colors, texts} = useTheme();
    return (
        <section role="alert" className={classNames(classes.container, {[classes.inverse]: isInverse})}>
            <ThemeVariant isInverse={false}>
                {icon && <Box paddingRight={16}>{icon}</Box>}
                <div className={classes.content}>
                    <Stack space={16}>
                        <div>
                            <Text3 as="h2" regular>
                                {title}
                            </Text3>
                            <Text2 as="p" regular color={colors.textSecondary}>
                                {description}
                            </Text2>
                        </div>
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
                {onClose && (
                    <Box paddingLeft={8}>
                        <IconButton
                            className={classes.iconButton}
                            onPress={onClose}
                            label={texts.closeButtonLabel}
                        >
                            <IconClose color={colors.neutralHigh} />
                        </IconButton>
                    </Box>
                )}
            </ThemeVariant>
        </section>
    );
};

export default Callout;
