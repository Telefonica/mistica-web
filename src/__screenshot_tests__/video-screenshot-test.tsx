import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, renderingTolerance} from '../test-utils';

const ASPECT_RATIO = ['1:1', '16:9', '4:3', '0'];

test('Video - width and height', async () => {
    await openStoryPage({id: 'components-primitives-video--default'});

    const story = await screen.findByTestId('video');

    await expectScreenshot(story, {...renderingTolerance});
});

for (const testCase of ASPECT_RATIO) {
    const aspectRatio = testCase;
    test(`Video - aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-primitives-video--default',
            args: {
                type: 'width and aspect ratio',
                aspectRatio: aspectRatio.replace(':', ' '),
            },
        });

        const story = await screen.findByTestId('video');

        await expectScreenshot(story, {...renderingTolerance});
    });
}

for (const testCase of ASPECT_RATIO) {
    const aspectRatio = testCase;
    test(`Video - full width with aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-primitives-video--default',
            args: {type: 'full width', aspectRatio: aspectRatio.replace(':', ' ')},
        });

        const story = await screen.findByTestId('video');

        await expectScreenshot(story, {...renderingTolerance});
    });
}

for (const testCase of ASPECT_RATIO.slice(0, 3)) {
    const aspectRatio = testCase;
    test(`Video - no poster with aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-primitives-video--default',
            args: {type: 'width and aspect ratio', aspectRatio: aspectRatio.replace(':', ' '), poster: false},
        });

        const story = await screen.findByTestId('video');

        await expectScreenshot(story, {...renderingTolerance});
    });
}

for (const testCase of ASPECT_RATIO.slice(0, 3)) {
    const aspectRatio = testCase;
    test(`Video - error fallback with aspect ratio ${testCase}`, async () => {
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

        await expectScreenshot(story, {...renderingTolerance});
    });
}
