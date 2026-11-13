import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const CHIP_OPTIONS = [
    'default',
    'with badge',
    'with icon',
    'closable',
    'with badge and icon',
    'with icon and closable',
];

for (const testCase of CHIP_OPTIONS) {
    const option = testCase;
    test(`Chip - ${testCase}`, async () => {
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

        await expectScreenshot(story);
    });
}

for (const testCase of CHIP_OPTIONS) {
    const option = testCase;
    test(`Chip small - ${testCase}`, async () => {
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

        await expectScreenshot(story);
    });
}

for (const testCase of [
    {selection: 'single', inverse: false, badge: undefined},
    {selection: 'single', inverse: true, badge: undefined},
    {selection: 'multiple', inverse: false, badge: undefined},
    {selection: 'multiple', inverse: true, badge: undefined},
    {selection: 'single', inverse: false, badge: 2},
    {selection: 'single', inverse: true, badge: 2},
    {selection: 'multiple', inverse: false, badge: 2},
    {selection: 'multiple', inverse: true, badge: 2},
] as const) {
    const {selection, inverse, badge} = testCase;
    test(`Chip - ${testCase.selection} selection (inverse = ${testCase.inverse}, badge = ${testCase.badge})`, async () => {
        await openStoryPage({
            id: `components-chip--${selection}-selection`,
            device: 'DESKTOP',
            args: {variantOutside: inverse ? 'brand' : 'default', icon: true, badge},
        });

        const story = await screen.findByTestId(`chip-${selection}-selection`);

        await expectScreenshot(story);

        const chips = await screen.findAllByRole(selection === 'single' ? 'radio' : 'checkbox');

        await chips[1].click();
        await chips[2].click();

        await expectScreenshot(story);
    });
}

test('Chip - should expand when inside a grid', async () => {
    await openStoryPage({
        id: 'private-chips-inside-a-grid--default',
    });

    const story = await screen.findByTestId('chips');

    await expectScreenshot(story);
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

    await expectScreenshot(story);
});
test('Chip - navigable with href and active and inverse', async () => {
    await openStoryPage({
        id: 'components-chip--navigable-chip',
        device: 'DESKTOP',
        args: {
            icon: true,
            variantOutside: 'brand',
        },
    });

    const story = await screen.findByTestId('navigable-chip');

    await expectScreenshot(story);
});
