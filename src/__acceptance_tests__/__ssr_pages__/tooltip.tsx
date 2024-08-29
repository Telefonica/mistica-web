import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Tooltip} from '../../..';

const TooltipTest = (): JSX.Element => (
    <Tooltip
        target="some target, this can be any component"
        description="Some description to be shown inside the tooltip"
    />
);

export default TooltipTest;
