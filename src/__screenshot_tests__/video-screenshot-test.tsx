import {openStoryPage, screen, ssimScreenshotConfig} from '../test-utils';

const ASPECT_RATIO = ['1:1', '16:9', '4:3', '0'];

test('Video - width and height', async () => {
    await openStoryPage({id: 'components-primitives-video--default'});

    const story = await screen.findByTestId('video');

    expect(await story.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test.each(ASPECT_RATIO)('Video - aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'components-primitives-video--default',
        args: {
            type: 'width and aspect ratio',
            aspectRatio: aspectRatio.replace(':', ' '),
        },
    });

    const story = await screen.findByTestId('video');

    expect(await story.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test.each(ASPECT_RATIO)('Video - full width with aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'components-primitives-video--default',
        args: {type: 'full width', aspectRatio: aspectRatio.replace(':', ' ')},
    });

    const story = await screen.findByTestId('video');

    expect(await story.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test.each(ASPECT_RATIO.slice(0, 3))('Video - no poster with aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'components-primitives-video--default',
        args: {type: 'width and aspect ratio', aspectRatio: aspectRatio.replace(':', ' '), poster: false},
    });

    const story = await screen.findByTestId('video');

    expect(await story.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});

test.each(ASPECT_RATIO.slice(0, 3))('Video - error fallback with aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'components-primitives-video--default',
        args: {
            type: 'width and aspect ratio',
            aspectRatio: aspectRatio.replace(':', ' '),
            poster: false,
            emptySource: true,
        },
    });

    const story = await screen.findByTestId('video');

    expect(await story.screenshot()).toMatchImageSnapshot(ssimScreenshotConfig);
});
