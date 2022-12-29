import * as React from 'react';
import {useAriaId, skinVars, Stack, Text2} from '..';

export default {
    title: 'Hooks/useAriaId',
};

export const UseAriaId: StoryComponent = () => {
    const id = useAriaId();
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

UseAriaId.storyName = 'useAriaId';
