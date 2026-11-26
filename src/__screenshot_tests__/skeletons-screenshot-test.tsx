import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const normalizeArgs = (args: Record<string, any>) => {
    const {inverse, ...rest} = args;
    return {
        ...rest,
        variantOutside: inverse ? 'brand' : 'default',
    };
};

for (const testCase of [
    {givenStoryPageArgs: {inverse: false}},
    {givenStoryPageArgs: {inverse: true}},
    {givenStoryPageArgs: {inverse: false, size: 60}},
    {givenStoryPageArgs: {inverse: true, size: 60}},
    {givenStoryPageArgs: {inverse: false, size: 100}},
    {givenStoryPageArgs: {inverse: true, size: 100}},
] as const) {
    const {givenStoryPageArgs} = testCase;
    test(`Skeleton circle given inverse ${testCase.givenStoryPageArgs.inverse} and size of ${testCase.givenStoryPageArgs.size}`, async () => {
        await openStoryPage({
            id: 'components-skeletons-skeletoncircle',
            device: 'MOBILE_IOS',
            args: normalizeArgs(givenStoryPageArgs),
        });

        const element = await screen.findByTestId('skeleton-circle');
        await expectScreenshot(element);
    });
}

for (const testCase of [
    {givenStoryPageArgs: {inverse: false}},
    {givenStoryPageArgs: {inverse: true}},
] as const) {
    const {givenStoryPageArgs} = testCase;
    test(`Skeleton row given inverse ${testCase.givenStoryPageArgs.inverse}`, async () => {
        await openStoryPage({
            id: 'components-skeletons-skeletonrow',
            device: 'MOBILE_IOS',
            args: normalizeArgs(givenStoryPageArgs),
        });

        const element = await screen.findByTestId('skeleton-row');
        await expectScreenshot(element);
    });
}

for (const testCase of [
    {givenStoryPageArgs: {inverse: false}},
    {givenStoryPageArgs: {inverse: true}},
    {givenStoryPageArgs: {inverse: false, height: 70}},
    {givenStoryPageArgs: {inverse: true, height: 70}},
    {givenStoryPageArgs: {inverse: true, height: 70, width: 30}},
] as const) {
    const {givenStoryPageArgs} = testCase;
    test(`Skeleton rectangle given inverse ${testCase.givenStoryPageArgs.inverse} and height ${testCase.givenStoryPageArgs.height} and width ${testCase.givenStoryPageArgs.width}`, async () => {
        await openStoryPage({
            id: 'components-skeletons-skeletonrectangle',
            device: 'MOBILE_IOS',
            args: normalizeArgs(givenStoryPageArgs),
        });

        const element = await screen.findByTestId('skeleton-rectangle');
        await expectScreenshot(element);
    });
}

for (const testCase of [
    {givenStoryPageArgs: {inverse: false}},
    {givenStoryPageArgs: {inverse: true}},
] as const) {
    const {givenStoryPageArgs} = testCase;
    test(`Skeleton text given inverse ${testCase.givenStoryPageArgs.inverse}`, async () => {
        await openStoryPage({
            id: 'components-skeletons-skeletontext',
            device: 'MOBILE_IOS',
            args: normalizeArgs(givenStoryPageArgs),
        });

        const element = await screen.findByTestId('skeleton-text');
        await expectScreenshot(element);
    });
}

for (const testCase of [
    {givenStoryPageArgs: {inverse: false}},
    {givenStoryPageArgs: {inverse: true}},
] as const) {
    const {givenStoryPageArgs} = testCase;
    test(`Skeleton line given inverse ${testCase.givenStoryPageArgs.inverse}`, async () => {
        await openStoryPage({
            id: 'components-skeletons-skeletonline',
            device: 'MOBILE_IOS',
            args: normalizeArgs(givenStoryPageArgs),
        });

        const element = await screen.findByTestId('skeleton-line');
        await expectScreenshot(element);
    });
}
