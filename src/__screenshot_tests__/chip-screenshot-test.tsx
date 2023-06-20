import {openStoryPage, screen} from '../test-utils';

test('Chip', async () => {
    const page = await openStoryPage({
        id: 'components-chip--default',
        device: 'DESKTOP',
    });

    const story = await screen.findByTestId('chip-story');

    expect(await story.screenshot()).toMatchImageSnapshot();

    const checkboxChip = await screen.findByRole('checkbox', {name: 'Chip 1'});
    const checkboxChip3 = await screen.findByRole('checkbox', {name: 'Chip 3'});

    await page.click(checkboxChip);
    await page.click(checkboxChip3);

    expect(await story.screenshot()).toMatchImageSnapshot();
});
