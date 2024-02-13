import * as React from 'react';
import {Stack, IconButton, IconLightningRegular} from '../../..';

const IconButtonTest = (): JSX.Element => (
    <Stack space={8}>
        <IconButton Icon={IconLightningRegular} type="neutral" variant="default" />
        <IconButton Icon={IconLightningRegular} type="neutral" variant="soft" />
        <IconButton Icon={IconLightningRegular} type="neutral" variant="solid" />

        <IconButton Icon={IconLightningRegular} type="brand" variant="default" />
        <IconButton Icon={IconLightningRegular} type="brand" variant="soft" />
        <IconButton Icon={IconLightningRegular} type="brand" variant="solid" />

        <IconButton Icon={IconLightningRegular} type="danger" variant="default" />
        <IconButton Icon={IconLightningRegular} type="danger" variant="soft" />
        <IconButton Icon={IconLightningRegular} type="danger" variant="solid" />

        <IconButton Icon={IconLightningRegular} variant="solid" disabled />
        <IconButton Icon={IconLightningRegular} variant="solid" small />
    </Stack>
);

export default IconButtonTest;
