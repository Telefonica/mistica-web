import * as React from 'react';
import {Touchable, Stack, Text2, skinVars} from '..';

export default {
    title: 'Components/Primitives/Touchable',
    component: Touchable,
    argTypes: {
        type: {
            options: ['href', 'onPress'],
            control: {type: 'select'},
        },
        newTab: {if: {arg: 'type', eq: 'href'}},
    },
};

type Args = {
    type: 'href' | 'onPress';
    newTab: boolean;
};

export const Default: StoryComponent<Args> = ({type, newTab}) => {
    const styles = {
        border: `1px solid ${skinVars.colors.border}`,
        display: 'flex',
        padding: 16,
        justifyContent: 'center',
        color: skinVars.colors.textPrimary,
    };

    const props =
        type === 'href' ? {href: window.location.origin, newTab} : {onPress: () => window.alert('Pressed')};

    return (
        <Stack space={16}>
            <Text2 as="p" regular>
                Touchable is the base component we use for any component that can be clicked/tapped by the
                user, for example buttons, list rows, etc. This component handles touch events, can track
                analytics events on press, and guarantees the required a11y for any touchable area.
            </Text2>
            <Touchable style={styles} {...props} dataAttributes={{testid: 'touchable'}}>
                Touchable
            </Touchable>
        </Stack>
    );
};

Default.storyName = 'Touchable';
Default.args = {
    type: 'href',
    newTab: false,
};
