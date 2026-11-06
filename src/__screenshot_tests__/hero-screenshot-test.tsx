import {test, expectScreenshot} from '../test-utils/playwright';
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

for (const testCase of getCases()) {
    const [background, device] = testCase;
    test(`Hero - ${testCase[0]} (${testCase[1]})`, async () => {
        await openStoryPage({
            id: 'components-hero-hero--default',
            device: device as Device,
            args: {background},
        });

        const story = await screen.findByTestId('hero');
        await expectScreenshot(story);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Hero - no vertical padding (${testCase})`, async () => {
        await openStoryPage({
            id: 'components-hero-hero--default',
            device,
            args: {noPaddingY: true},
        });

        const story = await screen.findByTestId('hero');
        await expectScreenshot(story);
    });
}

test('Hero - custom height', async () => {
    await openStoryPage({
        id: 'components-hero-hero--default',
        device: 'MOBILE_IOS',
        args: {height: '1000px'},
    });

    const story = await screen.findByTestId('hero');
    await expectScreenshot(story);
});

test('Hero - background brand in O2 skin', async () => {
    await openStoryPage({
        id: 'components-hero-hero--default',
        skin: 'O2',
        args: {background: 'brand'},
    });

    const story = await screen.findByTestId('hero');
    await expectScreenshot(story);
});
