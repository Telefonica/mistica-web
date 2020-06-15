// @flow
import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

const mapToWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
};

const useStyles = createUseStyles((theme) => ({
    text: {
        lineHeight: ({lineHeight}) => lineHeight ?? 'initial',
        textTransform: ({uppercase}) => (uppercase ? 'uppercase' : 'inherit'),
        fontSize: ({size}) => size,
        fontWeight: ({weight}) => {
            if (!weight) {
                return 'inherit';
            }

            return mapToWeight[weight];
        },
        color: ({isInverse, color = theme.colors.textPrimary}) => {
            if (isInverse) {
                const inverseColorsMap: {[string]: string, ...} = {
                    [(theme.colors.textPrimary: string)]: theme.colors.textPrimaryInverse,
                    [(theme.colors.textSecondary: string)]: theme.colors.textButtonPrimaryInverseDisabled,
                };

                return inverseColorsMap[color] ?? color;
            }
            return color;
        },
        textDecoration: (p) => p.textDecoration,
    },
    truncate: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
    },
}));

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

export type TextProps = {
    size: number,
    lineHeight?: string | number,
    color?: string,
    textDecoration?: 'underline' | 'line-through',
    children?: React.Node,
    weight?: FontWeight,
    truncate?: boolean,
    uppercase?: boolean,
    as?: React.ComponentType<mixed> | string,
};

const Text = ({
    size,
    weight,
    color,
    textDecoration,
    lineHeight,
    truncate,
    uppercase,
    as = 'span',
    children,
}: TextProps): React.Node => {
    const isInverse = useIsInverseVariant();
    const classes = useStyles({size, isInverse, weight, lineHeight, color, textDecoration, uppercase});
    if (!children) {
        return null;
    }
    const className = classnames(classes.text, {[classes.truncate]: truncate});

    return React.createElement(as, {className}, children);
};

export default Text;
