import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [
    {label: 'w:undefined, h:undefined, ar:undefined', forceNonCssAspectRatio: false},
    {label: 'w:200, h:undefined, ar:7:10', forceNonCssAspectRatio: false},
    {label: 'w:undefined, h:200, ar:7:10', forceNonCssAspectRatio: false},
    {label: 'w:200, h:undefined, ar:0', forceNonCssAspectRatio: false},
    {label: 'w:undefined, h:200, ar:0', forceNonCssAspectRatio: false},
    {label: 'w:200, h:50, ar:0', forceNonCssAspectRatio: false},
    {label: 'w:200, h:50, ar:7:10', forceNonCssAspectRatio: false},
    {label: 'w:50percent, h:undefined, ar:1', forceNonCssAspectRatio: false},
    {label: 'w:100percent, h:100percent, ar:undefined', forceNonCssAspectRatio: false},
    {label: 'w:50percent, h:50percent, ar:undefined', forceNonCssAspectRatio: false},
    {label: 'w:100percent, h:undefined, ar:2', forceNonCssAspectRatio: false},
    {label: 'w:50percent, h:undefined, ar:2', forceNonCssAspectRatio: false},
    {label: 'w:undefined, h:100percent, ar:0.5', forceNonCssAspectRatio: false},
    {label: 'w:undefined, h:50percent, ar:0.5', forceNonCssAspectRatio: false},
    {label: 'w:100percent, h:undefined, ar:2', forceNonCssAspectRatio: true},
    {label: 'w:50percent, h:undefined, ar:2', forceNonCssAspectRatio: true},
] as const) {
    const {label, forceNonCssAspectRatio} = testCase;
    test(`Image sizes - ${testCase.label}, arhack: ${testCase.forceNonCssAspectRatio}`, async () => {
        await openStoryPage({
            id: 'private-image-image-sizes--default',
            device: 'DESKTOP',
            args: {forceNonCssAspectRatio},
        });

        const element = await screen.findByLabelText(label);
        await expectScreenshot(element);
    });
}
