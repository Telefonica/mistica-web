import * as React from 'react';
import {Tabs} from '../../..';

const TabsTest = (): JSX.Element => (
    <Tabs onChange={() => {}} selectedIndex={0} tabs={[{text: 'Tab 1'}, {text: 'Tab 2'}, {text: 'Tab 2'}]} />
);

export default TabsTest;
