import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [
    {space: 'around', align: 'center'},
    {space: 'evenly', align: 'center'},
    {space: 'between', align: 'center'},
    {space: 'between', align: 'flex-start'},
    {space: 'between', align: 'flex-end'},
    {space: 'between', align: 'baseline'},
    {space: 'between', align: 'stretch'},
    {space: '0px', align: 'center'},
    {space: '8px', align: 'flex-start'},
    {space: '16px', align: 'flex-end'},
    {space: '24px', align: 'baseline'},
    {space: '32px', align: 'stretch'},
] as const) {
    const {space, align} = testCase;
    test(`Inline ${testCase.space} ${testCase.align}`, async () => {
        await openStoryPage({
            id: 'layout-inline--default',
            args: {space, align},
        });

        const story = await screen.findByTestId('story');
        await expectScreenshot(story);
    });
}

test('Inline wrap', async () => {
    const page = await openStoryPage({id: 'layout-inline--wrap'});

    await expectScreenshot(page);
});

test('Inline wrap vertical space', async () => {
    const page = await openStoryPage({id: 'layout-inline--wrap', args: {verticalSpace: 16}});

    await expectScreenshot(page);
});

// This test is unstable (https://jira.tid.es/browse/WEB-1648)
test.skip('Inline negative space', async () => {
    const page = await openStoryPage({id: 'layout-inline--negative-space'});

    await expectScreenshot(page);
});

test('Inline with expand', async () => {
    await openStoryPage({
        id: 'layout-inline--expand',
        device: 'DESKTOP',
    });

    const story = await screen.findByTestId('story');
    await expectScreenshot(story);
});
