import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const COMPONENT_TYPES = [
    {component: 'Title1', storyName: 'title-1'},
    {component: 'Title2', storyName: 'title-2'},
    {component: 'Title3', storyName: 'title-3'},
];
const CASE_NAMES = ['without-link', 'with-link', 'with-link-and-long-text'] as const;
const DEVICES = ['DESKTOP', 'MOBILE_IOS'] as const;

const caseArgs = {
    'without-link': {title: 'This is a title', linkText: ''},
    'with-link': {title: 'This is a title with link', linkText: 'Link'},
    'with-link-and-long-text': {
        title: 'This is a title with link and with a very long text that may wrap to multiple lines in small screens',
        linkText: 'Link',
    },
};

const getCases = () => {
    const cases = [];
    for (const componentType of COMPONENT_TYPES) {
        for (const caseName of CASE_NAMES) {
            for (const device of DEVICES) {
                cases.push([componentType.component, caseName, device, componentType.storyName]);
            }
        }
    }
    return cases;
};

test.each(getCases())('%s (%s) - %s', async (_, caseName, device, storyName) => {
    const args = caseArgs[caseName as (typeof CASE_NAMES)[number]];

    await openStoryPage({
        id: `components-titles--${storyName}-story`,
        device: device as Device,
        args: {title: args.title, linkText: args.linkText},
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
