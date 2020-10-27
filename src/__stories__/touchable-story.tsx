import * as React from 'react';
import {Touchable, Stack} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Touchables/Touchable',
    component: Touchable,
};

export const Default: StoryComponent = () => {
    const [count, setCount] = React.useState(0);

    const styles = {
        border: '1px solid #000',
        display: 'flex',
        padding: 16,
        justifyContent: 'center',
    };

    return (
        <>
            <StorySection title="Touchable">
                <Stack space={16}>
                    <p style={{color: '#757575', lineHeight: 1.4}}>
                        Touchable is the base component we use for any component that can be clicked/tapped by
                        the user, for example buttons, list rows, etc. This component handles touch events,
                        can track analytics events on press, and guarantees the required a11y for any
                        touchable area.
                    </p>
                    <Touchable style={styles} href={window.location.origin}>
                        Touchable with href
                    </Touchable>
                    <Touchable style={styles} href={window.location.origin} newTab>
                        Touchable with href (opens in new tab)
                    </Touchable>
                    <Touchable style={styles} onPress={() => setCount(count + 1)}>
                        Touchable with onPress
                    </Touchable>
                    <div style={{display: 'block'}}>Pressed {count} times</div>
                </Stack>
            </StorySection>
        </>
    );
};

Default.story = {name: 'Touchable'};
