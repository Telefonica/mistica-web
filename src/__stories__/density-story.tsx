import * as React from 'react';
import {
    Box,
    ButtonPrimary,
    ButtonSecondary,
    DensityProvider,
    IconButton,
    IconLightningRegular,
    Inline,
    Popover,
    ResponsiveLayout,
    Stack,
    skinVars,
    Text2,
    Title2,
    useDensity,
} from '..';

import type {Density} from '..';

export default {
    title: 'Utilities/Density',
};

const Buttons = (): JSX.Element => (
    <Inline space={16} alignItems="center">
        <ButtonPrimary onPress={() => {}}>Button</ButtonPrimary>
        <ButtonSecondary small onPress={() => {}}>
            Small button
        </ButtonSecondary>
        <IconButton
            aria-label="Lightning"
            Icon={IconLightningRegular}
            type="brand"
            backgroundType="soft"
            onPress={() => {}}
        />
    </Inline>
);

const DensityShowcase = ({title}: {title: string}): JSX.Element => {
    const density = useDensity();
    return (
        <Stack space={16}>
            <Title2>{title}</Title2>
            <Text2 regular as="pre">
                density: {density}
            </Text2>
            <Buttons />
            {/* The popover renders in a portal, outside this subtree in the DOM */}
            <Popover
                target={
                    <Text2 medium color={skinVars.colors.textLink}>
                        Open a popover with the {density} density
                    </Text2>
                }
                title={`Popover in ${density} density`}
                slot={<Buttons />}
            />
        </Stack>
    );
};

type Args = {
    density: Density;
};

export const Default: StoryComponent<Args> = ({density}) => (
    <ResponsiveLayout>
        <Box paddingY={24}>
            <Stack space={40}>
                <DensityShowcase title="Theme density" />
                <DensityProvider density={density}>
                    <DensityShowcase title="DensityProvider subtree" />
                </DensityProvider>
            </Stack>
        </Box>
    </ResponsiveLayout>
);

Default.storyName = 'Density';
Default.args = {
    density: 'compact',
};
Default.argTypes = {
    density: {
        options: ['cozy', 'compact'],
        control: {type: 'select'},
    },
};
