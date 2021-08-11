import {openStoryPage} from '../test-utils';

test.each`
    space
    ${0}
    ${32}
    ${'between'}
    ${'evenly'}
`('Stack space: $space', async ({space}) => {
    const page = await openStoryPage({
        id: 'components-layouts-stack--default',
        args: {space},
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
