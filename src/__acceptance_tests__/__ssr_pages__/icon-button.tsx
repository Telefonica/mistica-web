import * as React from 'react';
import {Stack, IconButton, IconLightningRegular} from '../../..';

const IconButtonTest = (): JSX.Element => (
    <Stack space={8}>
        <IconButton Icon={IconLightningRegular} type="neutral" backgroundType="transparent" />
        <IconButton Icon={IconLightningRegular} type="neutral" backgroundType="soft" />
        <IconButton Icon={IconLightningRegular} type="neutral" backgroundType="solid" />

        <IconButton Icon={IconLightningRegular} type="brand" backgroundType="transparent" />
        <IconButton Icon={IconLightningRegular} type="brand" backgroundType="soft" />
        <IconButton Icon={IconLightningRegular} type="brand" backgroundType="solid" />

        <IconButton Icon={IconLightningRegular} type="danger" backgroundType="transparent" />
        <IconButton Icon={IconLightningRegular} type="danger" backgroundType="soft" />
        <IconButton Icon={IconLightningRegular} type="danger" backgroundType="solid" />

        <IconButton Icon={IconLightningRegular} backgroundType="solid" disabled />
        <IconButton Icon={IconLightningRegular} backgroundType="solid" small />
    </Stack>
);

export default IconButtonTest;
