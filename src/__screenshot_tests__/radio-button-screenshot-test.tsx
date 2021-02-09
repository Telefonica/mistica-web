import {openStoryPage, screen} from '../test-utils';

test.each([true, false])('RadioGroup disabled=%s', async (disabled) => {
    const {click} = await openStoryPage({
        section: 'Components/Forms/RadioButton',
        name: 'Radio Button',
    });

    if (disabled) {
        const checkboxes = await screen.findAllByText('Is disabled');
        await Promise.all(checkboxes.map((checkbox) => click(checkbox)));
    }

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
