import * as React from 'react';
import {Touchable, Stack, Text2, skinVars, Box} from '..';

const typeOptions = ['href', 'href + new tab', 'onPress'];

export default {
    title: 'Components/Primitives/Touchable',
    component: Touchable,
    argTypes: {
        type: {
            options: typeOptions,
            control: {type: 'select'},
        },
    },
};

type Args = {
    type: string;
};

export const Default: StoryComponent<Args> = ({type}) => {
    const styles = {
        border: `1px solid ${skinVars.colors.border}`,
        display: 'flex',
        padding: 16,
        justifyContent: 'center',
        color: skinVars.colors.textPrimary,
    };

    return (
        <Box padding={16}>
            <Stack space={16}>
                <Text2 as="p" regular>
                    Touchable is the base component we use for any component that can be clicked/tapped by the
                    user, for example buttons, list rows, etc. This component handles touch events, can track
                    analytics events on press, and guarantees the required a11y for any touchable area.
                </Text2>
                {type === 'onPress' ? (
                    <Touchable
                        style={styles}
                        onPress={() => {
                            alert('pressed');
                        }}
                    >
                        Touchable
                    </Touchable>
                ) : (
                    <Touchable
                        style={styles}
                        href={window.location.origin}
                        newTab={type === 'href + new tab'}
                    >
                        Touchable
                    </Touchable>
                )}
            </Stack>
        </Box>
    );
};

Default.storyName = 'Touchable';

Default.args = {
    type: 'onPress',
};
