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
    decorators: [
        (Story: any, context: any) => (
            <ResponsiveLayout variant={context.args.variantOutside || 'default'} fullWidth dataAttributes={{testid: 'divider-story'}}>
                <Container>
                    <Story />
                </Container>
            </ResponsiveLayout>
        ),
    ],
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

export const Default: StoryComponent<Args> = () => {
    return <Divider />;
};

Default.storyName = 'Divider';
Default.args = {
    variantOutside: 'default',
};
