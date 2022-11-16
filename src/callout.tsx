import * as React from 'react';
import Stack from './stack';
import Inline from './inline';
import Box from './box';
import {useTheme} from './hooks';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {Text2, Text3} from './text';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import IconButton from './icon-button';
import classNames from 'classnames';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import ButtonGroup from './button-group';
import * as styles from './callout.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

import type {RendersNullableElement} from './utils/types';

type Props = {
    title?: string;
    description: string;
    onClose?: () => void;
    icon?: React.ReactElement;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
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
    const isInverse = useIsInverseVariant();
    const {colors, texts} = useTheme();
    return (
        <section
            className={classNames(styles.container, {
                [sprinkles({background: vars.colors.backgroundContainer})]: isInverse,
            })}
            aria-label={ariaLabel ?? title}
        >
            <ThemeVariant isInverse={false}>
                {icon && <Box paddingRight={16}>{icon}</Box>}
                <div className={styles.content}>
                    <Stack space={16}>
                        <Inline fullWidth alignItems="flex-start" space="between">
                            <Stack space={4}>
                                <Text3 as="h2" regular>
                                    {title}
                                </Text3>
                                <Text2 as="p" regular color={colors.textSecondary}>
                                    {description}
                                </Text2>
                            </Stack>
                            {onClose && (
                                <IconButton
                                    size={40}
                                    style={{
                                        display: 'flex',
                                        margin: '-8px -12px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={onClose}
                                    aria-label={texts.closeButtonLabel}
                                >
                                    <IconCloseRegular size={24} color={colors.neutralHigh} />
                                </IconButton>
                            )}
                        </Inline>
                        {(button || secondaryButton || buttonLink) && (
                            <ButtonGroup
                                primaryButton={button}
                                secondaryButton={secondaryButton}
                                link={buttonLink}
                            />
                        )}
                    </Stack>
                </div>
            </ThemeVariant>
        </section>
    );
};

export default Callout;
