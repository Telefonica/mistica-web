import {openStoryPage, screen} from '../test-utils';

test('HighlightedCard common component screenshot', async () => {
    await openStoryPage({
        section: 'Components|Cards/HighlightedCard',
        name: 'HighlightedCard',
    });

    const highlightedCard = await screen.findByTestId('highlighted-card');

    const image = await highlightedCard.screenshot();

    expect(image).toMatchImageSnapshot();
});
