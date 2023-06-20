import * as React from 'react';
import IconButton from '../icon-button';
import IcnCloseRegular from '../generated/mistica-icons/icon-close-regular';
import catIcon from './images/cat-icon.png';
import {StorySection} from './helpers';

export default {
    title: 'Components/Buttons/Icon button',
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 128, step: 4},
        },
    },
    parameters: {fullScreen: false},
};

type Args = {
    size: number;
};

export const Default: StoryComponent<Args> = ({size}) => (
    <>
        <StorySection title="Icon Button Image URL">
            <IconButton size={size} onPress={() => {}} icon={catIcon} aria-label="Icon" />
        </StorySection>

        <StorySection title="Icon Button SVG component">
            <IconButton size={size} onPress={() => {}} aria-label="Icon">
                <IcnCloseRegular />
            </IconButton>
        </StorySection>
    </>
);

Default.storyName = 'Icon button';

Default.args = {
    size: 24,
};
