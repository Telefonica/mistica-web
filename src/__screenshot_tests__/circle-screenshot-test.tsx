import {openStoryPage, screen} from '../test-utils';

const CASES = [
    {size: 100, background: 'color'},
    {size: 100, background: 'color', icon: true},
    {size: 100, background: 'color', icon: true, border: true},
    {size: 100, background: 'image'},
    {size: 100, background: 'custom', icon: true},
] as const;

test.each(CASES)('Circle - %s', async (args) => {
    await openStoryPage({
        id: 'components-primitives-circle--default',
        args,
    });

    const story = await screen.findByTestId('circle');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
