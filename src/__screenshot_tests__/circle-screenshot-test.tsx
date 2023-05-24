import {openStoryPage, screen} from '../test-utils';

test('Circle', async () => {
    await openStoryPage({id: 'components-primitives-circle--default'});

    const story = await screen.findByTestId('circle');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
