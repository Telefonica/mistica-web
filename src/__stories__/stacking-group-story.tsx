import * as React from 'react';
import {Box, ResponsiveLayout} from '..';
import StackingGroup from '../stacking-group';
import Image from '../image';
import Avatar from '../avatar';
import img from './images/avatar.jpg';

export default {
    title: 'Components/StackingGroup',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    stacked?: boolean;
    type: 'circle' | 'square';
    size: number;
    maxItems?: number;
    children?: React.ReactNode;
    itemsToInclude: number;
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({
    stacked,
    size,
    type,
    maxItems,
    itemsToInclude,
    inverse = false,
}) => {
    return (
        <ResponsiveLayout isInverse={inverse} fullWidth>
            <Box padding={16} width="max-content" dataAttributes={{testid: 'stacking-group'}}>
                <StackingGroup stacked={stacked} maxItems={maxItems} moreItemsStyle={{type, size}}>
                    {Array.from({length: itemsToInclude}, (_, idx) =>
                        type === 'circle' ? (
                            <Avatar
                                key={idx}
                                border={stacked}
                                size={size}
                                initials={['TT', 'AA', 'GC', '', 'MA', 'PA'][idx % 5]}
                                src={[img, img, '', '', img, ''][idx % 5]}
                            />
                        ) : (
                            <Image
                                key={idx}
                                border={stacked}
                                height={size}
                                src={[img, img, '', '', img, ''][idx % 5]}
                                aspectRatio="1:1"
                            />
                        )
                    )}
                </StackingGroup>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'StackingGroup';
Default.argTypes = {
    size: {
        control: {type: 'range', min: 24, max: 128, step: 4},
    },
    type: {
        options: ['circle', 'square'],
        control: {type: 'select'},
    },
    itemsToInclude: {
        control: {type: 'range', min: 1, max: 8, step: 1},
    },
    maxItems: {
        control: {type: 'range', min: 1, max: 8, step: 1},
    },
};

Default.args = {
    itemsToInclude: 5,
    type: 'circle',
    size: 64,
    maxItems: 4,
    stacked: true,
    inverse: false,
};
