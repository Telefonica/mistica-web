import * as React from 'react';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './blocks.css';
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

interface BlockContentProps {
    title?: string;
    description?: string | Array<string>;
}

const BlockContent: React.FC<BlockContentProps> = ({title, description}) => {
    const normalizedDescription =
        description && Array.isArray(description) ? (
            description.map((paragraph, i) => (
                <Text2 regular color={vars.colors.textSecondary} key={i}>
                    {paragraph}
                </Text2>
            ))
        ) : (
            <Text2 regular color={vars.colors.textSecondary}>
                {description}
            </Text2>
        );

    return (
        <div className={styles.column}>
            {title && (
                <Text3 regular color={vars.colors.textPrimary}>
                    {title}
                </Text3>
            )}

            {!!description && normalizedDescription}
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
    description?: string | Array<string>;
    value: string;
    secondaryValue?: string;
    valueColor?: string;
    'aria-label'?: string;
}

export const InformationBlock: React.FC<InformationBlockProps> = ({
    title,
    description,
    secondaryValue,
    value,
    valueColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}) => {
    return (
        <Inline space="between" alignItems="flex-end" aria-label={ariaLabel}>
            <BlockContent title={title} description={description} />
            <div className={classNames(styles.column, styles.container)}>
                <Text2 regular color={vars.colors.textSecondary}>
                    {secondaryValue}
                </Text2>
                <Text5 color={valueColor}>{value}</Text5>
            </div>
        </Inline>
    );
};

interface HighlightedValueBlockProps {
    tag?: RendersNullableElement<typeof Tag>;

    mainHeading: {
        value: string;
        text: string;
    };

    secondHeading?: {
        value: string;
        text: string;
    };

    secondaryValue?: string;

    title?: string;
    description?: string | Array<string>;

    valueColor?: string;
    'aria-label'?: string;
}

export const HighlightedValueBlock: React.FC<HighlightedValueBlockProps> = ({
    tag,
    mainHeading,
    secondHeading,
    secondaryValue,
    title,
    description,
    valueColor = vars.colors.textPrimary,
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
                <Inline space={8} alignItems="baseline">
                    <Text8 color={valueColor}>{mainHeading.value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {mainHeading.text}
                    </Text2>
                </Inline>
                {secondHeading && (
                    <Inline space={8} alignItems="baseline">
                        <Text8 color={valueColor}>{secondHeading.value}</Text8>
                        <Text2 regular color={vars.colors.textSecondary}>
                            {secondHeading.text}
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
                <BlockContent title={title} description={description} />
            </div>
        </div>
    );
};

interface ValueBlockProps {
    title?: string;
    value?: string;
    description?: string | Array<string>;
    valueColor?: string;
    'aria-label'?: string;
}

export const ValueBlock: React.FC<ValueBlockProps> = ({
    title,
    value,
    description,
    valueColor = vars.colors.textPrimary,
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
            <Text8 color={valueColor}>{value}</Text8>
            <BlockContent description={description} />
        </div>
    );
};

interface ProgressBlockProps {
    title?: string;
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;

    progressPercent?: number;
    reverse?: boolean;

    value: string;
    text: string;
    description?: string;

    valueColor?: string;
    'aria-label'?: string;
}

export const ProgressBlock: React.FC<ProgressBlockProps> = ({
    title,
    stackingGroup,
    progressPercent,
    reverse,
    value,
    text,
    description,
    valueColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}) => {
    const hasHeader = !!title || !!progressPercent;

    return (
        <div aria-label={ariaLabel}>
            <div>
                {title && (
                    <Box paddingBottom={progressPercent ? 8 : 0}>
                        <Inline space="between" alignItems="flex-end">
                            <div style={{paddingRight: '32px'}}>
                                <Text2 regular>{title}</Text2>
                            </div>
                            {stackingGroup && <div style={{zIndex: '0'}}>{stackingGroup}</div>}
                        </Inline>
                    </Box>
                )}
                {progressPercent && <ProgressBar progressPercent={progressPercent} reverse={reverse} />}
            </div>

            <Box paddingTop={hasHeader ? 8 : 0}>
                <Inline space={8} alignItems="baseline">
                    <Text8 color={valueColor}>{value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {text}
                    </Text2>
                </Inline>
                {description && (
                    <Box paddingTop={8}>
                        <Text2 regular color={vars.colors.textSecondary}>
                            {description}
                        </Text2>
                    </Box>
                )}
            </Box>
        </div>
    );
};
