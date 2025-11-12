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
            icon: option.includes('icon'),
            closable: option.includes('closable'),
        },
    });

    const story = await screen.findByTestId('chip');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test.each(CHIP_OPTIONS)('Chip small - %s', async (option) => {
    await openStoryPage({
        id: 'components-chip--default',
        device: 'DESKTOP',
        args: {
            badge: option.includes('badge') ? '2' : 'undefined',
            icon: option.includes('icon'),
            closable: option.includes('closable'),
            small: true,
        },
    });

    const story = await screen.findByTestId('chip');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test.each`
    selection     | inverse  | badge
    ${'single'}   | ${false} | ${undefined}
    ${'single'}   | ${true}  | ${undefined}
    ${'multiple'} | ${false} | ${undefined}
    ${'multiple'} | ${true}  | ${undefined}
    ${'single'}   | ${false} | ${2}
    ${'single'}   | ${true}  | ${2}
    ${'multiple'} | ${false} | ${2}
    ${'multiple'} | ${true}  | ${2}
`('Chip - $selection selection (inverse = $inverse, badge = $badge)', async ({selection, inverse, badge}) => {
    const page = await openStoryPage({
        id: `components-chip--${selection}-selection`,
        device: 'DESKTOP',
        args: {inverse, icon: true, badge},
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
test('Chip - navigable with href and active', async () => {
    await openStoryPage({
        id: 'components-chip--navigable-chip',
        device: 'DESKTOP',
        args: {
            icon: true,
        },
    });

    const story = await screen.findByTestId('navigable-chip');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
test('Chip - navigable with href and active and inverse', async () => {
    await openStoryPage({
        id: 'components-chip--navigable-chip',
        device: 'DESKTOP',
        args: {
            icon: true,
            inverse: true,
        },
    });

    const story = await screen.findByTestId('navigable-chip');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
