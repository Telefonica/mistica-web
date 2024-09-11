import {openStoryPage, screen} from '../test-utils';

test.each`
    actions              | title           | inverse  | closable | asset    | case
    ${'button and link'} | ${'Some title'} | ${false} | ${true}  | ${true}  | ${''}
    ${'button and link'} | ${'Some title'} | ${true}  | ${true}  | ${true}  | ${'over inverse'}
    ${'button and link'} | ${'Some title'} | ${false} | ${false} | ${true}  | ${'not closable'}
    ${'link'}            | ${'Some title'} | ${false} | ${true}  | ${true}  | ${'with button link'}
    ${'none'}            | ${'Some title'} | ${false} | ${true}  | ${true}  | ${'without actions'}
    ${'none'}            | ${''}           | ${false} | ${false} | ${false} | ${'only description'}
    ${'none'}            | ${''}           | ${false} | ${true}  | ${false} | ${'only description and closable'}
`('Callout $case', async ({actions, title, inverse, closable, asset}) => {
    await openStoryPage({
        id: 'components-callout--default',
        args: {actions, title, inverse, closable, asset},
    });

    const callout = await screen.findByRole('region');
    const image = await callout.screenshot();

    expect(image).toMatchImageSnapshot();
});
