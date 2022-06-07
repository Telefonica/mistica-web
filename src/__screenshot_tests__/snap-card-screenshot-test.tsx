import {openStoryPage, screen, setRootFontSize} from '../test-utils';

test('SnapCard', async () => {
    await openStoryPage({
        id: 'components-cards-snapcard--default',
        device: 'MOBILE_IOS',
    });

    const snapCard = await screen.findByTestId('snap-card');

    const image = await snapCard.screenshot();
    expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-mobile',
    });

    setRootFontSize(32);
    const bigFontImage = await snapCard.screenshot();
    expect(bigFontImage).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-mobile-big-font',
    });

    await openStoryPage({
        id: 'components-cards-snapcard--default',
        device: 'DESKTOP',
    });
    const desktopSnapCard = await screen.findByTestId('snap-card');

    const desktopImage = await desktopSnapCard.screenshot();
    expect(desktopImage).toMatchImageSnapshot({
        customSnapshotIdentifier: 'snapcard-screenshot-test-desktop',
    });
});
