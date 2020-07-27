// @flow
import * as React from 'react';
import Tabs from '../tabs';
import {StorySection, useCheckbox} from './helpers';
import {Placeholder} from '../placeholder';

const texts = ['Tab 1', 'Tab 2', 'Tab 3'];

export default {
    title: 'Components|Controls/Tabs',
    component: Tabs,
};

export const Default: StoryComponent = () => {
    const [withIcon, withIconCheckbox] = useCheckbox('With icons', false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <StorySection title="Tabs example">
            {withIconCheckbox}
            <Tabs
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                tabs={texts.map((text) => ({
                    text,
                    icon: withIcon ? <Placeholder width={24} height={24} /> : null,
                }))}
            />
        </StorySection>
    );
};
