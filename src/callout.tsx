import * as React from 'react';
import Stack from './stack';
import {useTheme} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {createUseStyles} from './jss';
import {Text2, Text3} from './text';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import classNames from 'classnames';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import ButtonGroup from './button-group';

import type {ButtonProps, ButtonLinkProps} from './button';

const useStyles = createUseStyles(({colors}) => ({
    container: {
        background: colors.backgroundAlternative,
        borderRadius: 4,
        padding: 16,
        overflow: 'hidden',
        display: 'flex',
        minHeight: 56,
        '& > *': {
            flexShrink: 0,
        },
    },
    icon: {
        display: 'flex',
        marginRight: 16,
    },
    content: {
        alignSelf: 'center',
        flex: 1,
    },
    overInverse: {
        background: colors.backgroundContainer,
    },
}));

type Props = {
    title?: string;
    description: string;
    onClose?: () => void;
    icon?: React.ReactElement;
    button?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
    buttonLink?: React.ReactElement<ButtonLinkProps, typeof ButtonLink>;
    children?: void;
    'aria-label'?: string;
};

const Callout: React.FC<Props> = ({
    title,
    description,
    icon,
    onClose,
    button,
    secondaryButton,
    buttonLink,
    'aria-label': ariaLabel,
}) => {
    const needsButtonLinkAlignment = buttonLink && !button;
    const isInverse = useIsInverseVariant();
    const classes = useStyles({needsButtonLinkAlignment});
    const {colors, texts} = useTheme();
    return (
        <section
            className={classNames(classes.container, {[classes.overInverse]: isInverse})}
            aria-label={ariaLabel ?? title}
        >
            <ThemeVariant isInverse={false}>
                {icon && <div className={classes.icon}>{icon}</div>}
                <div className={classes.content}>
                    <Stack space={16}>
                        <>
                            <Text3 as="h2" regular>
                                {title}
                            </Text3>
                            <Text2 as="p" regular color={colors.textSecondary}>
                                {description}
                            </Text2>
                        </>
                        {(button || secondaryButton || buttonLink) && (
                            <ButtonGroup
                                primaryButton={button}
                                secondaryButton={secondaryButton}
                                link={buttonLink}
                            />
                        )}
                    </Stack>
                </div>
                {onClose && (
                    <IconButton
                        size={40}
                        style={{
                            display: 'flex',
                            margin: '-8px -12px -8px 0',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={onClose}
                        aria-label={texts.closeButtonLabel}
                    >
                        <IconCloseRegular color={colors.neutralHigh} />
                    </IconButton>
                )}
            </ThemeVariant>
        </section>
    );
};

export default Callout;
