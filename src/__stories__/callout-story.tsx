import * as React from 'react';
import {Callout, ButtonPrimary, ButtonLink, IconBoxLight, ResponsiveLayout, Box, ButtonSecondary} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Callout',
    argTypes: {
        actions: {
            options: ['none', 'button', 'link', 'button and secondary', 'button and link'],
            control: {type: 'select'},
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
        variant: {
            options: ['default', 'brand'],
            control: {type: 'select'},
        },
    },
    parameters: {fullScreen: true},
};

type Args = {
    title: string;
    description: string;
    actions: string;
    asset: boolean;
    closable: boolean;
    variantOutside: Variant;
    variant: 'default' | 'brand';
};

export const Default: StoryComponent<Args> = ({
    title,
    description,
    asset,
    actions,
    closable,
    variantOutside,
    variant,
}) => {
    const button = actions.includes('button') ? (
        <ButtonPrimary small onPress={() => {}}>
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink small onPress={() => {}}>
            Link
        </ButtonLink>
    ) : undefined;

    const secondaryButton = actions.includes('secondary') ? (
        <ButtonSecondary small onPress={() => {}}>
            Secondary Action
        </ButtonSecondary>
    ) : undefined;

    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingY={24}>
                <Callout
                    variant={variant}
                    asset={asset ? <IconBoxLight /> : undefined}
                    onClose={closable ? () => {} : undefined}
                    title={title}
                    description={description}
                    button={button}
                    secondaryButton={secondaryButton}
                    buttonLink={buttonLink}
                    aria-label="Callout label"
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Callout';
Default.parameters = {fullScreen: true};
Default.args = {
    title: 'Some title',
    description: 'This is a description for the callout',
    actions: 'button and link',
    asset: true,
    closable: true,
    variantOutside: 'default',
    variant: 'default',
};
