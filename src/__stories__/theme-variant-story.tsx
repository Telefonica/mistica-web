import * as React from 'react';
import {ThemeVariant, skinVars, Text2, useIsInverseVariant, Stack} from '..';
import {useCheckbox} from './helpers';
import {ButtonPrimary} from '../button';

export default {
    title: 'Utilities/ThemeVariant',
};

const OtherComponent = (): JSX.Element => {
    const isInverse = useIsInverseVariant();
    return (
        <Stack space={16}>
            <Text2 regular color={skinVars.colors.textPrimary}>
                Some components, like Text, or Button, automatically react to theme variant changes
            </Text2>
            <ButtonPrimary onPress={() => alert('pressed')}>Button</ButtonPrimary>
            <pre
                style={{
                    color: isInverse ? skinVars.colors.textPrimaryInverse : skinVars.colors.textPrimary,
                    fontFamily: 'monospace',
                }}
            >
                isInverse: {JSON.stringify(isInverse)}
            </pre>
        </Stack>
    );
};

export const Default: StoryComponent = () => {
    const [isInverse, inverseCheckbox] = useCheckbox('is inverse', false);
    return (
        <Stack space={16}>
            {inverseCheckbox}
            <div style={{background: isInverse ? skinVars.colors.backgroundBrand : 'transparent'}}>
                <ThemeVariant isInverse={isInverse}>
                    <OtherComponent />
                </ThemeVariant>
            </div>
        </Stack>
    );
};

Default.storyName = 'ThemeVariant';
