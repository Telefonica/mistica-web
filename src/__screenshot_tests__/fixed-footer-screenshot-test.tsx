import {test, expectScreenshot} from '../test-utils/playwright';
import {screen, openStoryPage} from '../test-utils';

test('Dialog over fixed footer', async () => {
    const page = await openStoryPage({
        id: 'layout-fixedfooterlayout--dialog-over-fixed-footer',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByText('Open dialog')).click();

    await expectScreenshot(page);
});

for (const testCase of ['MOBILE_IOS', 'DESKTOP', 'LARGE_DESKTOP'] as const) {
    const device = testCase;
    test(`ButtonFixedFooterLayout on ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'layout-fixedfooterlayout--footer-with-buttons-only',
            device,
        });

        await expectScreenshot(page);
    });
}

test('Fixed footer with static position when height is smaller than the footer itself', async () => {
    const page = await openStoryPage({
        id: 'layout-fixedfooterlayout--more-complex-footer',
        device: 'MOBILE_IOS_SMALL',
    });

    await expectScreenshot(page);

    await page.setViewportSize({
        width: 564,
        height: 100,
    });

    await expectScreenshot(page, {...{fullPage: false, scale: 'css'}});

    const loadMoreTextButton = await screen.findByRole('button', {name: 'Load more text'});
    await loadMoreTextButton.scrollIntoViewIfNeeded();
    await loadMoreTextButton.evaluate((el) => el.scrollIntoView());
    await expectScreenshot(page, {...{fullPage: false, scale: 'css'}});
});

test('Fixed footer with safe inset at the bottom', async () => {
    const page = await openStoryPage({
        id: 'layout-fixedfooterlayout--more-complex-footer',
        device: 'MOBILE_IOS_INSET',
    });

    await expectScreenshot(page);

    await (await screen.findByRole('button', {name: 'Load more text'})).click();
    await (await screen.findByRole('button', {name: 'Load more text'})).click();
    await (await screen.findByRole('button', {name: 'Load more text'})).click();
    await (await screen.findByTestId('line-15')).evaluate((el) => el.scrollIntoView());

    await expectScreenshot(page, {...{fullPage: false}});

    await page.setViewportSize({
        width: 564,
        height: 150,
    });

    const loadMoreTextButton = await screen.findByRole('button', {name: 'Load more text'});
    await loadMoreTextButton.scrollIntoViewIfNeeded();
    await loadMoreTextButton.evaluate((el) => el.scrollIntoView());
    await expectScreenshot(page, {...{fullPage: false, scale: 'css'}});
});

test('Fixed footer onChangeFooterHeight takes into account safe-area-inset-bottom', async () => {
    const page = await openStoryPage({
        id: 'private-fixedfooter--fixed-footer-layout-height',
        device: 'MOBILE_IOS_INSET',
    });

    await expectScreenshot(page);

    const changeFooterHeightButton = await screen.findByRole('button', {name: 'Change footer height'});

    await changeFooterHeightButton.click();

    await expectScreenshot(page);

    const addPlaceholderButton = await screen.findByRole('button', {name: 'Add placeholder'});

    await addPlaceholderButton.click();
    await addPlaceholderButton.click();
    await addPlaceholderButton.click();
    await addPlaceholderButton.click();

    await expectScreenshot(page);
});
