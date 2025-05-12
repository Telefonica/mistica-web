import {openStoryPage, screen} from '../test-utils';

test.each`
    space        | align
    ${'around'}  | ${'center'}
    ${'evenly'}  | ${'center'}
    ${'between'} | ${'center'}
    ${'between'} | ${'flex-start'}
    ${'between'} | ${'flex-end'}
    ${'between'} | ${'baseline'}
    ${'between'} | ${'stretch'}
    ${'0px'}     | ${'center'}
    ${'8px'}     | ${'flex-start'}
    ${'16px'}    | ${'flex-end'}
    ${'24px'}    | ${'baseline'}
    ${'32px'}    | ${'stretch'}
`('Inline $space $align', async ({space, align}) => {
    await openStoryPage({
        id: 'layout-inline--default',
        args: {space, align},
    });

    const story = await screen.findByTestId('story');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Inline wrap', async () => {
    const page = await openStoryPage({id: 'layout-inline--wrap'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Inline wrap vertical space', async () => {
    const page = await openStoryPage({id: 'layout-inline--wrap', args: {verticalSpace: 16}});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

// This test is unstable (https://jira.tid.es/browse/WEB-1648)
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Inline negative space', async () => {
    const page = await openStoryPage({id: 'layout-inline--negative-space'});

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
