import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {pxToRem} from './utils/css';
import {getPrefixedDataAttributes} from './utils/dom';
import {useTheme} from './hooks';

import type {FontWeight} from './skins/types';
import type {DataAttributes} from './utils/types';

const useStyles = createUseStyles((theme) => {
    const mapToWeight: Record<string, number> = {
        light: 300,
        regular: 400,
        medium: 500,
    };
    const inverseColorsMap: Record<string, string> = {
        [theme.colors.textPrimary]: theme.colors.textPrimaryInverse,
        [theme.colors.textSecondary]: theme.colors.textSecondaryInverse,
        [theme.colors.textLink]: theme.colors.textLinkInverse,
    };

    const lineClamp = ({truncate}: {truncate: boolean | number}) => {
        if (truncate === true) {
            return 1;
        }
        if (truncate) {
            return truncate;
        }
        return 'initial';
    };

    return {
        text: {
            lineHeight: ({desktopLineHeight}) => pxToRem(desktopLineHeight),
            textTransform: ({transform}) => transform || 'inherit',
            fontSize: ({desktopSize}) => pxToRem(desktopSize),
            fontWeight: ({weight}) => (weight ? mapToWeight[weight] : 'inherit'),
            color: ({isInverse, color = theme.colors.textPrimary}) =>
                isInverse ? inverseColorsMap[color] ?? color : color,
            textDecoration: (p) => p.decoration ?? 'inherit',
            letterSpacing: ({letterSpacing}) => letterSpacing,
            overflowWrap: ({wordBreak}) => (wordBreak ? 'anywhere' : 'inherit'),
            '@supports not (overflow-wrap: anywhere)': {
                // "overflow-wrap: anywhere" is not supported in Safari
                // "word-break: break-word" has the same effect as "word-break: normal" and "overflow-wrap: anywhere",
                // regardless of the actual value of the overflow-wrap property.
                wordBreak: ({wordBreak}) => (wordBreak ? 'break-word' : 'inherit'),
            },
            // Needed to reset the default browser margin that adds to p, h1, h2... elements.
            margin: 0,

            [theme.mq.tabletOrSmaller]: {
                lineHeight: ({mobileLineHeight}) => pxToRem(mobileLineHeight),
                fontSize: ({mobileSize}) => pxToRem(mobileSize),
            },
        },
        truncate: {
            '-webkit-line-clamp': lineClamp,
            lineClamp,
            wordBreak: ({truncate}) => (truncate === 1 || truncate === true ? 'break-all' : 'break-word'),
            '@supports (overflow-wrap: anywhere)': {
                overflowWrap: 'anywhere',
                wordBreak: ({truncate}) => (truncate === 1 || truncate === true ? 'break-all' : 'normal'),
            },
            display: '-webkit-box',
            boxOrient: 'vertical',
            overflow: 'hidden',
        },
    };
});

export interface TextPresetProps {
    color?: string;
    decoration?: 'underline' | 'line-through' | 'inherit' | 'none';
    transform?: 'uppercase' | 'capitalize' | 'lowercase' | 'inherit' | 'none';
    children?: React.ReactNode;
    truncate?: boolean | number;
    wordBreak?: boolean;
    id?: string;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-level'?: number;
    dataAttributes?: DataAttributes;
}

interface TextProps extends TextPresetProps {
    weight?: FontWeight | boolean;
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
    color,
    decoration,
    truncate,
    transform,
    wordBreak,
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
    const classes = useStyles({
        isInverse,
        mobileSize,
        desktopSize,
        mobileLineHeight,
        desktopLineHeight,
        weight,
        color,
        decoration,
        transform,
        wordBreak,
        letterSpacing,
        truncate,
    });
    if (!children && children !== 0) {
        return null;
    }
    const className = classnames(classes.text, {[classes.truncate]: !!truncate});
    return React.createElement(
        as,
        {className, id, role, 'aria-level': ariaLevel, ...getPrefixedDataAttributes(dataAttributes)},
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

const getRegularOrMediumWeight = (props: RegularMediumProps) =>
    (props.regular && 'regular') || (props.medium && 'medium');
const getWeight = (props: LightRegularMediumProps) =>
    (props.light && 'light') || (props.regular && 'regular') || (props.medium && 'medium');

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
        weight={getRegularOrMediumWeight(props)}
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
        weight={getRegularOrMediumWeight(props)}
        {...props}
    >
        {props.children}
    </Text>
);

export default Text;
