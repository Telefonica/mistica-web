import * as React from 'react';
import {Image, Stack, Text3} from '..';
import usingVrImg from '../__stories__/images/using-vr.jpg';
import beachImg from '../__stories__/images/beach.jpg';
import laptopImg from '../__stories__/images/laptop.jpg';

export default {
    title: 'Private/Image/Image with srcSet attribute is responsive',
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Text3 medium>When using srcSet prop, Image src should be responsive</Text3>

            <Image
                src={usingVrImg}
                aspectRatio="16:9"
                width={400}
                dataAttributes={{testid: 'image'}}
                srcSet={`${usingVrImg} 600w, ${beachImg} 1300w, ${laptopImg} 3000w`}
            />
        </Stack>
    );
};

Default.storyName = 'Image with srcSet attribute is responsive';
