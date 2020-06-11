// @flow
import {openStoryPage, screen} from '../test-utils';

test('PromoTag', async () => {
    await openStoryPage({
        section: 'Components|PromoTag',
        name: 'Default',
    });

    const tag = await screen.getByTestId('promo-tag');

    const image = await tag.screenshot();
    expect(image).toMatchImageSnapshot();
});
