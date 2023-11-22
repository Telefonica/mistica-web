import {openStoryPage, screen} from '../test-utils';

test('Slider', async () => {
    await openStoryPage({
        id: 'components-slider--uncontrolled',
        device: 'MOBILE_ANDROID',
    });

    const slider = await screen.findByTestId('slider');

    const image = await slider.screenshot();
    expect(image).toMatchImageSnapshot();
});
