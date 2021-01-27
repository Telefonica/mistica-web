import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('PromoTag in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Others/PromoTag',
        name: 'PromoTag',
        device,
    });

    const tag = await screen.findByTestId('promo-tag');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('PromoTag with large fontSize in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Others/PromoTag',
        name: 'PromoTag',
        device,
    });

    await setRootFontSize(32);

    const tag = await screen.findByTestId('promo-tag');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
