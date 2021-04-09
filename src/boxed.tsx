import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';

type StylesProps = {
    isInverseInside: boolean;
    isInverseOutside: boolean;
};

const useStyles = createUseStyles(({colors, isDarkMode}) => ({
    boxed: {
        backgroundColor: ({isInverseInside}: StylesProps) =>
            isInverseInside && !isDarkMode ? colors.backgroundBrand : colors.backgroundContainer,

        border: ({isInverseOutside, isInverseInside}: StylesProps) => {
            if (isInverseOutside && !isInverseInside) {
                return `1px solid ${colors.backgroundContainer}`;
            }

            if (isInverseInside && !isDarkMode) {
                return `1px solid ${colors.backgroundBrand}`;
            }

            return `1px solid ${colors.border}`;
        },
        borderRadius: 4,
        overflow: 'hidden',
    },
}));

type Props = {
    children: React.ReactNode;
    isInverse?: boolean;
    className?: string;
    role?: string;
    'data-testid'?: string;
    'data-qsysid'?: string;
};

export const Boxed: React.FC<Props> = ({
    children,
    isInverse: isInverseInside = false,
    className,
    role,
    ...dataProps
}) => {
    const isInverseOutside = useIsInverseVariant();
    const classes = useStyles({isInverseOutside, isInverseInside} as StylesProps);

    return (
        <div className={classNames(className, classes.boxed)} role={role} {...dataProps}>
            <ThemeVariant isInverse={isInverseInside}>{children}</ThemeVariant>
        </div>
    );
};
