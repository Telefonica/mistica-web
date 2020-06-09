// @flow
import * as React from 'react';
import {useAriaId, useTheme, Stack, Text} from '..';

export default {
    title: 'Components|Hooks/useAriaId',
};

export const UseAriaId = (): React.Node => {
    const theme = useTheme();
    const id = useAriaId();
    return (
        <Stack space={16}>
            <Text size={16} color={theme.colors.textSecondary}>
                Aria ids are useful for multiple accesibility purposes, for example to link a label with an
                input/checkbox.
            </Text>
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
