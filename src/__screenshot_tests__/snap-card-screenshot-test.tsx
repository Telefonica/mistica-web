import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device, StoryArgs} from '../test-utils';

const ASPECT_RATIO_VALUES = ['1:1', '7:10', '9:10'];

const renderSnapCard = async ({device, args}: {device: Device; args?: StoryArgs}) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-snapcard--default',
        device,
        args,
    });
    return await screen.findByTestId('snap-card');
};

test('SnapCard', async () => {
    const snapCard = await renderSnapCard({device: 'MOBILE_IOS'});

    expect(await snapCard.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-mobile-snap',
    });

    setRootFontSize(32);
    expect(await snapCard.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-mobile-big-font-snap',
    });

    const snapCardInverse = await renderSnapCard({
        device: 'MOBILE_IOS',
        args: {inverse: true, asset: 'icon in circle'},
    });
    expect(await snapCardInverse.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-inverse-snap',
    });

    const snapCardWithExtra = await renderSnapCard({
        device: 'MOBILE_IOS',
        args: {extra: true, asset: 'icon in circle'},
    });
    expect(await snapCardWithExtra.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-with-extra-snap',
    });

    const desktopSnapCard = await renderSnapCard({device: 'DESKTOP'});
    expect(await desktopSnapCard.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-desktop-snap',
    });
});

test.each(ASPECT_RATIO_VALUES)('SnapCard with aspect ratio %s', async (aspectRatio) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-snapcard--default',
        device: 'MOBILE_IOS',
        args: {aspectRatio: aspectRatio.replace(':', ' ')},
    });

    const snapCard = await screen.findByTestId('snap-card');

    const image = await snapCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('SnapCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-snapcard--group',
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});
