// @flow
import * as React from 'react';
import {Placeholder, Stack} from '..';

export default {
    title: 'Components|Placeholders/Placeholder',
};

export const Default = (): React.ReactNode => (
    <Stack space={16}>
        <Placeholder />
        <Placeholder height={200} />
    </Stack>
);

Default.story = {name: 'Placeholder'};
