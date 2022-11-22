import * as React from 'react';
import classnames from 'classnames';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars} from './skins/skin-contract.css';
import {useTheme} from './hooks';
import * as styles from './boxed.css';
import {sprinkles} from './sprinkles.css';

import type {DataAttributes} from './utils/types';

type Props = {
    children: React.ReactNode;
    isInverse?: boolean;
    className?: string;
    role?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    width?: number | string;
    height?: number | string;
};

const getBorderStyle = (isInverseOutside: boolean, isInverseInside: boolean) => {
    if (isInverseOutside && !isInverseInside) {
        return styles.inverseBorder;
    }

    if (isInverseInside) {
        return sprinkles({border: 'none'});
    }

    return sprinkles({border: 'regular'});
};

export const Boxed = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            isInverse: isInverseInside = false,
            className,
            role,
            dataAttributes,
            'aria-label': ariaLabel,
            width,
            height,
        },
        ref
    ) => {
        const {isDarkMode} = useTheme();
        const isInverseOutside = useIsInverseVariant();

        return (
            <div
                ref={ref}
                style={{width, height, boxSizing: 'border-box'}}
                className={classnames(
                    className,
                    getBorderStyle(isInverseOutside, isInverseInside),
                    sprinkles({
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor:
                            isInverseInside && !isDarkMode
                                ? vars.colors.backgroundBrand
                                : vars.colors.backgroundContainer,
                    })
                )}
                role={role}
                {...getPrefixedDataAttributes(dataAttributes)}
                aria-label={ariaLabel}
            >
                <ThemeVariant isInverse={isInverseInside}>{children}</ThemeVariant>
            </div>
        );
    }
);
