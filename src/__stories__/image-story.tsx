import * as React from 'react';
import {Image, Stack} from '..';

export default {
    title: 'Components/Others/Image',
};

export const RowListStory: StoryComponent = () => (
    <Stack space={16} dataAttributes={{testid: 'image-story'}}>
        <Image src="https://i.imgur.com/G8aJDhB.jpeg" noBorderRadius aspectRatio="1:1" width={200} />
        <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="4:3" width={200} />
        <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="7:10" width={200} />
        <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="16:9" width={200} />
        <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="16:9" width={230} height={100} />
    </Stack>
);

RowListStory.storyName = 'Image';
