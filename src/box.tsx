import React from 'react';
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
    // @deprecated use dataAttributes
    'data-testid'?: string;
    // @deprecated use dataAttributes
    'data-qsysid'?: string;
    /** "data-" prefix is automatically added. For example, use "testid" instead of "data-testid" */
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
};

const Box: React.FC<Props> = ({
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
    'data-testid': dataTestId,
    'data-qsysid': dataQsysId,
    dataAttributes,
    'aria-label': ariaLabel,
}) => {
    const classes = useStyles({
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        width,
    });

    return (
        <div
            data-testid={dataTestId}
            data-qsysid={dataQsysId}
            {...getPrefixedDataAttributes(dataAttributes)}
            className={classnames(className, classes.box)}
            role={role}
            aria-label={ariaLabel}
        >
            {children}
        </div>
    );
};

export default Box;
