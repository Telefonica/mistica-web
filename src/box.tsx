import React from 'react';
import {createUseStyles} from './jss';
import classnames from 'classnames';

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
    'data-testid'?: string;
    'data-qsysid'?: string;
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
    ...dataProps
}) => {
    const classes = useStyles({
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        width,
    });

    return (
        <div
            data-testid={dataProps['data-testid']}
            data-qsysid={dataProps['data-qsysid']}
            className={classnames(className, classes.box)}
            role={role}
        >
            {children}
        </div>
    );
};

export default Box;
