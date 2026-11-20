import {test, expect} from '../test-utils/component';

test.beforeEach(async ({page}) => {
    await page.clock.install({time: new Date('2026-01-01T00:00:00Z')});
    await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));
});
test('debounce without leading and with trailing', async ({mount, page}) => {
    const component = await mount('helpers/Debounced');
    await component.getByRole('button', {name: '1', exact: true}).click();
    await page.clock.runFor(4500);
    await component.getByRole('button', {name: '2', exact: true}).click();
    await page.clock.runFor(4500);
    await component.getByRole('button', {name: '3', exact: true}).click();
    await expect(component.getByTestId('calls')).toHaveValue('[]');
    await page.clock.runFor(5000);
    await expect(component.getByTestId('calls')).toHaveValue('[[3]]');
});
for (const trailing of [true, false]) {
    test(`debounce with leading and ${trailing ? 'trailing' : 'without trailing'}`, async ({mount, page}) => {
        const component = await mount('helpers/Debounced', {leading: true, trailing});
        await component.getByRole('button', {name: '1', exact: true}).click();
        await expect(component.getByTestId('calls')).toHaveValue('[[1]]');
        await component.getByRole('button', {name: '2', exact: true}).click();
        await component.getByRole('button', {name: '3', exact: true}).click();
        await expect(component.getByTestId('calls')).toHaveValue('[[1]]');
        await page.clock.runFor(5000);
        await expect(component.getByTestId('calls')).toHaveValue(trailing ? '[[1],[3]]' : '[[1]]');
    });
}
test('debounce with maxWait', async ({mount, page}) => {
    const component = await mount('helpers/Debounced', {wait: 2500, maxWait: 3000});
    await component.getByRole('button', {name: '1', exact: true}).click();
    await page.clock.runFor(2000);
    await component.getByRole('button', {name: '2', exact: true}).click();
    await component.getByRole('button', {name: '3', exact: true}).click();
    await page.clock.runFor(2000);
    await expect(component.getByTestId('calls')).toHaveValue('[[3]]');
    await component.getByRole('button', {name: '4', exact: true}).click();
    await page.clock.runFor(5000);
    await expect(component.getByTestId('calls')).toHaveValue('[[3],[4]]');
});
test("debounce with leading and maxWait don't gets called twice", async ({mount, page}) => {
    const component = await mount('helpers/Debounced', {wait: 2500, maxWait: 1000, leading: true});
    await component.getByRole('button', {name: '1', exact: true}).click();
    await page.clock.runFor(5000);
    await expect(component.getByTestId('calls')).toHaveValue('[[1]]');
});
test('debounce calls the function when maxWait expires', async ({mount, page}) => {
    const component = await mount('helpers/Debounced', {wait: 1000, maxWait: 2000});
    for (const value of [1, 2, 3, 4]) {
        await component.getByRole('button', {name: String(value), exact: true}).click();
        await page.clock.runFor(500);
    }
    await expect(component.getByTestId('calls')).toHaveValue('[[4]]');
    await page.clock.runFor(5000);
    await expect(component.getByTestId('calls')).toHaveValue('[[4]]');
});
for (const action of ['cancel', 'flush']) {
    test(`debounce ${action}`, async ({mount, page}) => {
        const component = await mount('helpers/Debounced');
        for (const value of [1, 2, 3])
            await component.getByRole('button', {name: String(value), exact: true}).click();
        await component.getByRole('button', {name: action}).click();
        await page.clock.runFor(5000);
        await expect(component.getByTestId('calls')).toHaveValue(action === 'flush' ? '[[3]]' : '[]');
    });
}
