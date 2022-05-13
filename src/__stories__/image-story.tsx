import * as React from 'react';
import {Image, Stack, useTheme} from '..';

export default {
    title: 'Components/Others/Image',
};

export const Default: StoryComponent = () => {
    const {colors} = useTheme();
    return (
        <Stack space={16} dataAttributes={{testid: 'image-story'}}>
            <Image src="https://i.imgur.com/G8aJDhB.jpeg" noBorderRadius aspectRatio="1:1" width={200} />
            <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="4:3" width={200} />
            <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="7:10" width={200} />
            <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio="16:9" width={200} />
            <Image src="https://i.imgur.com/G8aJDhB.jpeg" width={230} height={100} />
            <div
                style={{
                    resize: 'both',
                    overflow: 'auto',
                    width: 300,
                    border: `1px solid ${colors.border}`,
                    padding: 16,
                }}
            >
                <Stack space={16}>
                    <Image src="https://i.imgur.com/G8aJDhB.jpeg" aspectRatio={16 / 9} />
                    <Image src="https://i.imgur.com/G8aJDhB.jpeg" width="50%" aspectRatio={16 / 9} />
                    <Image src="https://i.imgur.com/G8aJDhB.jpeg" width="50%" aspectRatio={4 / 3} />
                </Stack>
            </div>
        </Stack>
    );
};

Default.storyName = 'Image';
