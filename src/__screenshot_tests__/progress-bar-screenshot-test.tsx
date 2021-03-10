import {openStoryPage, screen} from '../test-utils';

test('ProgressBar', async () => {
    await openStoryPage({
        section: 'Components/Others/ProgressBar',
        name: 'ProgressBar',
    });

    const stepper = await screen.findByTestId('progress-bar');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});
