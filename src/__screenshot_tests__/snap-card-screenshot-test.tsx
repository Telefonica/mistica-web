import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device, StoryArgs} from '../test-utils';

const renderSnapCard = async ({device, args}: {device: Device; args?: StoryArgs}) => {
    await openStoryPage({
        id: 'components-cards-snapcard--default',
        device,
        args,
    });
    return await screen.findByTestId('snap-card');
};

test('SnapCard', async () => {
    const snapCard = await renderSnapCard({device: 'MOBILE_IOS'});

    expect(await snapCard.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-mobile',
    });

    setRootFontSize(32);
    expect(await snapCard.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-mobile-big-font',
    });

    const snapCardInverse = await renderSnapCard({
        device: 'MOBILE_IOS',
        args: {isInverse: true, asset: 'icon in circle'},
    });
    expect(await snapCardInverse.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-inverse',
    });

    const snapCardWithExtra = await renderSnapCard({
        device: 'MOBILE_IOS',
        args: {withExtra: true, asset: 'icon in circle'},
    });
    expect(await snapCardWithExtra.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-with-extra',
    });

    const desktopSnapCard = await renderSnapCard({device: 'DESKTOP'});
    expect(await desktopSnapCard.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-desktop',
    });
});

test('SnapCard group', async () => {
    const page = await openStoryPage({
        id: 'components-cards-snapcard--group',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});
