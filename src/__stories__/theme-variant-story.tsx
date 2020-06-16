// @flow
import * as React from 'react';
import {ThemeVariant, useTheme, Text, useIsInverseVariant, Stack} from '..';
import {useCheckbox} from './helpers';
import {ButtonPrimary} from '../button';

export default {
    title: 'Components|Utils/ThemeVariant',
};

const OtherComponent = () => {
    const theme = useTheme();
    const isInverse = useIsInverseVariant();
    return (
        <Stack space={16}>
            <Text size={16} color={theme.colors.textPrimary}>
                Some components, like Text, or Button, automatically react to theme variant changes
            </Text>
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

export const Default = (): React.ReactNode => {
    const theme = useTheme();
    const [isInverse, inverseCheckbox] = useCheckbox('is inverse', false);
    return (
        <Stack space={16}>
            {inverseCheckbox}
            <div style={{background: isInverse ? theme.colors.backgroundHeading : 'transparent'}}>
                <ThemeVariant isInverse={isInverse}>
                    <OtherComponent />
                </ThemeVariant>
            </div>
        </Stack>
    );
};

Default.story = {name: 'ThemeVariant'};
