import * as React from 'react';
import Stack from '../stack';
import * as styles from './blocks.css';
import * as mediaStyles from '../image.css';
import {Text2, Text3, Text5, Text8} from '../text';
import {vars} from '../skins/skin-contract.css';
import Inline from '../inline';
import Box from '../box';
import {ProgressBar} from '../progress-bar';
import classNames from 'classnames';
import {applyCssVars} from '../utils/css';

import type StackingGroup from '../stacking-group';
import type Image from '../image';
import type Tag from '../tag';
import type {RendersNullableElement} from '../utils/renders-element';
import type {ExclusifyUnion} from '../utils/utility-types';

interface BlockContentProps {
    title?: string;
    description?: ReadonlyArray<string> | string;
}

const BlockContent = ({title, description}: BlockContentProps) => {
    const descriptionLines = typeof description === 'string' ? [description] : description;
    return (
        <div className={styles.column}>
            <Text3 regular color={vars.colors.textPrimary}>
                {title}
            </Text3>

            {descriptionLines &&
                descriptionLines.map((paragraph, i) => (
                    <Text2 regular color={vars.colors.textSecondary} as="p" key={i}>
                        {paragraph}
                    </Text2>
                ))}
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

export const RowBlock = ({
    title,
    stackingGroup,
    description,
    'aria-label': ariaLabel,
}: RowBlockProps): JSX.Element => {
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
                    <Text2 regular color={vars.colors.textSecondary} textAlign="right" as="div">
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
    rightText?: string;
}

export const SimpleBlock = ({
    image,
    description,
    'aria-label': ariaLabel,
    rightText,
}: SimpleBlockProps): JSX.Element => {
    return (
        <div aria-label={ariaLabel}>
            <Inline space="between" alignItems="center">
                <Inline space={16} alignItems="center">
                    <div
                        style={applyCssVars({
                            [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                        })}
                    >
                        {image}
                    </div>
                    <Text2 regular color={vars.colors.textSecondary}>
                        {description}
                    </Text2>
                </Inline>
                {rightText && (
                    <div className={styles.rightContent}>
                        <Text2 regular color={vars.colors.textBrand}>
                            {rightText}
                        </Text2>
                    </div>
                )}
            </Inline>
        </div>
    );
};

interface InformationBlockProps {
    title?: string;
    description?: ReadonlyArray<string> | string;
    value?: string;
    secondaryValue?: string;
    valueColor?: string;
    'aria-label'?: string;
}

export const InformationBlock = ({
    title,
    description,
    secondaryValue,
    value,
    valueColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}: InformationBlockProps): JSX.Element => {
    return (
        <Inline space="between" alignItems="flex-end" aria-label={ariaLabel}>
            <BlockContent title={title} description={description} />
            <div className={classNames(styles.column, styles.rightContent)}>
                <Text2 regular color={vars.colors.textSecondary} decoration="line-through">
                    {secondaryValue}
                </Text2>
                <Text5 color={valueColor}>{value}</Text5>
            </div>
        </Inline>
    );
};

interface Heading {
    value: string;
    text?: string;
    valueColor?: string;
}

interface HighlightedValueBlockProps {
    headline?: RendersNullableElement<typeof Tag>;
    headings?: ReadonlyArray<Heading>;
    title?: string;
    pretitle?: string;
    description?: ReadonlyArray<string> | string;
    strikedValue?: string;
    'aria-label'?: string;
}

export const HighlightedValueBlock = ({
    headline,
    headings,
    title,
    pretitle,
    description,
    strikedValue,
    'aria-label': ariaLabel,
}: HighlightedValueBlockProps): JSX.Element => {
    return (
        <div aria-label={ariaLabel}>
            {headline && <Box paddingBottom={24}>{headline}</Box>}
            <Stack space={2}>
                {pretitle && <Text2 regular>{pretitle}</Text2>}
                {strikedValue && (
                    <Text2 regular color={vars.colors.textSecondary} decoration="line-through">
                        {strikedValue}
                    </Text2>
                )}
            </Stack>
            {headings && (
                <Stack space={2}>
                    {headings.map((heading, index) => (
                        <Inline key={index} space={8} alignItems="baseline">
                            <Text8 color={heading.valueColor ?? vars.colors.textPrimary}>
                                {heading.value}
                            </Text8>
                            <Text2 regular color={vars.colors.textSecondary}>
                                {heading.text}
                            </Text2>
                        </Inline>
                    ))}
                </Stack>
            )}
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
    description?: ReadonlyArray<string> | string;
    valueColor?: string;
    'aria-label'?: string;
}

export const ValueBlock = ({
    title,
    value,
    description,
    valueColor = vars.colors.textPrimary,
    'aria-label': ariaLabel,
}: ValueBlockProps): JSX.Element => {
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
        value: string;
        valueColor?: string;
        text: string;
    };

    description?: string;
    'aria-label'?: string;
}

export const ProgressBlock = ({
    title,
    stackingGroup,
    progressPercent,
    reverse,
    heading,
    description,
    'aria-label': ariaLabel,
}: ProgressBlockProps): JSX.Element => {
    return (
        <div aria-label={ariaLabel}>
            <Stack space={8}>
                <Inline space="between" alignItems="flex-end">
                    <Box paddingRight={32}>
                        <Text2 regular>{title}</Text2>
                    </Box>
                    {stackingGroup}
                </Inline>
                {progressPercent !== undefined && (
                    <ProgressBar aria-hidden progressPercent={progressPercent} reverse={reverse} />
                )}
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
