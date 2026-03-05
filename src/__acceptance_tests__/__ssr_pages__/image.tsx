import * as React from 'react';
import {ResponsiveLayout, Title1, Image, Stack} from '../../..';

const ImageTest = (): JSX.Element => (
    <ResponsiveLayout>
        <Stack space={48}>
            <Title1>Image aspectRatio: 16:9</Title1>
            <Image
                src="not-found-image-so-it-does-not-load-sometimes-and-makes-test-flaky.jpg"
                aspectRatio="16:9"
                width={200}
            />
        </Stack>
    </ResponsiveLayout>
);

export default ImageTest;
