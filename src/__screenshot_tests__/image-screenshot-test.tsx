import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const ASPECT_RATIO = ['1:1', '16:9', '7:10', '4:3', '0'];

test('Image - width and height', async () => {
    await openStoryPage({id: 'components-primitives-image--default'});

    const story = await screen.findByTestId('image');

    await expectScreenshot(story);
});

for (const testCase of ASPECT_RATIO) {
    const aspectRatio = testCase;
    test(`Image - aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-primitives-image--default',
            args: {
                type: 'width and aspect ratio',
                aspectRatio: aspectRatio.replace(':', ' '),
            },
        });

        const story = await screen.findByTestId('image');

        await expectScreenshot(story);
    });
}

for (const testCase of ASPECT_RATIO) {
    const aspectRatio = testCase;
    test(`Image - full width with aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-primitives-image--default',
            args: {type: 'full width', aspectRatio: aspectRatio.replace(':', ' ')},
        });

        const story = await screen.findByTestId('image');

        await expectScreenshot(story);
    });
}

test('Image - no border radius', async () => {
    await openStoryPage({id: 'components-primitives-image--default', args: {borderRadius: false}});

    const story = await screen.findByTestId('image');

    await expectScreenshot(story);
});

for (const testCase of ASPECT_RATIO.slice(0, 4)) {
    const aspectRatio = testCase;
    test(`Image - error fallback with aspect ratio ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-primitives-image--default',
            args: {
                type: 'width and aspect ratio',
                aspectRatio: aspectRatio.replace(':', ' '),
                emptySource: true,
            },
        });

        const story = await screen.findByTestId('image');

        await expectScreenshot(story);
    });
}
