import {openSSRPage} from '../test-utils';

test('ssr image', async () => {
    const page = await openSSRPage({name: 'image', waitUntil: 'networkidle'});

    expect(await page.screenshot()).toMatchImageSnapshot();
});
