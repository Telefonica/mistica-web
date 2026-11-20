import {test, expect} from '../test-utils/component';

import type {Locator} from '@playwright/test';

const expectPanels = async (component: Locator, open: Array<number>) => {
    for (const index of [1, 2, 3]) {
        await expect(component.getByText(`Content ${index}`, {exact: true})).toHaveCount(
            open.includes(index) ? 1 : 0
        );
    }
};
test('Accordion', async ({mount}) => {
    const component = await mount('accordion/Panels');
    await expectPanels(component, []);
    await component.getByText('Title 1').click();
    await component.getByText('Title 3').click();
    await expectPanels(component, [1, 3]);
});
test('Accordion with index', async ({mount}) => {
    const component = await mount('accordion/Panels', {mode: 'controlled'});
    await expectPanels(component, [1, 3]);
    for (const index of [1, 2, 3]) await component.getByText(`Title ${index}`).click();
    await expectPanels(component, [2]);
});
test('Accordion with default index', async ({mount}) => {
    const component = await mount('accordion/Panels', {mode: 'default'});
    await expectPanels(component, [1, 3]);
    await component.getByText('Title 1').click();
    await component.getByText('Title 2').click();
    await expectPanels(component, [2, 3]);
});
test('Accordion with singleOpen', async ({mount}) => {
    const component = await mount('accordion/Panels', {mode: 'single'});
    await expectPanels(component, []);
    for (const index of [1, 2, 3]) await component.getByText(`Title ${index}`).click();
    await expectPanels(component, [3]);
});
test('Accordion button exposes header text in the expected order', async ({mount}) => {
    const component = await mount('accordion/HeaderOrder');
    await expect(component.getByRole('button', {name: 'Title Subtitle Detail Right content'})).toHaveCount(1);
});
test('Accordion with custom labels is accessible', async ({mount}) => {
    const component = await mount('accordion/CustomLabels');
    await expect(component.getByLabel('Custom label 1')).toHaveCount(1);
    await expect(component.getByLabel('Custom label 2')).toHaveCount(1);
});
