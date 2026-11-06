import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

for (const testCase of [
    {overInverse: false, singleOpen: false},
    {overInverse: false, singleOpen: true},
    {overInverse: true, singleOpen: false},
    {overInverse: true, singleOpen: true},
] as const) {
    const {overInverse, singleOpen} = testCase;
    test(`Accordion. overInverse(${testCase.overInverse}) singleOpen(${testCase.singleOpen})`, async () => {
        await openStoryPage({
            id: 'components-accordions--accordion-story',
            device: 'MOBILE_IOS',
            args: {
                variantOutside: overInverse ? 'brand' : 'default',
                singleOpen,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await expectScreenshot(accordion);

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        await expectScreenshot(accordion);
    });
}

for (const testCase of [
    {inverse: false, overInverse: false, singleOpen: false},
    {inverse: false, overInverse: false, singleOpen: true},
    {inverse: false, overInverse: true, singleOpen: false},
    {inverse: false, overInverse: true, singleOpen: true},
    {inverse: true, overInverse: false, singleOpen: false},
    {inverse: true, overInverse: false, singleOpen: true},
    {inverse: true, overInverse: true, singleOpen: false},
    {inverse: true, overInverse: true, singleOpen: true},
] as const) {
    const {inverse, overInverse, singleOpen} = testCase;
    test(`BoxedAccordion. inverse(${testCase.inverse}) overInverse(${testCase.overInverse}) singleOpen(${testCase.singleOpen})`, async () => {
        await openStoryPage({
            id: 'components-accordions--boxed-accordion-story',
            device: 'MOBILE_IOS',
            args: {
                variant: inverse ? 'brand' : 'default',
                variantOutside: overInverse ? 'brand' : 'default',
                singleOpen,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await expectScreenshot(accordion);

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        await expectScreenshot(accordion);
    });
}

for (const testCase of [
    {detail: '', right: false, overInverse: false},
    {detail: '', right: true, overInverse: false},
    {detail: 'Detail', right: false, overInverse: false},
    {detail: 'Detail', right: true, overInverse: false},
    {detail: 'Detail', right: true, overInverse: true},
] as const) {
    const {detail, right, overInverse} = testCase;
    test(`Accordion. detail(${testCase.detail}) right(${testCase.right}) overInverse(${testCase.overInverse})`, async () => {
        await openStoryPage({
            id: 'components-accordions--accordion-story',
            device: 'MOBILE_IOS',
            args: {
                detail,
                right,
                variantOutside: overInverse ? 'brand' : 'default',
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        await expectScreenshot(accordion);
    });
}

for (const testCase of [
    {detail: '', right: false},
    {detail: '', right: true},
    {detail: 'Detail', right: false},
    {detail: 'Detail', right: true},
] as const) {
    const {detail, right} = testCase;
    test(`BoxedAccordion. detail(${testCase.detail}) right(${testCase.right})`, async () => {
        await openStoryPage({
            id: 'components-accordions--boxed-accordion-story',
            device: 'MOBILE_IOS',
            args: {
                detail,
                right,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        await expectScreenshot(accordion);
    });
}

for (const testCase of [
    {overInverse: false, singleOpen: false},
    {overInverse: false, singleOpen: true},
    {overInverse: true, singleOpen: false},
    {overInverse: true, singleOpen: true},
] as const) {
    const {overInverse, singleOpen} = testCase;
    test(`Accordion small. overInverse(${testCase.overInverse}) singleOpen(${testCase.singleOpen})`, async () => {
        await openStoryPage({
            id: 'components-accordions--accordion-story',
            device: 'MOBILE_IOS',
            args: {
                small: true,
                variantOutside: overInverse ? 'brand' : 'default',
                singleOpen,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await expectScreenshot(accordion);

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        await expectScreenshot(accordion);
    });
}

for (const testCase of [
    {inverse: false, overInverse: false, singleOpen: false},
    {inverse: false, overInverse: false, singleOpen: true},
    {inverse: false, overInverse: true, singleOpen: false},
    {inverse: false, overInverse: true, singleOpen: true},
    {inverse: true, overInverse: false, singleOpen: false},
    {inverse: true, overInverse: false, singleOpen: true},
    {inverse: true, overInverse: true, singleOpen: false},
    {inverse: true, overInverse: true, singleOpen: true},
] as const) {
    const {inverse, overInverse, singleOpen} = testCase;
    test(`BoxedAccordion small. inverse(${testCase.inverse}) overInverse(${testCase.overInverse}) singleOpen(${testCase.singleOpen})`, async () => {
        await openStoryPage({
            id: 'components-accordions--boxed-accordion-story',
            device: 'MOBILE_IOS',
            args: {
                small: true,
                variant: inverse ? 'brand' : 'default',
                variantOutside: overInverse ? 'brand' : 'default',
                singleOpen,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await expectScreenshot(accordion);

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        await expectScreenshot(accordion);
    });
}
