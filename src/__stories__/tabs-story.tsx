import * as React from 'react';
import {StorySection, useCheckbox} from './helpers';
import {pxToRem} from '../utils/css';
import {Tabs, IconClose, Inline} from '..';

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
            <Inline space={16}>
                {withIconCheckbox}
                {withIcon && withCurrentColorCheckbox}
            </Inline>
            <Tabs
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                tabs={texts.map((text) => ({
                    text,
                    icon: withIcon ? (
                        <IconClose size={pxToRem(24)} color={withCurrentColor ? 'currentColor' : undefined} />
                    ) : null,
                }))}
            />
        </StorySection>
    );
};
