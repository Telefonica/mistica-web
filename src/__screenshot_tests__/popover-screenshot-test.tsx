import {openStoryPage} from '../test-utils';

test.each`
    givenStoryPageArgs
    ${{position: 'top'}}
    ${{position: 'bottom'}}
`(`Popover in mobile $givenStoryPageArgs.position`, async ({givenStoryPageArgs}) => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'MOBILE_IOS',
        args: givenStoryPageArgs,
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    givenStoryPageArgs
    ${{position: 'top'}}
    ${{position: 'bottom'}}
    ${{position: 'left'}}
    ${{position: 'right'}}
`(`Popover in desktop $givenStoryPageArgs.position`, async ({givenStoryPageArgs}) => {
    const page = await openStoryPage({
        id: 'components-popover--default',
        device: 'DESKTOP',
        args: givenStoryPageArgs,
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
