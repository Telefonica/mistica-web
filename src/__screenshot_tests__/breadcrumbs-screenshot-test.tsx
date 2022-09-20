import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['DESKTOP', 'MOBILE_IOS'] as const;

test.each(DEVICES)('Breadcrumbs %s', async (device) => {
    await openStoryPage({id: 'components-breadcrumbs--default', device});

    const element = await screen.findByTestId('story');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
