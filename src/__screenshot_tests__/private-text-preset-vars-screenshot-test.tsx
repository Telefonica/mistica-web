import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'Vivo-new', 'O2-new'] as const;

test.each(SKINS)('TextPresets as CSS vars in %s', async (skin) => {
    await openStoryPage({
        id: 'private-textpresets-css-vars--default',
        skin,
    });

    const story = await screen.findByTestId('story');
    expect(await story.screenshot()).toMatchImageSnapshot();
});
