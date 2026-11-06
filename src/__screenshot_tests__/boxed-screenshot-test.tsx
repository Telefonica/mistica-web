import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [
    {overInverse: false, inverse: false},
    {overInverse: false, inverse: true},
    {overInverse: true, inverse: false},
    {overInverse: true, inverse: true},
] as const) {
    const {overInverse, inverse} = testCase;
    test(`Boxed inverseOutside(${testCase.overInverse}) inverseInside(${testCase.inverse})`, async () => {
        await openStoryPage({
            id: 'components-primitives-boxed--default',
            device: 'MOBILE_IOS',
            args: {
                variantOutside: overInverse ? 'brand' : 'default',
                variant: inverse ? 'brand' : 'default',
            },
        });

        await expectScreenshot(await screen.findByTestId('boxed'));
    });
}
