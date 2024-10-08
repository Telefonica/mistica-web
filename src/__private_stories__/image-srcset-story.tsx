import * as React from 'react';
import {DisplayMediaCard, Image, PosterCard, Stack, Text3} from '..';
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
                the backgroundImage in DisplayMediaCard and PosterCard components
            </Text3>

            <div style={{width: 300}}>
                <Stack space={16} dataAttributes={{testid: 'content'}}>
                    <Image aspectRatio="16:9" width={300} src={src} srcSet={srcSet} />

                    <PosterCard
                        aspectRatio="16:9"
                        width={300}
                        title="Poster Card"
                        backgroundImage={{src, srcSet}}
                    />

                    <DisplayMediaCard
                        aspectRatio="16:9"
                        width={300}
                        title="Display Media Card"
                        backgroundImage={{src, srcSet}}
                    />
                </Stack>
            </div>
        </Stack>
    );
};

Default.storyName = 'Image with srcSet attribute is responsive';
