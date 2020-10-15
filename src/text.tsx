import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {getPlatform} from './utils/platform';

const useStyles = createUseStyles((theme) => {
    const mapToWeight: Record<string, number> = {
        light: 300,
        regular: 400,
        medium: 500,
    };
    const inverseColorsMap: Record<string, string> = {
        [theme.colors.textPrimary]: theme.colors.textPrimaryInverse,
        [theme.colors.textSecondary]: theme.colors.textButtonPrimaryInverseDisabled,
    };

    return {
        text: {
            lineHeight: ({desktopLineHeight}) => desktopLineHeight,
            textTransform: ({uppercase}) => (uppercase ? 'uppercase' : 'inherit'),
            fontSize: ({desktopSize}) => desktopSize,
            fontWeight: ({weight}) => (weight ? mapToWeight[weight] : 'inherit'),
            color: ({isInverse, color = theme.colors.textPrimary}) =>
                isInverse ? inverseColorsMap[color] ?? color : color,
            textDecoration: (p) => p.textDecoration,
            letterSpacing: ({letterSpacing}) => letterSpacing,

            [theme.mq.mobile]: {
                lineHeight: ({mobileLineHeight}) => mobileLineHeight,
                fontSize: ({mobileSize}) => mobileSize,
            },
        },
        truncate: {
            lineClamp: ({lineClamp}) => lineClamp ?? 'initial',
            display: 'box',
            boxOrient: 'vertical',
            overflow: 'hidden',
        },
    };
});

type FontWeight = 'light' | 'regular' | 'medium';

export interface TextPresetProps {
    color?: string;
    textDecoration?: 'underline' | 'line-through';
    children?: React.ReactNode;
    lineClamp?: number;
    uppercase?: boolean;
    id?: string;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-level'?: number;
}

interface TextProps extends TextPresetProps {
    weight?: FontWeight | boolean;
    size?: number;
    mobileSize?: number;
    desktopSize?: number;
    lineHeight?: string | number;
    mobileLineHeight?: string | number;
    desktopLineHeight?: string | number;
    letterSpacing?: number;
}

const Text: React.FC<TextProps> = ({
    weight,
    color,
    textDecoration,
    lineClamp,
    uppercase,
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
    ...otherProps
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
        textDecoration,
        uppercase,
        letterSpacing,
        lineClamp,
    });
    if (!children) {
        return null;
    }
    const className = classnames(classes.text, {[classes.truncate]: !!lineClamp});
    return React.createElement(as, {className, id, role, 'aria-level': otherProps['aria-level']}, children);
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

type LightMediumProps = LightProps | MediumProps;
type RegularMediumProps = RegularProps | MediumProps;
type LightRegularMediumProps = LightProps | RegularProps | MediumProps;

const getLightOrMediumWeight = (props: LightMediumProps) =>
    (props.light && 'light') || (props.medium && 'medium');
const getRegularOrMediumWeight = (props: RegularMediumProps) =>
    (props.regular && 'regular') || (props.medium && 'medium');
const getAllWeights = (props: LightRegularMediumProps) =>
    (props.light && 'light') || (props.regular && 'regular') || (props.medium && 'medium');

const isIos = getPlatform({}) === 'ios';

export const Text1: React.FC<TextPresetProps> = (props) => (
    <Text
        mobileSize={32}
        mobileLineHeight="40px"
        desktopSize={40}
        desktopLineHeight="48px"
        weight="light"
        letterSpacing={isIos ? 0.41 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text2: React.FC<TextPresetProps> = (props) => (
    <Text
        mobileSize={28}
        mobileLineHeight="32px"
        desktopSize={40}
        desktopLineHeight="48px"
        weight="light"
        letterSpacing={isIos ? 0.38 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text3: React.FC<TextPresetProps> = (props) => (
    <Text
        mobileSize={24}
        mobileLineHeight="32px"
        desktopSize={32}
        desktopLineHeight="40px"
        weight="light"
        letterSpacing={isIos ? 0.07 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text4: React.FC<TextPresetProps> = (props) => (
    <Text
        mobileSize={22}
        mobileLineHeight="24px"
        desktopSize={28}
        desktopLineHeight="32px"
        weight="light"
        letterSpacing={isIos ? -0.26 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text5: React.FC<LightMediumProps> = (props) => (
    <Text
        mobileSize={18}
        mobileLineHeight="24px"
        desktopSize={20}
        desktopLineHeight="28px"
        weight={getLightOrMediumWeight(props)}
        letterSpacing={isIos ? -0.44 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text6: React.FC<LightRegularMediumProps> = (props) => (
    <Text
        mobileSize={16}
        desktopSize={18}
        lineHeight="24px"
        weight={getAllWeights(props)}
        letterSpacing={isIos ? -0.31 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text7: React.FC<RegularMediumProps> = (props) => (
    <Text
        mobileSize={14}
        mobileLineHeight="20px"
        desktopSize={16}
        desktopLineHeight="24px"
        weight={getRegularOrMediumWeight(props)}
        letterSpacing={isIos ? -0.15 : 0}
        {...props}
    >
        {props.children}
    </Text>
);

export const Text8: React.FC<RegularMediumProps> = (props) => (
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
