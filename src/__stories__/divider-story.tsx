import * as React from 'react';
import {Divider, ThemeVariant, useIsInverseVariant, skinVars} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Divider',
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

export const Default: StoryComponent = () => {
    return (
        <div data-testid="divider-story">
            <StorySection title="Divider">
                <Container>
                    <Divider />
                </Container>
            </StorySection>

            <StorySection title="Divider inverse">
                <ThemeVariant isInverse>
                    <Container>
                        <Divider />
                    </Container>
                </ThemeVariant>
            </StorySection>
        </div>
    );
};

Default.storyName = 'Divider';
