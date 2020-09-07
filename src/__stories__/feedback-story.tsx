import * as React from 'react';
import {Feedback, Stack} from '..';
import {ThemeVariant} from '../theme-variant-context';
import {StorySection, useCheckbox, useSelect, useTextField} from './helpers';

import IconInfo from '../icons/icon-info';
import IconOrders from '../icons/icon-orders';
import IconSuccess from '../icons/icon-success';
import IconError from '../icons/icon-error';

export default {
    title: 'Components|Feedbacks/Feedback',
};

const iconSelectToIcon = {
    None: undefined,
    Success: <IconSuccess />,
    Error: <IconError />,
    Info: <IconInfo />,
    Orders: <IconOrders />,
};

export const Default: StoryComponent = () => {
    const [iconName, iconSelectField] = useSelect(
        'Icon',
        Object.keys(iconSelectToIcon)[0],
        Object.keys(iconSelectToIcon)
    );
    const [title, titleTextField] = useTextField('Title', "I'm the title", true);
    const [description, descriptionTextField] = useTextField('Description', "I'm the description");
    const [isInverseState, isInverseStateCheckbox] = useCheckbox('Inverse variant', false);
    return (
        <ThemeVariant isInverse={isInverseState}>
            <StorySection title="Feedback">
                <Stack space={16}>
                    <span style={{fontSize: 12}}>* Select info as the Type to be able to choose an icon</span>
                    {iconSelectField}
                    {titleTextField}
                    {descriptionTextField}
                    {isInverseStateCheckbox}
                    <Feedback
                        title={title}
                        description={description}
                        icon={iconSelectToIcon[iconName as keyof typeof iconSelectToIcon]}
                    />
                </Stack>
            </StorySection>
        </ThemeVariant>
    );
};

Default.story = {name: 'Feedback'};
