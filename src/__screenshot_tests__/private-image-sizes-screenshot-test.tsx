import {openStoryPage, screen} from '../test-utils';

test.each`
    label                                         | forceNonCssAspectRatio
    ${'w:undefined, h:undefined, ar:undefined'}   | ${false}
    ${'w:200, h:undefined, ar:7:10'}              | ${false}
    ${'w:undefined, h:200, ar:7:10'}              | ${false}
    ${'w:200, h:undefined, ar:0'}                 | ${false}
    ${'w:undefined, h:200, ar:0'}                 | ${false}
    ${'w:200, h:50, ar:0'}                        | ${false}
    ${'w:200, h:50, ar:7:10'}                     | ${false}
    ${'w:50percent, h:undefined, ar:1'}           | ${false}
    ${'w:100percent, h:100percent, ar:undefined'} | ${false}
    ${'w:50percent, h:50percent, ar:undefined'}   | ${false}
    ${'w:100percent, h:undefined, ar:2'}          | ${false}
    ${'w:50percent, h:undefined, ar:2'}           | ${false}
    ${'w:undefined, h:100percent, ar:0.5'}        | ${false}
    ${'w:undefined, h:50percent, ar:0.5'}         | ${false}
    ${'w:100percent, h:undefined, ar:2'}          | ${true}
    ${'w:50percent, h:undefined, ar:2'}           | ${true}
`('Image sizes - $label, arhack: $forceNonCssAspectRatio', async ({label, forceNonCssAspectRatio}) => {
    await openStoryPage({
        id: 'private-image-image-sizes--default',
        device: 'DESKTOP',
        args: {forceNonCssAspectRatio},
    });

    const element = await screen.findByLabelText(label);
    expect(await element.screenshot()).toMatchImageSnapshot();
});
