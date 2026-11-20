import {test, expect} from '../test-utils/component';

test('overscroll does not cause a remount of its children', async ({mount, page}) => {
    await page.setViewportSize({width: 640, height: 480});
    const component = await mount('overscroll-color-context/ChildrenMounts');
    await expect(component.getByTestId('mounts')).toHaveValue('1');
});
