import {openStoryPage, screen} from '../test-utils';

const TESTABLE_DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

test.each(TESTABLE_DEVICES)('Sheet in %s', async (device) => {
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
        id: 'components-modals-sheet--actions-list',
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
        id: 'components-modals-sheet--radio-list',
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
        id: 'components-modals-sheet--info',
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
        id: 'components-modals-sheet--info',
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

test.each(TESTABLE_DEVICES)('ActionsSheet in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-modals-sheet--actions',
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
        id: 'components-modals-sheet--actions',
        device: 'MOBILE_IOS_INSET',
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
