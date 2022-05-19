import {openStoryPage, screen} from '../test-utils';

const sizes = [24, 40, 64, 96];

test.each(sizes)('Avatar with numeric badge. Size: %d', async (size) => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {size, badge: '5'},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test.each(sizes)('Avatar with simple badge. Size: %d', async (size) => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {size, badge: 'true'},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test.each(sizes)('Avatar with initials. Size: %d', async (size) => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {initials: 'PL', size, src: ''},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test.each(sizes)('Avatar with default icon. Size: %d', async (size) => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {initials: '', size, src: ''},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test.each(sizes)('Avatar with custom icon. Size: %d', async (size) => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {initials: '', size, src: '', icon: 'IconFireRegular'},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test('Avatar inverse with initials', async () => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {initials: 'PL', size: 64, src: '', inverse: 'true'},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test('Avatar inverse with icon', async () => {
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {initials: '', size: 64, src: '', icon: 'IconFireRegular', inverse: 'true'},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
