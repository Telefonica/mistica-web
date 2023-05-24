import * as React from 'react';
import classnames from 'classnames';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {getPrefixedDataAttributes} from './utils/dom';
import {vars} from './skins/skin-contract.css';
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
    minHeight?: number | string;
};

type InternalProps = {
    borderRadius?: typeof vars.borderRadii.container | typeof vars.borderRadii.legacyDisplay;
    background?: string;
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

export const InternalBoxed = React.forwardRef<HTMLDivElement, Props & InternalProps>(
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
            minHeight,
            borderRadius = vars.borderRadii.container,
            background,
        },
        ref
    ) => {
        const isInverseOutside = useIsInverseVariant();

        return (
            <div
                ref={ref}
                style={{width, height, minHeight, boxSizing: 'border-box', background}}
                className={classnames(
                    className,
                    getBorderStyle(isInverseOutside, isInverseInside),
                    sprinkles({
                        borderRadius,
                        overflow: 'hidden',
                        background:
                            background ?? isInverseInside
                                ? isInverseOutside
                                    ? vars.colors.backgroundContainerBrandOverInverse
                                    : vars.colors.backgroundContainerBrand
                                : vars.colors.backgroundContainer,
                    })
                )}
                role={role}
                aria-label={ariaLabel}
                {...getPrefixedDataAttributes(dataAttributes)}
            >
                <ThemeVariant isInverse={isInverseInside}>{children}</ThemeVariant>
            </div>
        );
    }
);

export const Boxed = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return <InternalBoxed {...props} ref={ref} />;
});
