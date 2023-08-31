import {openStoryPage, screen} from '../test-utils';

test('Slider', async () => {
    await openStoryPage({
        id: 'components-input-fields--slider-story',
        device: 'MOBILE_ANDROID',
    });

    const slider = await screen.findByTestId('slider');

    const image = await slider.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Slider with Field', async () => {
    await openStoryPage({
        id: 'components-input-fields--slider-story',
        device: 'MOBILE_ANDROID',
        args: {field: true},
    });

    const slider = await screen.findByTestId('slider');

    const image = await slider.screenshot();
    expect(image).toMatchImageSnapshot();
});
