import * as React from 'react';
import classNames from 'classnames';
import {createUseStyles} from './jss';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type StylesProps = {
    isInverseInside: boolean;
    isInverseOutside: boolean;
};

const useStyles = createUseStyles(({colors, isDarkMode}) => ({
    boxed: {
        background: ({isInverseInside}: StylesProps) =>
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
    // @deprecated use dataAttributes
    'data-testid'?: string;
    // @deprecated use dataAttributes
    'data-qsysid'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid",  */
    dataAttributes?: DataAttributes;
};

export const Boxed: React.FC<Props> = ({
    children,
    isInverse: isInverseInside = false,
    className,
    role,
    'data-testid': dataTestId,
    'data-qsysid': dataQsysId,
    dataAttributes,
}) => {
    const isInverseOutside = useIsInverseVariant();
    const classes = useStyles({isInverseOutside, isInverseInside} as StylesProps);

    return (
        <div
            className={classNames(className, classes.boxed)}
            role={role}
            data-testid={dataTestId}
            data-qsysid={dataQsysId}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <ThemeVariant isInverse={isInverseInside}>{children}</ThemeVariant>
        </div>
    );
};
