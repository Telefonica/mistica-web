import {test, expect} from '../test-utils/component';

test('Breadcrumbs onNavigate is called when pressing a link', async ({mount}) => {
    const component = await mount('navigation-breadcrumbs/Navigation');
    await component.getByRole('link', {name: 'breadcrumb 1'}).click();
    await expect(component.getByTestId('navigation-calls')).toHaveValue(JSON.stringify(['breadcrumb 1']));
    await component.getByRole('link', {name: 'breadcrumb 2'}).click();
    await expect(component.getByTestId('navigation-calls')).toHaveValue(
        JSON.stringify(['breadcrumb 1', 'breadcrumb 2'])
    );
});
