import {openStoryPage, screen} from '../test-utils';

const COLORS = ['default', 'error'];

test.each(COLORS)('ProgressBar - color={%s}', async (color) => {
    await openStoryPage({id: 'components-progress-bars--progress-bar-story', args: {color}});

    const stepper = await screen.findByTestId('progress-bar');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(COLORS)('ProgressBar - inverse and color={%s}', async (color) => {
    await openStoryPage({id: 'components-progress-bars--progress-bar-story', args: {color, inverse: true}});

    const stepper = await screen.findByTestId('progress-bar');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(COLORS)('ProgressBarStepped - color={%s}', async (color) => {
    await openStoryPage({id: 'components-progress-bars--progress-bar-stepped-story', args: {color}});

    const stepper = await screen.findByTestId('progress-bar-stepped');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(COLORS)('ProgressBarStepped - inverse and color={%s}', async (color) => {
    await openStoryPage({
        id: 'components-progress-bars--progress-bar-stepped-story',
        args: {color, inverse: true},
    });

    const stepper = await screen.findByTestId('progress-bar-stepped');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});
