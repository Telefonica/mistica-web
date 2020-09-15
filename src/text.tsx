import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {useScreenSize} from './hooks';

const useStyles = createUseStyles((theme) => {
    const mapToWeight: Record<string, number> = {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
    };

    const inverseColorsMap: Record<string, string> = {
        [theme.colors.textPrimary]: theme.colors.textPrimaryInverse,
        [theme.colors.textSecondary]: theme.colors.textButtonPrimaryInverseDisabled,
    };

    return {
        text: {
            lineHeight: ({isMobile, mobileLineHeight, desktopLineHeight}) =>
                isMobile ? mobileLineHeight : desktopLineHeight,
            textTransform: ({uppercase}) => (uppercase ? 'uppercase' : 'inherit'),
            fontSize: ({isMobile, mobileSize, desktopSize}) => (isMobile ? mobileSize : desktopSize),
            fontWeight: ({weight}) => (weight ? mapToWeight[weight] : 'inherit'),
            color: ({isInverse, color = theme.colors.textPrimary}) =>
                isInverse ? inverseColorsMap[color] ?? color : color,
            textDecoration: (p) => p.textDecoration,
        },
        truncate: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'block',
        },
    };
});

type FontWeight = 'light' | 'regular' | 'medium';

interface CommonProps {
    color?: string;
    textDecoration?: 'underline' | 'line-through';
    children?: React.ReactNode;
    truncate?: boolean;
    uppercase?: boolean;
    id?: string;
    as?: React.ComponentType<any> | string;
    role?: string;
    'aria-level'?: number;
}

interface CommonTextProps extends CommonProps {
    weight?: FontWeight | boolean;
    mobileSize: number;
    desktopSize: number;
    mobileLineHeight: string | number;
    desktopLineHeight: string | number;
}

const Text: React.FC<CommonTextProps> = ({
    weight,
    color,
    textDecoration,
    truncate,
    uppercase,
    as = 'span',
    children,
    mobileSize,
    desktopSize,
    mobileLineHeight,
    desktopLineHeight,
    ...otherProps
}) => {
    const isInverse = useIsInverseVariant();
    const {isMobile} = useScreenSize();
    const classes = useStyles({
        isMobile,
        isInverse,
        mobileSize,
        desktopSize,
        mobileLineHeight,
        desktopLineHeight,
        weight,
        color,
        textDecoration,
        uppercase,
    });
    if (!children) {
        return null;
    }
    const className = classnames(classes.text, {[classes.truncate]: truncate});

    return React.createElement(as, {className, ...otherProps}, children);
};

interface LightProps extends CommonProps {
    light?: boolean;
    regular?: undefined;
    medium?: undefined;
}

interface MediumProps extends CommonProps {
    light?: undefined;
    regular?: undefined;
    medium?: boolean;
}

interface RegularProps extends CommonProps {
    light?: undefined;
    regular?: boolean;
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

export const Text1: React.FC<CommonProps> = (props) => (
    <Text
        mobileSize={32}
        mobileLineHeight="40px"
        desktopSize={40}
        desktopLineHeight="48px"
        weight="light"
        {...props}
    >
        {props.children}
    </Text>
);

export const Text2: React.FC<CommonProps> = (props) => (
    <Text
        mobileSize={28}
        mobileLineHeight="32px"
        desktopSize={40}
        desktopLineHeight="48px"
        weight="light"
        {...props}
    >
        {props.children}
    </Text>
);

export const Text3: React.FC<CommonProps> = (props) => (
    <Text
        mobileSize={24}
        mobileLineHeight="32px"
        desktopSize={32}
        desktopLineHeight="40px"
        weight="light"
        {...props}
    >
        {props.children}
    </Text>
);

export const Text4: React.FC<CommonProps> = (props) => (
    <Text
        mobileSize={22}
        mobileLineHeight="24px"
        desktopSize={28}
        desktopLineHeight="32px"
        weight="light"
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
        {...props}
    >
        {props.children}
    </Text>
);

export const Text6: React.FC<LightRegularMediumProps> = (props) => (
    <Text
        mobileSize={16}
        mobileLineHeight="24px"
        desktopSize={18}
        desktopLineHeight="24px"
        weight={getAllWeights(props)}
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
