import * as React from 'react';
import Tabs from '../tabs';
import {StorySection, useCheckbox} from './helpers';
import IconClose from '../icons/icon-close';

const texts = ['Tab 1', 'Tab 2', 'Tab 3'];

export default {
    title: 'Components/Controls/Tabs',
    component: Tabs,
};

export const Default: StoryComponent = () => {
    const [withIcon, withIconCheckbox] = useCheckbox('With icons', false);
    const [withCurrentColor, withCurrentColorCheckbox] = useCheckbox('With icon color="currentColor"', false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <StorySection title="Tabs example">
            {withIconCheckbox}
            {withIcon && withCurrentColorCheckbox}
            <Tabs
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                tabs={texts.map((text) => ({
                    text,
                    icon: withIcon ? (
                        <IconClose color={withCurrentColor ? 'currentColor' : undefined} />
                    ) : null,
                }))}
            />
        </StorySection>
    );
};
