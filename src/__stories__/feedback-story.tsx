import * as React from 'react';
import {Feedback, Stack} from '..';
import {ThemeVariant} from '../theme-variant-context';
import {StorySection, useCheckbox, useSelect, useTextField} from './helpers';

export default {
    title: 'Components|Feedbacks/Feedback',
};

export const Default: StoryComponent = () => {
    const [type, typeSelectField] = useSelect('Type', 'success', ['success', 'error', 'info']);
    const [title, titleTextField] = useTextField('Title', "I'm the title");
    const [description, descriptionTextField] = useTextField('Description', "I'm the description");
    const [isInverseState, isInverseStateCheckbox] = useCheckbox('Inverse variant', false);
    return (
        <ThemeVariant isInverse={isInverseState}>
            <StorySection title="Feedback">
                <Stack space={16}>
                    {typeSelectField}
                    {titleTextField}
                    {descriptionTextField}
                    {isInverseStateCheckbox}
                    <Feedback type={type as any} title={title} description={description} />
                </Stack>
            </StorySection>
        </ThemeVariant>
    );
};

Default.story = {name: 'Feedback'};
