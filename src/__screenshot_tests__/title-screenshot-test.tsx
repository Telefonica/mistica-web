import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const COMPONENT_TYPES = [
    {component: 'Title1', storyName: 'title-1'},
    {component: 'Title2', storyName: 'title-2'},
    {component: 'Title3', storyName: 'title-3'},
    {component: 'Title4', storyName: 'title-4'},
];
const CASE_NAMES = ['without-link', 'with-link', 'with-link-and-long-text', 'with-icon'] as const;
const DEVICES = ['DESKTOP', 'MOBILE_IOS'] as const;

const caseArgs = {
    'without-link': {title: 'This is a title', right: 'undefined', linkText: undefined},
    'with-link': {title: 'This is a title with link', right: 'link', linkText: 'Link'},
    'with-link-and-long-text': {
        title: 'This is a title with link and with a very long text that may wrap to multiple lines in small screens',
        right: 'link',
        linkText: 'Link',
    },
    'with-icon': {title: 'This is a title', right: 'icon', linkText: undefined},
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

test.each(getCases())('%s (%s) - %s', async (component, caseName, device, storyName) => {
    const args = caseArgs[caseName as (typeof CASE_NAMES)[number]];

    await openStoryPage({
        id: `components-titles--${storyName}-story`,
        device: device as Device,
        args: {title: args.title, right: args.right, ...(args.linkText ? {linkText: args.linkText} : {})},
    });

    const element = await screen.findByTestId(component);
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
});
