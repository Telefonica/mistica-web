import * as React from 'react';
import Stack from '../stack';
import * as styles from './blocks.css';
import {Text2, Text3, Text5, Text8} from '../text';
import {vars} from '../skins/skin-contract.css';
import Inline from '../inline';
import Box from '../box';
import ProgressBar from '../progress-bar';
import classNames from 'classnames';

import type StackingGroup from '../stacking-group';
import type Image from '../image';
import type Tag from '../tag';
import type {RendersNullableElement} from '../utils/renders-element';
import type {ExclusifyUnion} from '../utils/utility-types';

interface BlockContentProps {
    title?: string;
    description?: Array<string>;
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

interface RowBlockBaseProps {
    title?: string;
    'aria-label'?: string;
}

interface RowBlockWithDescription extends RowBlockBaseProps {
    description?: string;
}

interface RowBlockWithStackingGroup extends RowBlockBaseProps {
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;
}

type RowBlockProps = ExclusifyUnion<RowBlockWithDescription | RowBlockWithStackingGroup>;

export const RowBlock: React.FC<RowBlockProps> = ({
    title,
    stackingGroup,
    description,
    'aria-label': ariaLabel,
}) => {
    return (
        <div aria-label={ariaLabel}>
            <Inline space="between" alignItems="center">
                {title && (
                    <Box paddingRight={32}>
                        <Text2 regular>{title}</Text2>
                    </Box>
                )}
                {stackingGroup ? (
                    stackingGroup
                ) : (
                    <Text2 regular color={vars.colors.textSecondary}>
                        {description}
                    </Text2>
                )}
            </Inline>
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
            <Inline space={16} alignItems="center">
                {image}
                <Text2 regular color={vars.colors.textSecondary}>
                    {description}
                </Text2>
            </Inline>
        </div>
    );
};

interface InformationBlockProps {
    title?: string;
    description?: Array<string>;
    value?: number;
    secondaryValue?: number;
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
            <div className={classNames(styles.column, styles.rightContent)}>
                <Text2 regular color={vars.colors.textSecondary}>
                    {secondaryValue}
                </Text2>
                <Text5 color={valueColor}>{value}</Text5>
            </div>
        </Inline>
    );
};

interface HighlightedValueBlockProps {
    headline?: RendersNullableElement<typeof Tag>;

    mainHeading: {
        value: number;
        text: string;
    };

    secondHeading?: {
        value: number;
        text: string;
    };

    secondaryValue?: number;

    title?: string;
    description?: Array<string>;

    valueColor?: string;
    'aria-label'?: string;
}

export const HighlightedValueBlock: React.FC<HighlightedValueBlockProps> = ({
    headline,
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
            {headline && <Box paddingBottom={24}>{headline}</Box>}

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
            {title || description ? (
                <Box paddingTop={8}>
                    <BlockContent title={title} description={description} />
                </Box>
            ) : null}
        </div>
    );
};

interface ValueBlockProps {
    title?: string;
    value?: string;
    description?: Array<string>;
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
        <div aria-label={ariaLabel} className={styles.column}>
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

    heading: {
        value: number;
        valueColor?: string;
        text: string;
    };

    description?: string;
    'aria-label'?: string;
}

export const ProgressBlock: React.FC<ProgressBlockProps> = ({
    title,
    stackingGroup,
    progressPercent,
    reverse,
    heading,
    description,
    'aria-label': ariaLabel,
}) => {
    return (
        <div aria-label={ariaLabel}>
            <Stack space={8}>
                <Inline space="between" alignItems="flex-end">
                    <Box paddingRight={32}>
                        <Text2 regular>{title}</Text2>
                    </Box>
                    {stackingGroup}
                </Inline>
                {progressPercent && <ProgressBar progressPercent={progressPercent} reverse={reverse} />}
                <Inline space={8} alignItems="baseline">
                    <Text8 color={heading.valueColor || vars.colors.textPrimary}>{heading.value}</Text8>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {heading.text}
                    </Text2>
                </Inline>
                {description && (
                    <Text2 regular color={vars.colors.textSecondary}>
                        {description}
                    </Text2>
                )}
            </Stack>
        </div>
    );
};
