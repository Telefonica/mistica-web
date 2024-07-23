import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'Vivo-new', 'O2-new'] as const;
const DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

const getCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        for (const device of DEVICES) {
            cases.push([skin, device]);
        }
    }
    return cases;
};

test.each(getCases())('TextPresets as CSS vars in %s (%s)', async (skin, device) => {
    await openStoryPage({
        id: 'private-textpresets-css-vars--default',
        skin: skin as (typeof SKINS)[number],
        device: device as (typeof DEVICES)[number],
    });

    const story = await screen.findByTestId('story');
    expect(await story.screenshot()).toMatchImageSnapshot();
});
