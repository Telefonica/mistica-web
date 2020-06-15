// @flow
import * as React from 'react';
import IconButton from '../icon-button';
import IcnClose from '../icons/icn-close';
import {StorySection} from './helpers';

export default {
    title: 'Components|Touchables/IconButton',
};

export const Default = (): React.Node => (
    <>
        <StorySection title="Icon Button Image URL">
            <IconButton
                onPress={() => {}}
                icon="https://imrl.tuenti.net/1gIGjpc4i4R8x6O0HA-AmhQA"
                label="Icon"
            />
        </StorySection>

        <StorySection title="Icon Button SVG component">
            <IconButton onPress={() => {}} label="Icon">
                <IcnClose />
            </IconButton>
        </StorySection>
    </>
);

Default.story = {name: 'IconButton'};
