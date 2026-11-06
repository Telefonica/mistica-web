import {test, expect} from '../test-utils/component';

test('InfoRating is accessible', async ({mount}) => {
    const component = await mount('rating/Scenario1');
    await expect(component.getByRole('img', {name: '3 de 5'})).toHaveCount(1);
});
test('InfoRating is accessible with custom label', async ({mount}) => {
    const component = await mount('rating/Scenario2');
    await expect(component.getByRole('img', {name: 'info rating'})).toHaveCount(1);
});
test('InfoRating is accessible with aria-labelledby', async ({mount}) => {
    const component = await mount('rating/Scenario3');
    await expect(component.getByRole('img', {name: 'This is a label'})).toHaveCount(1);
});
test('Rating quantitative is accessible', async ({mount}) => {
    const component = await mount('rating/Scenario4');
    const rating = await component.getByRole('radiogroup', {name: 'rating'});
    const icons = rating.getByRole('radio');
    await expect(icons).toHaveCount(5);
    for (const icon of await icons.all()) await expect(icon).not.toBeChecked();
    const firstIcon = await rating.getByRole('radio', {name: '1 de 5'});
    await firstIcon.click();
    await expect(icons.nth(0)).toBeChecked();
    const thirdIcon = await rating.getByRole('radio', {name: '3 de 5'});
    await thirdIcon.click();
    await expect(icons.nth(0)).not.toBeChecked();
    await expect(icons.nth(2)).toBeChecked();
});
test('Rating qualitative is accessible', async ({mount}) => {
    const component = await mount('rating/Scenario5');
    const rating = await component.getByRole('radiogroup', {name: 'rating'});
    const icons = rating.getByRole('radio');
    await expect(icons).toHaveCount(5);
    for (const icon of await icons.all()) await expect(icon).not.toBeChecked();
    const firstIcon = await rating.getByRole('radio', {name: 'muy malo'});
    await firstIcon.click();
    await expect(icons.nth(0)).toBeChecked();
    const thirdIcon = await rating.getByRole('radio', {name: 'regular'});
    await thirdIcon.click();
    await expect(icons.nth(0)).not.toBeChecked();
    await expect(icons.nth(2)).toBeChecked();
});
test('Rating is accessible with aria-labelledby', async ({mount}) => {
    const component = await mount('rating/Scenario6');
    await expect(component.getByRole('radiogroup', {name: 'This is a label'})).toHaveCount(1);
});
test('Rating with uncontrolled value', async ({mount}) => {
    const component = await mount('rating/Scenario7');
    const secondIcon = await component.getByRole('radio', {name: '2 de 5'});
    await expect(secondIcon).toBeChecked();
    const thirdIcon = await component.getByRole('radio', {name: '3 de 5'});
    await thirdIcon.click();
    await expect(secondIcon).not.toBeChecked();
    await expect(thirdIcon).toBeChecked();
});
test('Rating with controlled value', async ({mount}) => {
    const component = await mount('rating/Scenario8');
    const secondIcon = await component.getByRole('radio', {name: '2 de 5'});
    await expect(secondIcon).toBeChecked();
    const thirdIcon = await component.getByRole('radio', {name: '3 de 5'});
    await thirdIcon.click();
    await expect(secondIcon).not.toBeChecked();
    await expect(thirdIcon).toBeChecked();
});
test('Rating quantitative with 3 icons and custom labels', async ({mount}) => {
    const component = await mount('rating/Scenario9');
    const rating = await component.getByRole('radiogroup', {name: 'rating'});
    const icons = rating.getByRole('radio');
    await expect(icons).toHaveCount(3);
    for (const icon of await icons.all()) await expect(icon).not.toBeChecked();
    const secondIcon = await component.getByRole('radio', {name: 'second'});
    await secondIcon.click();
    await expect(icons.nth(1)).toBeChecked();
    const thirdIcon = await component.getByRole('radio', {name: 'third'});
    await thirdIcon.click();
    await expect(icons.nth(1)).not.toBeChecked();
    await expect(icons.nth(2)).toBeChecked();
});
test('Rating qualitative with 2 icons and custom labels', async ({mount}) => {
    const component = await mount('rating/Scenario10');
    const rating = await component.getByRole('radiogroup', {name: 'rating'});
    const icons = rating.getByRole('radio');
    await expect(icons).toHaveCount(2);
    for (const icon of await icons.all()) await expect(icon).not.toBeChecked();
    const secondIcon = await component.getByRole('radio', {name: 'second'});
    await secondIcon.click();
    await expect(icons.nth(1)).toBeChecked();
    const firstIcon = await component.getByRole('radio', {name: 'first'});
    await firstIcon.click();
    await expect(icons.nth(1)).not.toBeChecked();
    await expect(icons.nth(0)).toBeChecked();
});
