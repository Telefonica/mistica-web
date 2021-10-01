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
        backgroundColor: ({isInverseInside}: StylesProps) =>
            isInverseInside && !isDarkMode ? colors.backgroundBrand : colors.backgroundContainer,
        backgroundClip: ({isInverseInside}: StylesProps) => (isInverseInside ? 'padding-box' : 'border-box'), // for transparent borders, no background is drawn beneath the border.

        border: ({isInverseOutside, isInverseInside}: StylesProps) => {
            if (isInverseOutside && !isInverseInside) {
                return `1px solid ${colors.backgroundContainer}`;
            }

            if (isInverseInside) {
                return '1px solid transparent';
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
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

export const Boxed: React.FC<Props> = ({
    children,
    isInverse: isInverseInside = false,
    className,
    role,
    dataAttributes,
    'aria-label': ariaLabel,
}) => {
    const isInverseOutside = useIsInverseVariant();
    const classes = useStyles({isInverseOutside, isInverseInside} as StylesProps);

    return (
        <div
            className={classNames(className, classes.boxed)}
            role={role}
            {...getPrefixedDataAttributes(dataAttributes)}
            aria-label={ariaLabel}
        >
            <ThemeVariant isInverse={isInverseInside}>{children}</ThemeVariant>
        </div>
    );
};
