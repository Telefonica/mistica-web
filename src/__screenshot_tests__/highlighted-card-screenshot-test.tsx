import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('HighlightedCard in %s', async (device) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-highlightedcard--default',
        device,
    });

    const highlightedCard = await screen.findByTestId('highlighted-card');
    const image = await highlightedCard.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('HighlightedCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-highlightedcard--default',
        device,
    });

    await setRootFontSize(32);

    const highlightedCard = await screen.findByTestId('highlighted-card');
    const image = await highlightedCard.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('HighlightedCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-highlightedcard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each`
    title      | description
    ${'Title'} | ${'Description description description description'}
    ${''}      | ${'Description description description description'}
    ${'Title'} | ${''}
`('HighlightedCard combinations $title $description', async ({title, description}) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-highlightedcard--default',
        device: 'MOBILE_IOS',
        args: {title, description},
    });

    const highlightedCard = await screen.findByTestId('highlighted-card');
    const image = await highlightedCard.screenshot();
    expect(image).toMatchImageSnapshot();
});
