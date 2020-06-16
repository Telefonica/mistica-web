import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

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
            lineHeight: ({lineHeight}) => lineHeight ?? 'initial',
            textTransform: ({uppercase}) => (uppercase ? 'uppercase' : 'inherit'),
            fontSize: ({size}) => size,
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

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

export type TextProps = {
    size: number;
    lineHeight?: string | number;
    color?: string;
    textDecoration?: 'underline' | 'line-through';
    children?: React.ReactNode;
    weight?: FontWeight;
    truncate?: boolean;
    uppercase?: boolean;
    as?: React.ComponentType<any> | string;
};

const Text: React.FC<TextProps> = ({
    size,
    weight,
    color,
    textDecoration,
    lineHeight,
    truncate,
    uppercase,
    as = 'span',
    children,
}) => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({size, isInverse, weight, lineHeight, color, textDecoration, uppercase});
    if (!children) {
        return null;
    }
    const className = classnames(classes.text, {[classes.truncate]: truncate});

    return React.createElement(as, {className}, children);
};

export default Text;
