import {openStoryPage, screen} from '../test-utils';

test('ProgressBar', async () => {
    await openStoryPage({id: 'components-progressbar--default'});

    const stepper = await screen.findByTestId('progress-bar');

    const image = await stepper.screenshot();

    expect(image).toMatchImageSnapshot();
});
