import {openStoryPage, screen} from '../test-utils';

const TESTABLE_DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;
const TESTABLE_DEVICES_WITH_LARGE_DESKTOP = [...TESTABLE_DEVICES, 'LARGE_DESKTOP'] as const;

test.each(TESTABLE_DEVICES_WITH_LARGE_DESKTOP)('Sheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-sheet--default',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('ActionsListSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--actions-list',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('RadioListSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--radio-list',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('InfoSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--info',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('InfoSheet with multiple description paragraphs', async () => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--info',
        device: 'MOBILE_IOS',
        args: {
            description: 'Description paragraph',
            multiparagraphDescription: true,
        },
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('InfoSheet with dismiss button in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--info',
        device,
        args: {buttonText: 'Dismiss'},
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('InfoSheet after scrolling in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--info',
        device,
        args: {buttonText: 'Dismiss', numItems: 10},
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');
    const listItems = await screen.findAllByRole('listitem');
    await listItems[2].evaluate((el) => el.scrollIntoView());

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES_WITH_LARGE_DESKTOP)('ActionsSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--actions',
        device,
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('ActionsSheet with safe inset at the bottom', async () => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--actions',
        device: 'MOBILE_IOS_INSET',
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
