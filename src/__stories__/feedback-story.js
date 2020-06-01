// @flow
import * as React from 'react';
import {Feedback as FeedbackComponent, Stack} from '..';
import {ThemeVariant} from '../theme-variant-context';
import {StorySection, useCheckbox, useSelect, useTextField} from './helpers';

export default {
    title: 'Core|Feedbacks',
};

export const Feedback = (): React.Node => {
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
                    <FeedbackComponent type={(type: any)} title={title} description={description} />
                </Stack>
            </StorySection>
        </ThemeVariant>
    );
};
