import {test, expect} from '../test-utils/component';

for (const {title, color, fill, type} of [
    {title: 'useIconGradient returns solid color unchanged', color: '#ff0000', fill: '#ff0000', type: 'null'},
    {
        title: 'useIconGradient creates linear gradient definition',
        color: 'linear-gradient(to right, red, blue)',
        fill: 'url(#',
        type: 'linearGradient',
    },
    {
        title: 'useIconGradient creates radial gradient definition',
        color: 'radial-gradient(circle at center, red, blue)',
        fill: 'url(#',
        type: 'radialGradient',
    },
    {
        title: 'useIconGradient ignores invalid gradient string',
        color: 'gradient(foo)',
        fill: 'gradient(foo)',
        type: 'null',
    },
    {title: 'useIconGradient handles undefined inputs safely', color: undefined, fill: '', type: 'null'},
    {
        title: 'useIconGradient applies default values for missing radial positions',
        color: 'radial-gradient(red, blue)',
        fill: 'url(#',
        type: 'radialGradient',
    },
    {
        title: 'useIconGradient applies default angle for missing linear directions',
        color: 'linear-gradient(red, blue)',
        fill: 'url(#',
        type: 'linearGradient',
    },
    {
        title: 'useIconGradient applies explicit radius for radial gradients',
        color: 'radial-gradient(25% at center, red, blue)',
        fill: 'url(#',
        type: 'radialGradient',
    },
]) {
    test(title, async ({mount}) => {
        const component = await mount('icon-gradient/Gradient', {color});
        if (color === undefined) await expect(component.getByTestId('fill-value')).toBeEmpty();
        else await expect(component.getByTestId('fill-value')).toContainText(fill);
        await expect(component.getByTestId('gradient-type')).toContainText(type);
    });
}
