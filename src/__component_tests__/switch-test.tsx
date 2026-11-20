import {test, expect} from '../test-utils/component';

test('renders accesible switch', async ({mount}) => {
    const component = await mount('switch/Toggle');
    await expect(component.getByRole('switch')).toHaveCount(1);
    await expect(component.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
});
test('controlled mode', async ({mount}) => {
    const component = await mount('switch/Toggle', {controlled: true});
    const toggle = component.getByRole('switch');
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
});
for (const handler of [false, true]) {
    test(`uncontrolled mode${handler ? ' with onChange handler' : ''}`, async ({mount}) => {
        const component = await mount('switch/Toggle', {defaultChecked: true, handler});
        const toggle = component.getByRole('switch');
        await expect(toggle).toHaveAttribute('aria-checked', 'true');
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-checked', 'false');
        if (handler) await expect(component.getByTestId('calls')).toHaveValue('[false]');
    });
}
for (const controlled of [false, true]) {
    test(`form ${controlled ? 'uncontrolled' : 'controlled'} mode`, async ({mount}) => {
        const component = await mount('switch/FormToggle', {controlled});
        const toggle = component.getByRole('switch');
        await expect(toggle).toHaveAttribute('aria-checked', String(!controlled));
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-checked', String(controlled));
        await expect(component.getByTestId('form-value')).toHaveValue(String(controlled));
        await component.getByRole('button', {name: 'done!'}).click();
        await expect(component.getByTestId('submission')).toHaveValue(
            JSON.stringify([{switch: controlled}, {switch: controlled}])
        );
    });
}
test('Switch onClick event is not propagated', async ({mount}) => {
    const component = await mount('switch/Propagation');
    await component.getByRole('switch').click();
    await expect(component.getByTestId('parent-calls')).toHaveValue('0');
});
