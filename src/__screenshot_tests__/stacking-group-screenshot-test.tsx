import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, renderingTolerance} from '../test-utils';

const STACKED_CIRCLE_MAX_DIFF_PIXEL_RATIO = {default: 0.007, brand: 0.003};

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
        const variantOutside = inverse ? 'brand' : 'default';
        await openStoryPage({
            id: 'components-stackinggroup--default',
            device: 'DESKTOP',
            args: {type, stacked, variantOutside},
        });

        const element = await screen.findByTestId('stacking-group');
        const maxDiffPixelRatio =
            type === 'circle' && stacked
                ? STACKED_CIRCLE_MAX_DIFF_PIXEL_RATIO[variantOutside]
                : renderingTolerance.maxDiffPixelRatio;
        await expectScreenshot(element, {maxDiffPixelRatio});
    });
}
