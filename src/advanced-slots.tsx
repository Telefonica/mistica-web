import * as React from 'react';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './advanced-slots.css';
import Image from './image';

import {Text2, Text3, Text5, Text8} from './text';
import Tag from './tag';
import {vars} from './skins/skin-contract.css';

import Inline from './inline';
import Box from './box';
import ProgressBar from './progress-bar';
import classNames from 'classnames';

import type {RendersNullableElement} from './utils/renders-element';
import Avatar from './avatar';

interface SlotContentProps {
    title?: string;
    subtitle?: string;
    description?: string;
}

const SlotContent: React.FC<SlotContentProps> = ({title, subtitle, description}) => {
    return (
        <div className={styles.column}>
            <Text3 regular color={vars.colors.textPrimary}>
                {title}
            </Text3>
            <Text2 regular color={vars.colors.textSecondary}>
                {subtitle}
            </Text2>
            <Text2 regular color={vars.colors.textSecondary}>
                {description}
            </Text2>
        </div>
    );
};

interface AdvancedTravelProps {
    title?: string;
    image?: string;
    description: string;
}

export const AdvancedTravel: React.FC<AdvancedTravelProps> = ({title, image, description}) => {
    const width = description ? 271 : 263;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {(title || image || description) && (
                <>
                    {image && (
                        <>
                            {title && (
                                <Box width={width} paddingRight={32}>
                                    <Text2 medium>{title}</Text2>
                                </Box>
                            )}
                            <Box>
                                <Inline space={-12}>
                                    {Array.from({length: 3}, (_, i) => (
                                        <Avatar key={i} size={32} border src={image} />
                                    ))}
                                </Inline>
                            </Box>
                        </>
                    )}
                    {description && !image && (
                        <>
                            {title && (
                                <Box width={263} paddingRight={32}>
                                    <Text2 medium as="div">
                                        {title}
                                    </Text2>
                                </Box>
                            )}
                            <Box width={72}>
                                <Text2 medium color={vars.colors.textSecondary}>
                                    {description}
                                </Text2>
                            </Box>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

interface AdvancedSubscriptionProps {
    image?: string;
    description?: string;
}

export const AdvancedSubscription: React.FC<AdvancedSubscriptionProps> = ({image, description}) => {
    return (
        <div>
            <div
                className={sprinkles({
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                })}
            >
                {image && (
                    <div
                        className={sprinkles({
                            paddingRight: 16,
                        })}
                    >
                        <Image height={40} src={image} />
                    </div>
                )}

                <Text2 regular color={vars.colors.textSecondary}>
                    {description}
                </Text2>
            </div>
        </div>
    );
};

interface AdvancedInvoiceProps {
    title?: string;
    subtitle?: string;
    description?: string;
    mainValue: string;
    secundaryValue?: string;
}

export const AdvancedInvoice: React.FC<AdvancedInvoiceProps> = ({
    title,
    subtitle,
    description,
    secundaryValue,
    mainValue,
}) => {
    return (
        <Inline space="between" alignItems="flex-end">
            <SlotContent title={title} subtitle={subtitle} description={description} />
            <div className={classNames(styles.column, styles.container)}>
                <Text2 regular color={vars.colors.textSecondary}>
                    {secundaryValue}
                </Text2>
                <Text5 color={vars.colors.brand}>{mainValue}</Text5>
            </div>
        </Inline>
    );
};

interface AdvancedPromotionProps {
    tag?: RendersNullableElement<typeof Tag>;

    value: 'string';
    text: 'string';

    value2?: 'string';
    text2?: 'string';

    secondaryValue?: 'string';

    title?: 'string';
    subtitle?: 'string';
    description?: 'string';
}

export const AdvancedPromotion: React.FC<AdvancedPromotionProps> = ({
    tag,
    value,
    text,
    value2,
    text2,
    secondaryValue,
    title,
    subtitle,
    description,
}) => {
    return (
        <div>
            {tag && (
                <div
                    className={sprinkles({
                        paddingBottom: 24,
                    })}
                >
                    {tag}
                </div>
            )}

            <Stack space={2}>
                <Inline space={8} alignItems="flex-end">
                    <Text8 color={vars.colors.brand}>{value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {text}
                    </Text2>
                </Inline>
                {value2 && (
                    <Inline space={8} alignItems="flex-end">
                        <Text8 color={vars.colors.brand}>{value2}</Text8>
                        <Text2 regular color={vars.colors.textSecondary}>
                            {text2}
                        </Text2>
                    </Inline>
                )}
                {secondaryValue && <Text8 color={vars.colors.textSecondary}>{secondaryValue}</Text8>}
            </Stack>
            <div
                className={sprinkles({
                    paddingTop: 8,
                })}
            >
                <SlotContent title={title} subtitle={subtitle} description={description} />
            </div>
        </div>
    );
};

interface AdvancedBalanceProps {
    title?: string;
    value?: string;
    subtitle?: string;
    description?: string;
}

export const AdvancedBalance: React.FC<AdvancedBalanceProps> = ({title, value, subtitle, description}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Text2 regular color={vars.colors.textPrimary}>
                {title}
            </Text2>
            <Text8 color={vars.colors.brand}>{value}</Text8>
            <Text2 regular color={vars.colors.textSecondary}>
                {subtitle}
            </Text2>
            <Text2 regular color={vars.colors.textSecondary}>
                {description}
            </Text2>
        </div>
    );
};

interface AdvancedProductProps {
    title?: string;
    image?: string;

    progressPercent?: number;

    value: string;
    text: string;
}

export const AdvancedProduct: React.FC<AdvancedProductProps> = ({
    title,
    image,
    progressPercent,
    value,
    text,
}) => {
    return (
        <div>
            {progressPercent && (
                <div>
                    {title && (
                        <Box paddingBottom={8}>
                            <Inline space="between" alignItems="flex-end">
                                <div style={{paddingRight: '32px'}}>
                                    <Text2 regular>{title}</Text2>
                                </div>
                                {image && <Image height={40} src={image} />}
                            </Inline>
                        </Box>
                    )}
                    <ProgressBar progressPercent={progressPercent} reverse={false} />
                </div>
            )}
            <Box paddingTop={8}>
                <Inline space={8} alignItems="flex-end">
                    <Text8 color={vars.colors.brand}>{value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {text}
                    </Text2>
                </Inline>
            </Box>
        </div>
    );
};
