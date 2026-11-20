import {test, expect} from '../test-utils/component';

test('renders accesible checkbox', async ({mount}) => {
    const component = await mount('checkbox/Toggle');
    await expect(component.getByRole('checkbox')).toHaveCount(1);
    await expect(component.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
});
test('controlled mode', async ({mount}) => {
    const component = await mount('checkbox/Toggle', {controlled: true});
    const toggle = component.getByRole('checkbox');
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
});
for (const handler of [false, true]) {
    test(`uncontrolled mode${handler ? ' with onChange handler' : ''}`, async ({mount}) => {
        const component = await mount('checkbox/Toggle', {defaultChecked: true, handler});
        const toggle = component.getByRole('checkbox');
        await expect(toggle).toHaveAttribute('aria-checked', 'true');
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-checked', 'false');
        if (handler) await expect(component.getByTestId('calls')).toHaveValue('[false]');
    });
}
for (const controlled of [false, true]) {
    test(`form ${controlled ? 'uncontrolled' : 'controlled'} mode`, async ({mount}) => {
        const component = await mount('checkbox/FormToggle', {controlled});
        const toggle = component.getByRole('checkbox');
        await expect(toggle).toHaveAttribute('aria-checked', String(!controlled));
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-checked', String(controlled));
        await component.getByRole('button', {name: 'done!'}).click();
        await expect(component.getByTestId('submission')).toHaveValue(
            JSON.stringify([{checkbox: controlled}, {checkbox: controlled}])
        );
    });
}
test('Checkbox onClick event is not propagated', async ({mount}) => {
    const component = await mount('checkbox/Propagation');
    await component.getByRole('checkbox').click();
    await expect(component.getByTestId('parent-calls')).toHaveValue('0');
});
test("with link. Clicking the link doesn't check the checkbox", async ({mount}) => {
    const component = await mount('checkbox/WithLink');
    const checkbox = component.getByRole('checkbox');
    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
    await component.getByRole('link').click();
    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
});
