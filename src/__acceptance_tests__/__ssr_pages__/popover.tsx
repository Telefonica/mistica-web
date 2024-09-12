import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Popover} from '../../..';

const PopoverTest = (): JSX.Element => (
    <Popover
        target="some target, this can be any component"
        description="Some description to be shown inside the Popover"
    />
);

export default PopoverTest;
