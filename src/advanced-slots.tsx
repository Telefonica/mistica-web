import * as React from 'react';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './advanced-slots.css';
import {Text2, Text3, Text5, Text8} from './text';
import {vars} from './skins/skin-contract.css';
import Inline from './inline';
import Box from './box';
import ProgressBar from './progress-bar';
import classNames from 'classnames';

import type StackingGroup from './stacking-group';
import type Image from './image';
import type Tag from './tag';
import type {RendersNullableElement} from './utils/renders-element';

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

interface RowBlockProps {
    title?: string;
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;
    description?: string;
    'aria-label'?: string;
}

export const RowBlock: React.FC<RowBlockProps> = ({
    title,
    stackingGroup,
    description,
    'aria-label': ariaLabel,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
            aria-label={ariaLabel}
        >
            {(title || stackingGroup || description) && (
                <>
                    {stackingGroup && (
                        <div
                            className={sprinkles({
                                display: 'flex',
                                justifyContent: 'space-between',
                                flex: 1,
                                alignItems: 'center',
                            })}
                        >
                            {title && (
                                <div style={{paddingRight: '32px'}}>
                                    <Text2 regular>{title}</Text2>
                                </div>
                            )}
                            <div style={{zIndex: '0'}}>{stackingGroup}</div>
                        </div>
                    )}
                    {!stackingGroup && (
                        <div
                            className={sprinkles({
                                display: 'flex',
                                justifyContent: 'space-between',
                                flex: 1,
                                alignItems: 'center',
                            })}
                        >
                            {title && (
                                <div style={{paddingRight: '32px'}}>
                                    <Text2 regular as="div">
                                        {title}
                                    </Text2>
                                </div>
                            )}
                            <div>
                                <Text2 regular color={vars.colors.textSecondary}>
                                    {description}
                                </Text2>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

interface SimpleBlockProps {
    image?: RendersNullableElement<typeof Image>;
    description?: string;
    'aria-label'?: string;
}

export const SimpleBlock: React.FC<SimpleBlockProps> = ({image, description, 'aria-label': ariaLabel}) => {
    return (
        <div aria-label={ariaLabel}>
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
                        style={{zIndex: '0'}}
                    >
                        {image}
                    </div>
                )}

                <Text2 regular color={vars.colors.textSecondary}>
                    {description}
                </Text2>
            </div>
        </div>
    );
};

interface InformationBlockProps {
    title?: string;
    subtitle?: string;
    description?: string;
    mainValue: string;
    secundaryValue?: string;
    textColor?: string;
    'aria-label'?: string;
}

export const InformationBlock: React.FC<InformationBlockProps> = ({
    title,
    subtitle,
    description,
    secundaryValue,
    mainValue,
    textColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}) => {
    return (
        <Inline space="between" alignItems="flex-end" aria-label={ariaLabel}>
            <SlotContent title={title} subtitle={subtitle} description={description} />
            <div className={classNames(styles.column, styles.container)}>
                <Text2 regular color={vars.colors.textSecondary}>
                    {secundaryValue}
                </Text2>
                <Text5 color={textColor}>{mainValue}</Text5>
            </div>
        </Inline>
    );
};

interface HighlightedValueBlockProps {
    tag?: RendersNullableElement<typeof Tag>;

    value: 'string';
    text: 'string';

    value2?: 'string';
    text2?: 'string';

    secondaryValue?: 'string';

    title?: 'string';
    subtitle?: 'string';
    description?: 'string';

    textColor?: string;
    'aria-label'?: string;
}

export const HighlightedValueBlock: React.FC<HighlightedValueBlockProps> = ({
    tag,
    value,
    text,
    value2,
    text2,
    secondaryValue,
    title,
    subtitle,
    description,
    textColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}) => {
    return (
        <div aria-label={ariaLabel}>
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
                    <Text8 color={textColor}>{value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {text}
                    </Text2>
                </Inline>
                {value2 && (
                    <Inline space={8} alignItems="flex-end">
                        <Text8 color={textColor}>{value2}</Text8>
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

interface ValueBlockProps {
    title?: string;
    value?: string;
    subtitle?: string;
    description?: string;
    textColor?: string;
    'aria-label'?: string;
}

export const ValueBlock: React.FC<ValueBlockProps> = ({
    title,
    value,
    subtitle,
    description,
    textColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}) => {
    return (
        <div
            aria-label={ariaLabel}
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Text2 regular color={vars.colors.textPrimary}>
                {title}
            </Text2>
            <Text8 color={textColor}>{value}</Text8>
            <Text2 regular color={vars.colors.textSecondary}>
                {subtitle}
            </Text2>
            <Text2 regular color={vars.colors.textSecondary}>
                {description}
            </Text2>
        </div>
    );
};

interface ProgressBlockProps {
    title?: string;
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;

    progressPercent?: number;

    value: string;
    text: string;

    textColor?: string;
    'aria-label'?: string;
}

export const ProgressBlock: React.FC<ProgressBlockProps> = ({
    title,
    stackingGroup,
    progressPercent,
    value,
    text,
    textColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}) => {
    return (
        <div aria-label={ariaLabel}>
            {progressPercent && (
                <div>
                    {title && (
                        <Box paddingBottom={8}>
                            <Inline space="between" alignItems="flex-end">
                                <div style={{paddingRight: '32px'}}>
                                    <Text2 regular>{title}</Text2>
                                </div>
                                {stackingGroup && <div style={{zIndex: '0'}}>{stackingGroup}</div>}
                            </Inline>
                        </Box>
                    )}
                    <ProgressBar progressPercent={progressPercent} reverse={false} />
                </div>
            )}
            <Box paddingTop={8}>
                <Inline space={8} alignItems="flex-end">
                    <Text8 color={textColor}>{value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {text}
                    </Text2>
                </Inline>
            </Box>
        </div>
    );
};
