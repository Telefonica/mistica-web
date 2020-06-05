// @flow
import * as React from 'react';
import {ThemeVariant} from '../theme-variant-context';
import LoadingBarComponent from '../loading-bar';
import {StorySection} from './helpers';

export default {
    title: 'Components|Loaders',
};

const BackgroundTheme = ({children}: {children: React.Node}) => {
    const [isInverseVariant, setIsInverseVariant] = React.useState(false);
    return (
        <ThemeVariant isInverse={isInverseVariant}>
            <>
                <div>{children}</div>
                <p style={{paddingLeft: 8, marginBottom: 16}}>
                    <input
                        type="checkbox"
                        checked={isInverseVariant}
                        onChange={({target}) => setIsInverseVariant(target.checked)}
                    />
                    Inverse variant
                </p>
            </>
        </ThemeVariant>
    );
};

export const LoadingBar = (): React.Node => (
    <BackgroundTheme>
        <StorySection title="Loading Bar">
            <LoadingBarComponent visible />
        </StorySection>
    </BackgroundTheme>
);
