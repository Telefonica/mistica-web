'use client';
import * as React from 'react';
import Box from './box';
import {Boxed} from './boxed';
import {useTheme} from './hooks';
import Stack from './stack';
import {Text2, Text, useTextPresetSizes} from './text';
import ButtonGroup from './button-group';
import * as styles from './empty-state-card.css';
import {vars} from './skins/skin-contract.css';

import type {ButtonLink, ButtonPrimary, ButtonSecondary} from './button';
import type {DataAttributes, HeadingType, RendersNullableElement} from './utils/types';

interface CommonProps {
    title: string;
    titleAs?: HeadingType;
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
    asset: React.ReactElement;
    imageUrl?: undefined;
}

interface ImageProps extends CommonProps {
    imageUrl: string;
    asset?: undefined;
}

type Props = IconProps | ImageProps;

const EmptyStateCard = ({
    title,
    titleAs = 'h3',
    description,
    button,
    secondaryButton,
    buttonLink,
    asset,
    imageUrl,
    'aria-label': ariaLabel,
    dataAttributes,
}: Props): JSX.Element => {
    const {textPresets} = useTheme();
    const text4Sizes = useTextPresetSizes('text4');

    let image;
    if (imageUrl) {
        image = <img className={styles.image} alt="" src={imageUrl} />;
    }
    if (process.env.NODE_ENV !== 'production' && button && !button?.props?.small) {
        console.error('button property in EmptyStateCard must be a a small Button. Set small prop to true');
    }
    return (
        <Boxed dataAttributes={dataAttributes}>
            <Box paddingY={{mobile: 24, desktop: 40}} paddingX={{mobile: 16, desktop: 40}}>
                <section className={styles.container} aria-label={ariaLabel}>
                    <Stack space={16}>
                        {image ?? (asset && <div className={styles.assetContainer}>{asset}</div>)}
                        <Box>
                            <Stack space={8}>
                                <Text {...text4Sizes} weight={textPresets.cardTitle.weight} as={titleAs}>
                                    {title}
                                </Text>
                                <Text2 regular color={vars.colors.textSecondary}>
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
