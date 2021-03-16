import * as React from 'react';
import {Touchable, Stack, Text2, useTheme} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Touchables/Touchable',
    component: Touchable,
};

export const Default: StoryComponent = () => {
    const [count, setCount] = React.useState(0);
    const {colors} = useTheme();

    const styles = {
        border: `1px solid ${colors.border}`,
        display: 'flex',
        padding: 16,
        justifyContent: 'center',
        color: colors.textPrimary,
    };

    return (
        <>
            <StorySection title="Touchable">
                <Stack space={16}>
                    <Text2 as="p" regular>
                        Touchable is the base component we use for any component that can be clicked/tapped by
                        the user, for example buttons, list rows, etc. This component handles touch events,
                        can track analytics events on press, and guarantees the required a11y for any
                        touchable area.
                    </Text2>
                    <Touchable style={styles} href={window.location.origin}>
                        Touchable with href
                    </Touchable>
                    <Touchable style={styles} href={window.location.origin} newTab>
                        Touchable with href (opens in new tab)
                    </Touchable>
                    <Touchable style={styles} onPress={() => setCount(count + 1)}>
                        Touchable with onPress
                    </Touchable>
                    <Text2 as="div" regular>
                        Pressed {count} times
                    </Text2>
                </Stack>
            </StorySection>
        </>
    );
};

Default.storyName = 'Touchable';
