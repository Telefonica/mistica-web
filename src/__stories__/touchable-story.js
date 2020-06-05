// @flow
import * as React from 'react';
import Touchable from '../touchable';
import {StorySection} from './helpers';

export default {
    title: 'Components|Touchable',
    component: Touchable,
};

export const Default = (): React.Node => {
    const [count, setCount] = React.useState(0);

    const styles = {
        border: '1px solid #000',
        margin: 10,
        display: 'flex',
        padding: 16,
        justifyContent: 'center',
        width: '90%',
    };

    return (
        <>
            <StorySection title="Touchable">
                <p style={{color: '#757575', margin: 10, lineHeight: 1.4}}>
                    Touchable is the base component we use for any component that can be clicked/tapped by the
                    user, for example buttons, list rows, etc. This component handles touch events, can track
                    analytics events on press, and guarantees the required a11y for any touchable area.
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
                <div style={{display: 'block', margin: 10}}>Pressed {count} times</div>
            </StorySection>
        </>
    );
};
