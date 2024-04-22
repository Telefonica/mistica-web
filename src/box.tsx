import * as React from 'react';
import classnames from 'classnames';
import {sprinkles} from './sprinkles.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {ByBreakpoint, DataAttributes} from './utils/types';

type PadSize = 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

type Props = {
    width?: number | string;
    padding?: ByBreakpoint<PadSize>;
    paddingX?: ByBreakpoint<PadSize>;
    paddingY?: ByBreakpoint<PadSize>;
    paddingTop?: ByBreakpoint<PadSize>;
    paddingBottom?: ByBreakpoint<PadSize>;
    paddingLeft?: ByBreakpoint<PadSize>;
    paddingRight?: ByBreakpoint<PadSize>;
    children?: React.ReactNode;
    className?: string;
    role?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

const Box = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
            children,
            width,
            padding = 0,
            paddingX = padding,
            paddingY = padding,
            paddingTop = paddingY,
            paddingBottom = paddingY,
            paddingLeft = paddingX,
            paddingRight = paddingX,
            role,
            dataAttributes,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const paddingSprinkles = {paddingTop, paddingBottom, paddingLeft, paddingRight};
        let paddingStyles: React.CSSProperties = {};
        let paddingClasses = '';
        try {
            paddingClasses = sprinkles(paddingSprinkles);
        } catch (e) {
            // if this fails, it's because the consumer passed in a value that is not a valid padding size
            // fallback to inline styles in that case.
            paddingStyles = {
                paddingTop: typeof paddingTop === 'object' ? paddingTop.mobile : paddingTop,
                paddingBottom: typeof paddingBottom === 'object' ? paddingBottom.mobile : paddingBottom,
                paddingLeft: typeof paddingLeft === 'object' ? paddingLeft.mobile : paddingLeft,
                paddingRight: typeof paddingRight === 'object' ? paddingRight.mobile : paddingRight,
            };
        }

        return (
            <div
                {...getPrefixedDataAttributes(dataAttributes)}
                role={role}
                aria-label={ariaLabel}
                ref={ref}
                className={classnames(className, paddingClasses)}
                style={{
                    ...(width !== undefined ? {width, boxSizing: 'border-box'} : {}),
                    ...(!paddingClasses ? paddingStyles : {}),
                }}
            >
                {children}
            </div>
        );
    }
);

export default Box;
