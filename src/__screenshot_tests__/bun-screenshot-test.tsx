// @flow
import {openStoryPage, screen} from '../test-utils';

test('Bun common component screenshot', async () => {
    await openStoryPage({
        section: 'Components|Cards/Bun',
        name: 'bun',
    });

    const bun = await screen.getByTestId('bun');

    const image = await bun.screenshot();

    expect(image).toMatchImageSnapshot();
});
