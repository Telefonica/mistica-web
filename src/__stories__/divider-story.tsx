import * as React from 'react';
import {Divider, ResponsiveLayout, skinVars} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Divider',
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    variantOutside: Variant;
};

const Container = ({children}: {children: React.ReactNode}) => {
    return (
        <div
            style={{
                padding: 16,
                height: 96,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `1px solid ${skinVars.colors.border}`,
            }}
        >
            {children}
        </div>
    );
};

export const Default: StoryComponent<Args> = ({variantOutside}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth dataAttributes={{testid: 'divider-story'}}>
            <Container>
                <Divider />
            </Container>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Divider';
Default.args = {
    variantOutside: 'default',
};
