import {openStoryPage} from '../test-utils';

test('Double Field', async () => {
    const page = await openStoryPage({
        section: 'Components/Forms/DoubleField',
        name: 'Default',
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});
