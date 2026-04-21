import {openSSRPage} from '../test-utils';

test('ssr image', async () => {
    // The Image component renders a skeleton overlay during SSR that is cleared on hydration,
    // producing an unavoidable visual diff between the pre- and post-hydration frames. The final
    // screenshot assertion still validates the rendered output.
    const page = await openSSRPage({
        name: 'image',
        waitUntil: 'networkidle0',
        checkHidrationVisualMismatch: false,
    });

    expect(await page.screenshot()).toMatchImageSnapshot();
});
