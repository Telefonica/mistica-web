// @flow
import {openStoryPage, screen} from '../test-utils';

test('TextLink common component screenshot', async () => {
    await openStoryPage({
        section: 'Components|TextLink',
        name: 'Default',
    });

    const textLink = await screen.getByTestId('text-link');

    const image = await textLink.screenshot();

    expect(image).toMatchImageSnapshot();
});
