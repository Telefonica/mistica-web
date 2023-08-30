import * as React from 'react';
import {Divider, ResponsiveLayout, skinVars} from '..';

export default {
    title: 'Components/Divider',
};

type Args = {
    inverse: boolean;
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

export const Default: StoryComponent<Args> = ({inverse}) => {
    return (
        <ResponsiveLayout fullWidth isInverse={inverse} dataAttributes={{testid: 'divider-story'}}>
            <Container>
                <Divider />
            </Container>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Divider';
Default.args = {
    inverse: false,
};
