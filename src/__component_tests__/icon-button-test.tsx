import {test, expect} from '../test-utils/component';

test('IconButton is accesible', async ({mount}) => {
    const component = await mount('icon-button/Accessible');
    await expect(component.getByRole('button', {name: 'icon-button'})).toHaveCount(1);
});
test('"to" uses a Link Component', async ({mount}) => {
    const component = await mount('icon-button/CustomLink');
    await expect(component).toHaveText('(Link Component)');
    await expect(component.getByRole('link')).toHaveCount(0);
});
test('<a> is rendered when using "to" prop', async ({mount}) => {
    const component = await mount('icon-button/Anchor');
    await expect(component.getByRole('link', {name: 'icon-button'})).toHaveAttribute('href', '/test');
});
test('IconButton can track events', async ({mount}) => {
    const component = await mount('icon-button/Tracking');
    const event = {category: 'someCategory', action: 'someAction', label: 'someLabel'};
    await component.getByRole('button', {name: 'icon-button'}).click();
    await expect(component.getByTestId('events')).toHaveValue(JSON.stringify([event]));
    await component.getByRole('button', {name: 'icon-button'}).click();
    await expect(component.getByTestId('events')).toHaveValue(JSON.stringify([event, event]));
});
test('IconButton ref', async ({mount}) => {
    const component = await mount('icon-button/Refs');
    await expect(component.getByTestId('refs')).toHaveValue('["BUTTON","A","A"]');
});
for (const controlled of [true, false]) {
    test(`ToggleIconButton is accesible (${controlled ? 'controlled' : 'uncontrolled'})`, async ({mount}) => {
        const component = await mount('icon-button/Toggle', {controlled});
        await expect(component.getByRole('button', {name: 'unchecked-icon-button', exact: true})).toHaveCount(
            1
        );
        await expect(component.getByRole('button', {name: 'checked-icon-button', exact: true})).toHaveCount(
            0
        );
        await component.getByRole('button', {name: 'unchecked-icon-button', exact: true}).click();
        await expect(component.getByRole('button', {name: 'unchecked-icon-button', exact: true})).toHaveCount(
            0
        );
        await expect(component.getByRole('button', {name: 'checked-icon-button', exact: true})).toHaveCount(
            1
        );
        if (!controlled) await expect(component.getByTestId('calls')).toHaveValue('1');
    });
}
test("ToggleIconButton doesn't update its state until onChange promise is resolved", async ({
    mount,
    page,
}) => {
    const now = new Date('2026-01-01T00:00:00Z');
    await page.clock.install({time: now});
    await page.clock.pauseAt(now);
    const component = await mount('icon-button/Toggle', {delay: 1000});
    await component.getByRole('button', {name: 'unchecked-icon-button', exact: true}).click();
    await page.clock.runFor(500);
    await expect(component.getByRole('button', {name: 'unchecked-icon-button', exact: true})).toHaveCount(1);
    await page.clock.runFor(500);
    await expect(component.getByRole('button', {name: 'checked-icon-button', exact: true})).toHaveCount(1);
});
