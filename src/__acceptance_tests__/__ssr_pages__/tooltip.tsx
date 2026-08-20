import * as React from 'react';
import {Tooltip} from '../../..';

const TooltipTest = (): JSX.Element => (
    <Tooltip
        target="some target, this can be any component"
        description="Some description to be shown inside the tooltip"
    />
);

export default TooltipTest;
