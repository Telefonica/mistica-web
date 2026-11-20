import * as React from 'react';
import {useIconGradient} from '../utils/icon-gradient';

export const Gradient = ({color}: {color?: string}): JSX.Element => {
    const {fillValue, gradientDef} = useIconGradient(color);
    return (
        <>
            <div data-testid="fill-value">{fillValue}</div>
            <div data-testid="gradient-type">{gradientDef ? String(gradientDef.type) : 'null'}</div>
        </>
    );
};
