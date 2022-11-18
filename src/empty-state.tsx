import * as React from 'react';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import classnames from 'classnames';
import {useIsInverseVariant} from './theme-variant-context';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from './button';
import {useTheme} from './hooks';
import Stack from './stack';
import {Text3, Text6} from './text';
import ButtonGroup from './button-group';
import * as styles from './empty-state.css';
import {vars} from './skins/skin-contract.css';
import {AspectRatioElement} from './utils/aspect-ratio-support';
import {getPrefixedDataAttributes} from './utils/dom';
import {sprinkles} from './sprinkles.css';

import type {ButtonGroupProps} from './button-group';
import type {DataAttributes, RendersNullableElement} from './utils/types';

interface BaseProps {
    title: string;
    button?: RendersNullableElement<typeof ButtonPrimary> | RendersNullableElement<typeof ButtonSecondary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
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
    icon: React.ReactElement;

    imageUrl?: undefined;
    largeImageUrl?: undefined;
}

const getBorderStyle = (isInverse: boolean) => {
    if (isInverse) {
        return styles.inverseBorder;
    }

    return sprinkles({border: 'regular'});
};

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
    const {colors, isDarkMode} = useTheme();
    const isInverse = useIsInverseVariant();

    const image = imageUrl ? <img className={styles.smallImage} alt="" src={imageUrl} /> : undefined;

    const buttons: ButtonGroupProps = {
        ...(button?.type === ButtonPrimary ? {primaryButton: button} : {secondaryButton: button}),
        link: buttonLink,
    };

    return (
        <div
            className={classnames(styles.container, getBorderStyle(isInverse))}
            style={assignInlineVars({
                [styles.vars.backgroundColor]:
                    isInverse && !isDarkMode ? vars.colors.backgroundBrand : vars.colors.backgroundContainer,
            })}
            aria-label={ariaLabel}
            role="region"
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <div style={{flex: 1}}>
                <Stack
                    space={24}
                    className={
                        largeImageUrl ? styles.contentVariants.largeImage : styles.contentVariants.default
                    }
                >
                    {image ?? (icon && <div className={styles.iconContainer}>{icon}</div>)}
                    <Stack space={16}>
                        <Text6 as="h1">{title}</Text6>
                        <Text3 regular as="p" color={isInverse ? colors.inverse : colors.textSecondary}>
                            {description}
                        </Text3>
                    </Stack>
                    {button && <ButtonGroup {...buttons} />}
                </Stack>
            </div>
            <div style={{flex: 1, position: 'relative'}}>
                {largeImageUrl && (
                    <AspectRatioElement
                        aspectRatio={16 / 9}
                        className={styles.largeImageContainer}
                        height="100%"
                    >
                        <div
                            className={styles.largeImage}
                            style={{backgroundImage: `url(${largeImageUrl})`}}
                        />
                    </AspectRatioElement>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
