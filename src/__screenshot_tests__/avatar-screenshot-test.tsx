import {openStoryPage, screen} from '../test-utils';

const sizes = [24, 40, 64, 96];

test('Avatar with image and badge', async () => {
    // simple badge
    for (const size of sizes) {
        await openStoryPage({
            id: 'components-avatar--default',
            device: 'MOBILE_IOS',
            args: {size, badge: 'true'},
        });

        const element = await screen.findByTestId('avatar');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }

    // numeric badge
    for (const size of sizes) {
        await openStoryPage({
            id: 'components-avatar--default',
            device: 'MOBILE_IOS',
            args: {size, badge: '5'},
        });

        const element = await screen.findByTestId('avatar');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }
});

test('Avatar with initials', async () => {
    for (const size of sizes) {
        await openStoryPage({
            id: 'components-avatar--default',
            device: 'MOBILE_IOS',
            args: {initials: 'PL', size, src: ''},
        });

        const element = await screen.findByTestId('avatar');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }

    // inverse
    await openStoryPage({
        id: 'components-avatar--default',
        device: 'MOBILE_IOS',
        args: {initials: 'PL', size: 64, src: '', inverse: 'true'},
    });

    const element = await screen.findByTestId('avatar');
    expect(await element.screenshot()).toMatchImageSnapshot();
});

test('Avatar with icon', async () => {
    // default icon
    for (const size of sizes) {
        await openStoryPage({
            id: 'components-avatar--default',
            device: 'MOBILE_IOS',
            args: {initials: '', size, src: ''},
        });

        const element = await screen.findByTestId('avatar');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }

    // custom icon
    {
        await openStoryPage({
            id: 'components-avatar--default',
            device: 'MOBILE_IOS',
            args: {initials: '', size: 64, src: '', icon: 'IconFireRegular'},
        });

        const element = await screen.findByTestId('avatar');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }

    // inverse
    {
        await openStoryPage({
            id: 'components-avatar--default',
            device: 'MOBILE_IOS',
            args: {initials: '', size: 64, src: '', icon: 'IconFireRegular', inverse: 'true'},
        });

        const element = await screen.findByTestId('avatar');
        expect(await element.screenshot()).toMatchImageSnapshot();
    }
});
