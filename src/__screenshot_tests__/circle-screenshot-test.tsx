import {openStoryPage, screen} from '../test-utils';
import {vars} from '../skins/skin-contract.css';

const CONTENT_OPTIONS = ['color', 'image', 'icon', 'none'];

test.each(CONTENT_OPTIONS)('Circle - %s', async (content) => {
    await openStoryPage({
        id: 'components-primitives-circle--default',
        args: {content, border: content === 'none', size: 100},
    });

    const story = await screen.findByTestId('circle');

    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('Circle with custom background', async () => {
    await openStoryPage({
        id: 'components-primitives-circle--default',
        skin: 'O2-new',
        args: {
            content: 'none',
            border: true,
            size: 100,
            customBackground: true,
        },
    });
    console.log('screen', vars.colors.backgroundBrand);
    const story = await screen.findByTestId('circle');

    expect(await story.screenshot()).toMatchImageSnapshot();
});
