import {openStoryPage, screen} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

test.each`
    actions              | title           | variant      | variantOutside   | closable | asset    | case
    ${'button and link'} | ${'Some title'} | ${'default'} | ${'default'}     | ${true}  | ${true}  | ${''}
    ${'button and link'} | ${'Some title'} | ${'default'} | ${'inverse'}     | ${true}  | ${true}  | ${'over inverse'}
    ${'button and link'} | ${'Some title'} | ${'default'} | ${'alternative'} | ${true}  | ${true}  | ${'over alternative'}
    ${'button and link'} | ${'Some title'} | ${'inverse'} | ${'default'}     | ${true}  | ${true}  | ${'inverse'}
    ${'button and link'} | ${'Some title'} | ${'inverse'} | ${'inverse'}     | ${true}  | ${true}  | ${'inverse over inverse'}
    ${'button and link'} | ${'Some title'} | ${'inverse'} | ${'alternative'} | ${true}  | ${true}  | ${'inverse over alternative'}
    ${'button and link'} | ${'Some title'} | ${'default'} | ${'default'}     | ${false} | ${true}  | ${'not closable'}
    ${'link'}            | ${'Some title'} | ${'default'} | ${'default'}     | ${true}  | ${true}  | ${'with button link'}
    ${'none'}            | ${'Some title'} | ${'default'} | ${'default'}     | ${true}  | ${true}  | ${'without actions'}
    ${'none'}            | ${''}           | ${'default'} | ${'default'}     | ${false} | ${false} | ${'only description'}
    ${'none'}            | ${''}           | ${'default'} | ${'default'}     | ${true}  | ${false} | ${'only description and closable'}
`('Callout $case', async ({actions, title, variant, variantOutside, closable, asset}) => {
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
    const image = await callout.screenshot();

    expect(image).toMatchImageSnapshot();
});
