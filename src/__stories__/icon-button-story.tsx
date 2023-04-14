import * as React from 'react';
import IconButton from '../icon-button';
import IcnCloseRegular from '../generated/mistica-icons/icon-close-regular';
import {StorySection} from './helpers';
import catIcon from './images/cat-icon.png';

export default {
    title: 'Components/Buttons/Icon button',
};

export const Default: StoryComponent = () => (
    <>
        <StorySection title="Icon Button Image URL">
            <IconButton onPress={() => {}} icon={catIcon} aria-label="Icon" />
        </StorySection>

        <StorySection title="Icon Button SVG component">
            <IconButton onPress={() => {}} aria-label="Icon">
                <IcnCloseRegular />
            </IconButton>
        </StorySection>
    </>
);

Default.storyName = 'Icon button';
