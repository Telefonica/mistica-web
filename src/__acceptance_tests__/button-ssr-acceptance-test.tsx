import {test, expect} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr button', async () => {
    const page = await openSSRPage({name: 'button'});

    // TODO WIP temporary failure to check the merged Playwright report, revert before merge
    expect(await page.title()).toBe('Not the real page title');
});
