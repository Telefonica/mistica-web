import * as React from 'react';
import {CoverCard, Image, Stack, Text3} from '..';
import usingVrImg from '../__stories__/images/using-vr.jpg';
import beachImg from '../__stories__/images/beach.jpg';
import laptopImg from '../__stories__/images/laptop.jpg';

export default {
    title: 'Private/Image/Image with srcSet attribute is responsive',
};

export const Default: StoryComponent = () => {
    const src = usingVrImg;
    const srcSet = `${usingVrImg} 600w, ${beachImg} 1300w, ${laptopImg} 3000w`;

    return (
        <Stack space={16}>
            <Text3 medium>
                When using srcSet prop, Image src should be responsive. this attribute can also be used for
                the imageSrc and imageSrcSet props in the CoverCard component
            </Text3>

            <div style={{width: 300}}>
                <Stack space={16} dataAttributes={{testid: 'content'}}>
                    <Image aspectRatio="16:9" width={300} src={src} srcSet={srcSet} />

                    <CoverCard
                        aspectRatio="16:9"
                        width={300}
                        title="Cover Card"
                        imageSrc={src}
                        imageSrcSet={srcSet}
                    />

                    <CoverCard
                        size="display"
                        aspectRatio="16:9"
                        width={300}
                        title="Display Cover Card"
                        imageSrc={src}
                        imageSrcSet={srcSet}
                    />
                </Stack>
            </div>
        </Stack>
    );
};

Default.storyName = 'Image with srcSet attribute is responsive';
