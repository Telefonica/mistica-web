import * as React from 'react';
import {useId, skinVars, Stack, Text2} from '..';

export default {
    title: 'Hooks/useId',
};

export const useIdStory: StoryComponent = () => {
    const id = useId();
    return (
        <Stack space={16}>
            <Text2 regular color={skinVars.colors.textSecondary}>
                Aria ids are useful for multiple accesibility purposes, for example to link a label with an
                input/checkbox.
            </Text2>
            <div style={{display: 'flex'}}>
                <input type="checkbox" id={id} />
                <label htmlFor={id}>
                    <Text2 regular>Checkbox label</Text2>
                </label>
            </div>
        </Stack>
    );
};

useIdStory.storyName = 'useId';
