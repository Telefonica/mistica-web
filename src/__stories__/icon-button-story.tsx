import * as React from 'react';
import IconButton from '../icon-button';
import IconCloseRegular from '../generated/mistica-icons/icon-close-regular';
import catIcon from './images/cat-icon.png';

export default {
    title: 'Components/Buttons/IconButton',
    argTypes: {
        type: {
            options: ['image url', 'svg component'],
            control: {type: 'select'},
        },
    },
};

const handleOnPress = () => window.alert('pressed!');

type Args = {
    type: string;
};

export const Default: StoryComponent<Args> = ({type}) => (
    <IconButton onPress={handleOnPress} icon={type === 'image url' ? catIcon : undefined} aria-label="Icon">
        {type === 'svg component' ? <IconCloseRegular /> : undefined}
    </IconButton>
);

Default.storyName = 'IconButton';
Default.args = {
    type: 'image url',
};
