import * as React from 'react';
import {useAriaId, useTheme, Stack, Text7} from '..';

export default {
    title: 'Hooks|useAriaId',
};

export const UseAriaId: StoryComponent = () => {
    const theme = useTheme();
    const id = useAriaId();
    return (
        <Stack space={16}>
            <Text7 color={theme.colors.textSecondary}>
                Aria ids are useful for multiple accesibility purposes, for example to link a label with an
                input/checkbox.
            </Text7>
            <div style={{display: 'flex'}}>
                <input type="checkbox" id={id} />
                <label htmlFor={id}>Checkbox label</label>
            </div>
        </Stack>
    );
};

UseAriaId.story = {
    name: 'useAriaId',
};
