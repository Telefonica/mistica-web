import {openStoryPage, setRootFontSize} from '../test-utils';
import {BLAU_SKIN, MOVISTAR_SKIN, O2_NEW_SKIN, VIVO_NEW_SKIN} from '../skins/constants';

import type {Device} from '../test-utils';

const testableSkins = [MOVISTAR_SKIN, VIVO_NEW_SKIN, O2_NEW_SKIN, BLAU_SKIN] as const;
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

test.each(getCases())(
    'Feedback %s screen appears properly on %s and %s',
    async (feedbackType, skin, device) => {
        const page = await openStoryPage({
            id: `patterns-feedback-${feedbackType}`,
            skin: skin as (typeof testableSkins)[number],
            device,
        });

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each(getExtraContentCases())(
    'Feedback %s screen with extra content appears properly on %s',
    async (feedbackType, device) => {
        const page = await openStoryPage({
            id: `patterns-feedback-${feedbackType}`,
            device,
            args: {extra: true},
        });

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test('Feedback screen with large fontSize', async () => {
    const page = await openStoryPage({
        id: 'patterns-feedback-successfeedbackscreen--success',
        skin: MOVISTAR_SKIN,
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Info feedback screen with custom icon', async () => {
    const page = await openStoryPage({
        id: 'patterns-feedback-infofeedbackscreen--info',
        skin: MOVISTAR_SKIN,
        device: 'MOBILE_IOS',
        args: {asset: 'custom'},
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(testableDevices)(
    'Success feedback screen appears properly with Vivo New skin on %s',
    async (device) => {
        const page = await openStoryPage({
            id: 'patterns-feedback-successfeedbackscreen--success',
            skin: VIVO_NEW_SKIN,
            device,
        });

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
