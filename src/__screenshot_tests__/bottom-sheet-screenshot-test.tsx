import {openStoryPage, screen} from '../test-utils';

const TESTABLE_DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

test.each(TESTABLE_DEVICES)('BottomSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-bottomsheet--default',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('ActionsListBottomSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-bottomsheet--actions-list',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('RadioListBottomSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-bottomsheet--radio-list',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('InfoBottomSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-bottomsheet--info',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('ActionsBottomSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-bottomsheet--actions',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
