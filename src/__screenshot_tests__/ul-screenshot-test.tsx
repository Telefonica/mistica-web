import {openStoryPage, screen} from '../test-utils';

const devices = ['DESKTOP', 'MOBILE_IOS'] as const;

test.each(devices)('Ul', async (device) => {
    await openStoryPage({
        id: 'components-ul-ol--default',
        device,
    });

    const list = await screen.findByLabelText('Unordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Ul default icons', async (device) => {
    await openStoryPage({
        id: 'components-ul-ol--default',
        device,
        args: {customIcon: false},
    });

    const list = await screen.findByLabelText('Unordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Ul without marker', async (device) => {
    await openStoryPage({
        id: 'components-ul-ol--default',
        device,
        args: {withMarker: false},
    });

    const list = await screen.findByLabelText('Unordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Ol', async (device) => {
    await openStoryPage({
        id: 'components-ul-ol--ordered-list',
        device,
    });

    const list = await screen.findByLabelText('Ordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Ol default icons', async (device) => {
    await openStoryPage({
        id: 'components-ul-ol--ordered-list',
        device,
        args: {customIcon: false},
    });

    const list = await screen.findByLabelText('Ordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(devices)('Ol without marker', async (device) => {
    await openStoryPage({
        id: 'components-ul-ol--ordered-list',
        device,
        args: {withMarker: false},
    });

    const list = await screen.findByLabelText('Ordered List');

    const image = await list.screenshot();
    expect(image).toMatchImageSnapshot();
});
