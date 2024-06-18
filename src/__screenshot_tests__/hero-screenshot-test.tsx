import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;
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
        id: 'components-hero-hero--default',
        device: device as Device,
        args: {background},
    });

    const story = await screen.findByTestId('hero');
    expect(await story.screenshot()).toMatchImageSnapshot();
});

test.each(DEVICES)('Hero - no vertical padding (%s)', async (device) => {
    await openStoryPage({
        id: 'components-hero-hero--default',
        device,
        args: {noPaddingY: true},
    });

    const story = await screen.findByTestId('hero');
    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('Hero - custom height', async () => {
    await openStoryPage({
        id: 'components-hero-hero--default',
        device: 'MOBILE_IOS',
        args: {height: '1000px'},
    });

    const story = await screen.findByTestId('hero');
    expect(await story.screenshot()).toMatchImageSnapshot();
});

test('Hero - background brand in O2-new skin', async () => {
    await openStoryPage({
        id: 'components-hero-hero--default',
        skin: 'O2-new',
        args: {background: 'brand'},
    });

    const story = await screen.findByTestId('hero');
    expect(await story.screenshot()).toMatchImageSnapshot();
});
