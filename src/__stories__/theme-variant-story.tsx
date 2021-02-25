import * as React from 'react';
import {ThemeVariant, useTheme, Text7, useIsInverseVariant, Stack} from '..';
import {useCheckbox} from './helpers';
import {ButtonPrimary} from '../button';

export default {
    title: 'Components/Utils/ThemeVariant',
};

const OtherComponent: React.FC = () => {
    const theme = useTheme();
    const isInverse = useIsInverseVariant();
    return (
        <Stack space={16}>
            <Text7 regular color={theme.colors.textPrimary}>
                Some components, like Text, or Button, automatically react to theme variant changes
            </Text7>
            <ButtonPrimary onPress={() => alert('pressed')}>Button</ButtonPrimary>
            <pre
                style={{
                    color: isInverse ? theme.colors.textPrimaryInverse : theme.colors.textPrimary,
                    fontFamily: 'monospace',
                }}
            >
                isInverse: {JSON.stringify(isInverse)}
            </pre>
        </Stack>
    );
};

export const Default: StoryComponent = () => {
    const theme = useTheme();
    const [isInverse, inverseCheckbox] = useCheckbox('is inverse', false);
    return (
        <Stack space={16}>
            {inverseCheckbox}
            <div style={{background: isInverse ? theme.colors.backgroundBrand : 'transparent'}}>
                <ThemeVariant isInverse={isInverse}>
                    <OtherComponent />
                </ThemeVariant>
            </div>
        </Stack>
    );
};

Default.storyName = 'ThemeVariant';
