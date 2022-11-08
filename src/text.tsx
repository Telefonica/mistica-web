import * as React from 'react';
import classnames from 'classnames';
import {assignInlineVars} from '@vanilla-extract/dynamic';
import {useIsInverseVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import * as styles from './text.css';

import type {FontWeight} from './skins/types';
import type {DataAttributes} from './utils/types';

const mapToWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
};

const inverseColorsMap = {
    [vars.colors.textPrimary]: vars.colors.textPrimaryInverse,
    [vars.colors.textSecondary]: vars.colors.textSecondaryInverse,
    [vars.colors.textLink]: vars.colors.textLinkInverse,
};

const lineClamp = (truncate?: boolean | number) => {
    if (truncate === true) {
        return 1;
    }
    if (truncate) {
        return truncate;
    }
    return 'initial';
};

export interface TextPresetProps {
    color?: string;
    decoration?: 'underline' | 'line-through' | 'inherit' | 'none';
    transform?: 'uppercase' | 'capitalize' | 'lowercase' | 'inherit' | 'none';
    children?: React.ReactNode;
    truncate?: boolean | number;
    wordBreak?: boolean;
    hyphens?: 'auto' | 'manual' | 'none';
    id?: string;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-level'?: number;
    dataAttributes?: DataAttributes;
}

interface TextProps extends TextPresetProps {
    weight?: FontWeight;
    /** in pixels, will be converted to rem in runtime */
    size?: number;
    /** in pixels, will be converted to rem in runtime */
    mobileSize?: number;
    /** in pixels, will be converted to rem in runtime */
    desktopSize?: number;
    /** in pixels, will be converted to rem in runtime */
    lineHeight?: string | number;
    /** in pixels, will be converted to rem in runtime */
    mobileLineHeight?: string | number;
    /** in pixels, will be converted to rem in runtime */
    desktopLineHeight?: string | number;
    letterSpacing?: number;
}

export const Text: React.FC<TextProps> = ({
    weight,
    color = vars.colors.textPrimary,
    decoration,
    truncate,
    transform,
    wordBreak = true,
    hyphens,
    as = 'span',
    children,
    size,
    mobileSize = size,
    desktopSize = size,
    lineHeight,
    mobileLineHeight = lineHeight,
    desktopLineHeight = lineHeight,
    letterSpacing,
    id,
    role,
    'aria-level': ariaLevel,
    dataAttributes,
}) => {
    const isInverse = useIsInverseVariant();
    const lineClampValue = lineClamp(truncate);

    if (!children && children !== 0) {
        return null;
    }
    const className = classnames(styles.text, {
        [styles.truncateToOneLine]: truncate === 1 || truncate === true,
        [styles.truncateToMoreThanOneLine]: truncate && truncate > 1,
    });

    const sizeVars = assignInlineVars({
        [styles.vars.mobileSize]: mobileSize ? pxToRem(mobileSize) : '',
        [styles.vars.mobileLineHeight]: mobileLineHeight ? pxToRem(mobileLineHeight) : '',
        [styles.vars.desktopSize]: desktopSize ? pxToRem(desktopSize) : '',
        [styles.vars.desktopLineHeight]: desktopLineHeight ? pxToRem(desktopLineHeight) : '',
    });
    const textVars = truncate
        ? assignInlineVars({
              [styles.vars.lineClamp]: String(lineClampValue),
              [styles.vars.wordBreak]: wordBreak ? 'break-word' : 'inherit',
          })
        : assignInlineVars({[styles.vars.wordBreak]: wordBreak ? 'break-word' : 'inherit'});

    return React.createElement(
        as,
        {
            className,
            id,
            role,
            'aria-level': ariaLevel,
            ...getPrefixedDataAttributes(dataAttributes),
            style: {
                ...sizeVars,
                ...textVars,
                margin: 0, // Needed to reset the default browser margin that adds to p, h1, h2... elements.
                hyphens,
                letterSpacing,
                fontWeight: weight ? mapToWeight[weight] : 'inherit',
                textTransform: transform || 'inherit',
                textDecoration: decoration ?? 'inherit',
                overflowWrap: wordBreak ? 'anywhere' : 'inherit',
                color: isInverse ? inverseColorsMap[color] ?? color : color,
            },
        },
        children
    );
};

interface LightProps extends TextPresetProps {
    light: boolean;
    regular?: undefined;
    medium?: undefined;
}

interface MediumProps extends TextPresetProps {
    light?: undefined;
    regular?: undefined;
    medium: boolean;
}

interface RegularProps extends TextPresetProps {
    light?: undefined;
    regular: boolean;
    medium?: undefined;
}

type RegularMediumProps = RegularProps | MediumProps;
type LightRegularMediumProps = LightProps | RegularProps | MediumProps;

const getWeight = (props: LightRegularMediumProps) => {
    if (props.light) {
        return 'light';
    }
    if (props.regular) {
        return 'regular';
    }
    if (props.medium) {
        return 'medium';
    }
    return undefined;
};

export const Text10: React.FC<TextPresetProps> = (props) => {
    const {textPresets} = useTheme();
    return (
        <Text
            mobileSize={32}
            mobileLineHeight="40px"
            desktopSize={64}
            desktopLineHeight="72px"
            weight={textPresets.text10.weight}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export const Text9: React.FC<TextPresetProps> = (props) => {
    const {textPresets} = useTheme();
    return (
        <Text
            mobileSize={32}
            mobileLineHeight="40px"
            desktopSize={56}
            desktopLineHeight="64px"
            weight={textPresets.text9.weight}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export const Text8: React.FC<TextPresetProps> = (props) => {
    const {textPresets} = useTheme();
    return (
        <Text
            mobileSize={32}
            mobileLineHeight="40px"
            desktopSize={48}
            desktopLineHeight="56px"
            weight={textPresets.text8.weight}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export const Text7: React.FC<TextPresetProps> = (props) => {
    const {textPresets} = useTheme();
    return (
        <Text
            mobileSize={28}
            mobileLineHeight="32px"
            desktopSize={40}
            desktopLineHeight="48px"
            weight={textPresets.text7.weight}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export const Text6: React.FC<TextPresetProps> = (props) => {
    const {textPresets} = useTheme();
    return (
        <Text
            mobileSize={24}
            mobileLineHeight="32px"
            desktopSize={32}
            desktopLineHeight="40px"
            weight={textPresets.text6.weight}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export const Text5: React.FC<TextPresetProps> = (props) => {
    const {textPresets} = useTheme();
    return (
        <Text
            mobileSize={22}
            mobileLineHeight="24px"
            desktopSize={28}
            desktopLineHeight="32px"
            weight={textPresets.text5.weight}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export const Text4: React.FC<LightRegularMediumProps> = (props) => (
    <Text
        mobileSize={18}
        mobileLineHeight="24px"
        desktopSize={20}
        desktopLineHeight="28px"
        weight={getWeight(props)}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text3: React.FC<LightRegularMediumProps> = (props) => (
    <Text mobileSize={16} desktopSize={18} lineHeight="24px" weight={getWeight(props)} {...props}>
        {props.children}
    </Text>
);

export const Text2: React.FC<RegularMediumProps> = (props) => (
    <Text
        mobileSize={14}
        mobileLineHeight="20px"
        desktopSize={16}
        desktopLineHeight="24px"
        weight={getWeight(props)}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text1: React.FC<RegularMediumProps> = (props) => (
    <Text
        mobileSize={12}
        mobileLineHeight="16px"
        desktopSize={14}
        desktopLineHeight="20px"
        weight={getWeight(props)}
        {...props}
    >
        {props.children}
    </Text>
);

export default Text;
