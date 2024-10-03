import {openStoryPage, screen} from '../test-utils';

const ALIGN_OPTIONS = ['start', 'center', 'end'];

const getCases = () => {
    const cases = [];
    for (const x of ALIGN_OPTIONS) {
        for (const y of ALIGN_OPTIONS) {
            cases.push([x, y]);
        }
    }
    return cases;
};

test.each(getCases())('Align x="%s" and y="%s" (%s)', async (x, y) => {
    await openStoryPage({
        id: 'layout-align--default',
        device: 'MOBILE_IOS',
        args: {x, y},
    });

    const element = await screen.findByTestId('story');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
