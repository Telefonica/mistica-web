import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'];
const BACKGROUND = ['default', 'brand'];

const getCases = () => {
    const cases = [];
    for (const background of BACKGROUND) {
        for (const device of DEVICES) {
            cases.push([background, device]);
        }
    }
    return cases;
};

test.each(getCases())('Hero - %s (%s)', async (background, device) => {
    await openStoryPage({
        id: 'components-hero--default',
        device: device as Device,
        args: {background},
    });

    const story = await screen.findByTestId('hero');
    expect(await story.screenshot()).toMatchImageSnapshot();
});
