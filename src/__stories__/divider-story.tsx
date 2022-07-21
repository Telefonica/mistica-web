import * as React from 'react';
import {Divider, ThemeVariant, useIsInverseVariant, useTheme} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Divider',
};

const Container: React.FC = ({children}) => {
    const {colors} = useTheme();
    const isInverse = useIsInverseVariant();

    return (
        <div
            style={{
                background: isInverse ? colors.backgroundBrand : colors.background,
                padding: 16,
                height: 96,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `1px solid ${colors.border}`,
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
