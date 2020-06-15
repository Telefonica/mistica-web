// @flow
import * as React from 'react';
import {AvatarPlaceholder, Stack} from '..';

export default {
    title: 'Components|Placeholders/AvatarPlaceholder',
};

export const Default = (): React.Node => (
    <Stack space={16}>
        <AvatarPlaceholder />
        <AvatarPlaceholder size={80} />
    </Stack>
);

Default.story = {name: 'AvatarPlaceholder'};
