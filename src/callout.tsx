'use client';
import * as React from 'react';
import Stack from './stack';
import Box from './box';
import {useTheme} from './hooks';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import {Text2, Text3} from './text';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {InternalIconButton} from './icon-button';
import classNames from 'classnames';
import ButtonGroup from './button-group';
import * as styles from './callout.css';
import * as mediaStyles from './image.css';
import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import {iconContainerSize} from './icon-button.css';

import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {DataAttributes, RendersNullableElement} from './utils/types';

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
    dataAttributes?: DataAttributes;
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
    dataAttributes,
}) => {
    const variant = useThemeVariant();
    const {texts} = useTheme();
    return (
        <section
            className={classNames(
                styles.container,
                sprinkles({
                    background: {
                        inverse: vars.colors.backgroundContainer,
                        alternative: vars.colors.backgroundContainer,
                        default: vars.colors.backgroundContainerAlternative,
                    }[variant],
                })
            )}
            style={applyCssVars({
                [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
            })}
            aria-label={ariaLabel ?? title}
            {...getPrefixedDataAttributes(dataAttributes, 'Callout')}
        >
            <ThemeVariant isInverse={false}>
                {icon && <Box paddingRight={16}>{icon}</Box>}
                <div
                    className={styles.content}
                    style={{
                        paddingRight: onClose ? iconContainerSize.small : undefined,
                    }}
                >
                    <Stack space={16}>
                        <Stack space={4}>
                            <Text3 as="h2" regular>
                                {title}
                            </Text3>
                            <Text2 as="p" regular color={vars.colors.textSecondary}>
                                {description}
                            </Text2>
                        </Stack>
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
                    <div className={styles.closeButtonContainer}>
                        <InternalIconButton
                            small
                            hasInteractiveAreaBleed
                            Icon={IconCloseRegular}
                            onPress={onClose}
                            aria-label={texts.closeButtonLabel}
                        />
                    </div>
                )}
            </ThemeVariant>
        </section>
    );
};

export default Callout;
