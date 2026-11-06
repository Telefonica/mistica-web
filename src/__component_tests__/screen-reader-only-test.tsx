import {test, expect} from '../test-utils/component';

for (const [story, title, tag] of [
    ['SingleChild', 'Renders no wrapper if it has one single child', 'SPAN'],
    ['MultipleChildren', 'Renders a wrapper if it has several children', 'DIV'],
]) {
    test(title, async ({mount}) => {
        const component = await mount(`screen-reader-only/${story}`);
        await expect(component.getByTestId('test')).toHaveJSProperty('nodeName', tag);
    });
}
