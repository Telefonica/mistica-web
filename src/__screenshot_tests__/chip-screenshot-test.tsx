import {openStoryPage, screen} from '../test-utils';

const CHIP_OPTIONS = [
    'default',
    'with badge',
    'with icon',
    'closable',
    'with badge and icon',
    'with icon and closable',
];

test.each(CHIP_OPTIONS)('Chip - %s', async (option) => {
    await openStoryPage({
        id: 'components-chip--default',
        device: 'DESKTOP',
        args: {
            badge: option.includes('badge') ? '2' : 'undefined',
            withIcon: option.includes('icon'),
            closable: option.includes('closable'),
        },
    });

    const story = await screen.findByTestId('chip');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test.each`
    selection     | inverse
    ${'single'}   | ${false}
    ${'single'}   | ${true}
    ${'multiple'} | ${false}
    ${'multiple'} | ${true}
`('Chip - $selection selection (inverse = $inverse)', async ({selection, inverse}) => {
    const page = await openStoryPage({
        id: `components-chip--${selection}-selection`,
        device: 'DESKTOP',
        args: {inverse, withIcon: true},
    });

    const story = await screen.findByTestId(`chip-${selection}-selection`);

    expect(await story.screenshot()).toMatchImageSnapshot();

    const chips = await screen.findAllByRole(selection === 'single' ? 'radio' : 'checkbox');

    await page.click(chips[1]);
    await page.click(chips[2]);

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('Chip - should expand when inside a grid', async () => {
    await openStoryPage({
        id: 'private-chips-inside-a-grid--default',
    });

    const story = await screen.findByTestId('chips');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
