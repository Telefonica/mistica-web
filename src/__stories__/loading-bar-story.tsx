import * as React from 'react';
import {ThemeVariant, LoadingBar as LoadingBarComponent, Switch, useTheme, Box} from '..';

export default {
    title: 'Components/Feedbacks/LoadingBar',
    parameters: {
        fullScreen: true,
    },
};

const BackgroundTheme: React.FC = ({children}) => {
    const [isInverseVariant, setIsInverseVariant] = React.useState(false);
    const {colors} = useTheme();
    return (
        <ThemeVariant isInverse={isInverseVariant}>
            <div style={{background: isInverseVariant ? colors.backgroundBrand : colors.background}}>
                <Box paddingY={32} paddingX={16}>
                    {children}
                    <Switch name="isInverse" checked={isInverseVariant} onChange={setIsInverseVariant}>
                        Inverse variant
                    </Switch>
                </Box>
            </div>
        </ThemeVariant>
    );
};

export const LoadingBar: StoryComponent = () => (
    <BackgroundTheme>
        <LoadingBarComponent visible />
    </BackgroundTheme>
);
