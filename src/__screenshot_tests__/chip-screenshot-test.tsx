import {openStoryPage, screen} from '../test-utils';

test('Chip', async () => {
    const page = await openStoryPage({id: 'components-others-chip--default'});

    const story = await screen.findByTestId('chip-story');

    expect(await story.screenshot()).toMatchImageSnapshot();

    const checkboxChip = await screen.findByRole('checkbox', {name: 'Chip 1'});

    await page.click(checkboxChip);

    expect(await story.screenshot()).toMatchImageSnapshot();
});
