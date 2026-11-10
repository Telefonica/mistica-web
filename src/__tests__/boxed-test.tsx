import {test, expect} from '../test-utils/component';

import type {Container} from './boxed.story';
import type {Locator} from '@playwright/test';

const getRadiusVars = (element: Locator) =>
    element.evaluate((node) =>
        [...(node.getAttribute('style') ?? '').matchAll(/--[\w-]+:\s*([^;]+);?/g)].map((match) => match[1])
    );

test('Boxed uses the skin container radius by default', async ({mount}) => {
    const component = await mount<typeof Container>('boxed/Container');
    await expect
        .poll(() => getRadiusVars(component.getByRole('region', {name: 'boxed'})))
        .toContainEqual(expect.stringMatching(/^var\(--borderRadii-container/));
});

test('Boxed converts numeric borderRadius to px', async ({mount}) => {
    const component = await mount<typeof Container>('boxed/Container', {borderRadius: 24});
    await expect.poll(() => getRadiusVars(component.getByRole('region', {name: 'boxed'}))).toContain('24px');
});

test('Boxed passes string borderRadius through', async ({mount}) => {
    const component = await mount<typeof Container>('boxed/Container', {borderRadius: 'calc(8px + 16px)'});
    await expect
        .poll(() => getRadiusVars(component.getByRole('region', {name: 'boxed'})))
        .toContain('calc(8px + 16px)');
});
