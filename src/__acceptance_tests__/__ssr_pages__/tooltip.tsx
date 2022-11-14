import * as React from 'react';
import {Tooltip} from '../../..';

const TooltipTest: React.FC = () => (
    <Tooltip
        targetLabel="some label"
        target="some target, this can be any component"
        description="Some description to be shown inside the tooltip"
    />
);

export default TooltipTest;
