import {openStoryPage, screen} from '../test-utils';

const COLORS = ['default', 'red'];

test.each(COLORS)('ProgressBar - color={%s}', async (color) => {
    await openStoryPage({id: 'components-progressbar--default', args: {color}});

    const stepper = await screen.findByTestId('progress-bar');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});
