import * as React from 'react';
import classnames from 'classnames';
import {sprinkles} from './sprinkles.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type PadSize = 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

type Props = {
    width?: number | string;
    padding?: PadSize;
    paddingX?: PadSize;
    paddingY?: PadSize;
    paddingTop?: PadSize;
    paddingBottom?: PadSize;
    paddingLeft?: PadSize;
    paddingRight?: PadSize;
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
        const paddingStyles = {paddingTop, paddingBottom, paddingLeft, paddingRight};
        let paddingClasses = '';
        try {
            paddingClasses = sprinkles(paddingStyles);
        } catch (e) {
            // if this fails, it's because the consumer passed in a value that is not a valid padding size
            // fallback to inline styles in that case.
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
