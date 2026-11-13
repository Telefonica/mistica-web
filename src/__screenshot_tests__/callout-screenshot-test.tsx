import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

for (const testCase of [
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'default',
        variantOutside: 'default',
        closable: true,
        asset: true,
        case: '',
    },
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'default',
        variantOutside: 'inverse',
        closable: true,
        asset: true,
        case: 'over inverse',
    },
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'default',
        variantOutside: 'alternative',
        closable: true,
        asset: true,
        case: 'over alternative',
    },
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'inverse',
        variantOutside: 'default',
        closable: true,
        asset: true,
        case: 'inverse',
    },
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'inverse',
        variantOutside: 'inverse',
        closable: true,
        asset: true,
        case: 'inverse over inverse',
    },
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'inverse',
        variantOutside: 'alternative',
        closable: true,
        asset: true,
        case: 'inverse over alternative',
    },
    {
        actions: 'button and link',
        title: 'Some title',
        variant: 'default',
        variantOutside: 'default',
        closable: false,
        asset: true,
        case: 'not closable',
    },
    {
        actions: 'link',
        title: 'Some title',
        variant: 'default',
        variantOutside: 'default',
        closable: true,
        asset: true,
        case: 'with button link',
    },
    {
        actions: 'none',
        title: 'Some title',
        variant: 'default',
        variantOutside: 'default',
        closable: true,
        asset: true,
        case: 'without actions',
    },
    {
        actions: 'none',
        title: '',
        variant: 'default',
        variantOutside: 'default',
        closable: false,
        asset: false,
        case: 'only description',
    },
    {
        actions: 'none',
        title: '',
        variant: 'default',
        variantOutside: 'default',
        closable: true,
        asset: false,
        case: 'only description and closable',
    },
] as const) {
    const {actions, title, variant, variantOutside, closable, asset} = testCase;
    test(`Callout ${testCase.case}`, async () => {
        await openStoryPage({
            id: 'components-callout--default',
            args: {
                actions,
                title,
                variant: normalizeVariant(variant),
                variantOutside: normalizeVariant(variantOutside),
                closable,
                asset,
            },
        });

        const callout = await screen.findByRole('region');
        await expectScreenshot(callout);
    });
}

for (const testCase of [
    {actions: 'button and link', title: 'Some title', closable: true, asset: true, case: 'small'},
    {actions: 'none', title: '', closable: false, asset: false, case: 'small only description'},
] as const) {
    const {actions, title, closable, asset} = testCase;
    test(`Callout ${testCase.case}`, async () => {
        await openStoryPage({
            id: 'components-callout--default',
            args: {
                actions,
                title,
                variant: normalizeVariant('default'),
                variantOutside: normalizeVariant('default'),
                closable,
                asset,
                small: true,
            },
        });

        const callout = await screen.findByRole('region');
        await expectScreenshot(callout);
    });
}
