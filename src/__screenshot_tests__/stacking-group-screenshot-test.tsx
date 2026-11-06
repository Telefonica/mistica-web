import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, renderingTolerance} from '../test-utils';

for (const testCase of [
    {type: 'square', stacked: true, inverse: false},
    {type: 'circle', stacked: true, inverse: false},
    {type: 'square', stacked: false, inverse: false},
    {type: 'circle', stacked: false, inverse: false},
    {type: 'square', stacked: true, inverse: true},
    {type: 'circle', stacked: true, inverse: true},
    {type: 'square', stacked: false, inverse: true},
    {type: 'circle', stacked: false, inverse: true},
] as const) {
    const {type, stacked, inverse} = testCase;
    test(`Stacking Group. type={${testCase.type}} stacked={${testCase.stacked}} inverse={${testCase.inverse}}`, async () => {
        await openStoryPage({
            id: 'components-stackinggroup--default',
            device: 'DESKTOP',
            args: {type, stacked, variantOutside: inverse ? 'brand' : 'default'},
        });

        const element = await screen.findByTestId('stacking-group');
        await expectScreenshot(element, {...renderingTolerance});
    });
}
