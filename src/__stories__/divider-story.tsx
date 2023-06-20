import * as React from 'react';
import {Divider, useIsInverseVariant, skinVars, ResponsiveLayout} from '..';

export default {
    title: 'Components/Divider',
    parameters: {fullScreen: false},
};

const Container = ({children}: {children: React.ReactNode}) => {
    const isInverse = useIsInverseVariant();

    return (
        <div
            style={{
                background: isInverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
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

type Args = {
    isInverse: boolean;
};

export const Default: StoryComponent<Args> = ({isInverse}) => {
    return (
        <ResponsiveLayout fullWidth dataAttributes={{testid: 'divider-story'}} isInverse={isInverse}>
            <Container>
                <Divider />
            </Container>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Divider';

Default.args = {
    isInverse: false,
};
