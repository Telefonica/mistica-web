import * as React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const useStyles = createUseStyles(() => ({
    box: {
        padding: (p) => p.padding,
        width: (p) => p.width,
    },
}));

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
        const classes = useStyles({
            padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
            width,
        });

        return (
            <div
                {...getPrefixedDataAttributes(dataAttributes)}
                className={classnames(className, classes.box)}
                role={role}
                aria-label={ariaLabel}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

export default Box;
