import * as React from 'react';
import {Stack, IconButton, IconLightningRegular} from '../../..';

const IconButtonTest = (): JSX.Element => (
    <Stack space={8}>
        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="neutral"
            backgroundType="transparent"
        />
        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="neutral"
            backgroundType="soft"
        />
        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="neutral"
            backgroundType="solid"
        />

        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="brand"
            backgroundType="transparent"
        />
        <IconButton Icon={IconLightningRegular} aria-label="icon-button" type="brand" backgroundType="soft" />
        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="brand"
            backgroundType="solid"
        />

        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="danger"
            backgroundType="transparent"
        />
        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="danger"
            backgroundType="soft"
        />
        <IconButton
            Icon={IconLightningRegular}
            aria-label="icon-button"
            type="danger"
            backgroundType="solid"
        />

        <IconButton Icon={IconLightningRegular} aria-label="icon-button" backgroundType="solid" disabled />
        <IconButton Icon={IconLightningRegular} aria-label="icon-button" backgroundType="solid" small />
    </Stack>
);

export default IconButtonTest;
