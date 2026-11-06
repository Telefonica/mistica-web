import {test, expect} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

test('ssr image', async () => {
    const page = await openSSRPage({name: 'image', waitUntil: 'networkidle'});

    expect(await page.screenshot()).toMatchSnapshot('image-ssr-acceptance-test-tsx-ssr-image-2-snap.png');
});
