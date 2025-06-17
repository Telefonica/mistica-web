'use client';
import * as React from 'react';
import Stack from './stack';
import Inline from './inline';
import Box from './box';
import {useTheme} from './hooks';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import {Text2, Text3} from './text';
import IconCloseRegular from './generated/mistica-icons/icon-close-regular';
import {IconButton} from './icon-button';
import classNames from 'classnames';
import ButtonGroup from './button-group';
import * as styles from './callout.css';
import * as mediaStyles from './image.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {applyCssVars} from './utils/css';
import * as tokens from './text-tokens';

import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {DataAttributes, HeadingType, RendersNullableElement} from './utils/types';

type Props = {
    title?:
        | {
              text: string;
              'aria-label'?: string;
              as?: HeadingType;
          }
        | string;
    titleAs?: HeadingType;
    description: string;
    onClose?: () => void;
    closeButtonLabel?: string;
    asset?: React.ReactElement;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    children?: void;
    'aria-label'?: string;
    dataAttributes?: DataAttributes;
    role?: string;
};

const Callout = ({
    title,
    titleAs = 'h2',
    description,
    asset,
    onClose,
    closeButtonLabel,
    button,
    secondaryButton,
    buttonLink,
    'aria-label': ariaLabel,
    dataAttributes,
    role,
}: Props): JSX.Element => {
    const variant = useThemeVariant();
    const {texts, t} = useTheme();

    const isTitleObject = typeof title === 'object';

    const titleElementType = isTitleObject ? title?.as || titleAs : titleAs;
    const titleAriaLabel = isTitleObject ? title?.['aria-label'] : undefined;
    const titleText = isTitleObject ? title?.text : title;

    return (
        <section
            className={classNames(styles.container, styles.background[variant])}
            style={applyCssVars({
                [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
            })}
            aria-label={ariaLabel}
            role={role}
            {...getPrefixedDataAttributes(dataAttributes, 'Callout')}
        >
            <ThemeVariant isInverse={false}>
                {asset && (
                    <Box paddingRight={16} dataAttributes={{testid: 'asset'}}>
                        {asset}
                    </Box>
                )}
                <div className={styles.content}>
                    <Stack space={16}>
                        <Inline fullWidth alignItems="flex-start" space="between">
                            <Stack space={4}>
                                <Text3
                                    as={titleElementType}
                                    regular
                                    dataAttributes={{testid: 'title'}}
                                    aria-label={titleAriaLabel}
                                >
                                    {titleText}
                                </Text3>
                                <Text2
                                    as="p"
                                    regular
                                    color={vars.colors.textSecondary}
                                    dataAttributes={{testid: 'description'}}
                                >
                                    {description}
                                </Text2>
                            </Stack>
                            {onClose && (
                                // Create empty div in order to fill space that iconButton occupies.
                                // Without this, the content's vertical alignment can be affected
                                <div className={styles.closeButtonContainerSize} />
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
                    {/** Put the close button after the content so that the Callout's content goes first in the reading order */}
                    {onClose && (
                        <div className={styles.closeButtonContainer}>
                            <IconButton
                                dataAttributes={{testid: 'closeButton'}}
                                small
                                bleedY
                                bleedRight
                                Icon={IconCloseRegular}
                                onPress={onClose}
                                aria-label={
                                    closeButtonLabel || texts.closeButtonLabel || t(tokens.closeButtonLabel)
                                }
                            />
                        </div>
                    )}
                </div>
            </ThemeVariant>
        </section>
    );
};

export default Callout;
