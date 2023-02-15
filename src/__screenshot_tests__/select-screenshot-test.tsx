import {openStoryPage, screen} from '../test-utils';

test('Select', async () => {
    const page = await openStoryPage({id: 'components-select--default'});

    const story = await screen.findByTestId('select-story');

    await page.click(await screen.findByLabelText('Select a fruit to test it (opcional)'));

    expect(await story.screenshot()).toMatchImageSnapshot();
});
