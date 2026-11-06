import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, setRootFontSize} from '../test-utils';
import {BLAU_SKIN, MOVISTAR_SKIN, O2_SKIN, VIVO_EVOLUTION_SKIN, VIVO_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, VIVO_SKIN, VIVO_EVOLUTION_SKIN, O2_SKIN, BLAU_SKIN] as const;
const testableDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const feedbackTypes = [
    'successfeedbackscreen--success',
    'errorfeedbackscreen--error',
    'infofeedbackscreen--info',
];

const getCases = () => {
    const cases: Array<[string, string, Device]> = [];
    for (const skin of testableSkins) {
        for (const device of testableDevices) {
            for (const feedbackType of feedbackTypes) {
                cases.push([feedbackType, skin, device]);
            }
        }
    }
    return cases;
};

const getExtraContentCases = () => {
    const cases: Array<[string, Device]> = [];
    for (const device of testableDevices) {
        for (const feedbackType of feedbackTypes) {
            cases.push([feedbackType, device]);
        }
    }
    return cases;
};

for (const testCase of getCases()) {
    const [feedbackType, skin, device] = testCase;
    test(`Feedback ${testCase[0]} screen appears properly on ${testCase[1]} and ${testCase[2]}`, async () => {
        const page = await openStoryPage({
            id: `patterns-feedback-${feedbackType}`,
            skin: skin as (typeof testableSkins)[number],
            device,
        });

        await expectScreenshot(page);
    });
}

for (const testCase of getExtraContentCases()) {
    const [feedbackType, device] = testCase;
    test(`Feedback ${testCase[0]} screen with slot content appears properly on ${testCase[1]}`, async () => {
        const page = await openStoryPage({
            id: `patterns-feedback-${feedbackType}`,
            device,
            args: {slot: true},
        });

        await expectScreenshot(page);
    });
}

test('Feedback screen with large fontSize', async () => {
    const page = await openStoryPage({
        id: 'patterns-feedback-successfeedbackscreen--success',
        skin: MOVISTAR_SKIN,
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    await expectScreenshot(page);
});

test('Info feedback screen with custom icon', async () => {
    const page = await openStoryPage({
        id: 'patterns-feedback-infofeedbackscreen--info',
        skin: MOVISTAR_SKIN,
        device: 'MOBILE_IOS',
        args: {asset: 'custom'},
    });

    await expectScreenshot(page);
});

for (const testCase of testableDevices) {
    const device = testCase;
    test(`Success feedback screen appears properly with Vivo skin on ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'patterns-feedback-successfeedbackscreen--success',
            skin: VIVO_SKIN,
            device,
        });

        await expectScreenshot(page);
    });
}
