import {openStoryPage, screen} from '../test-utils';

test('RadioGroup', async () => {
    await openStoryPage({
        section: 'Components/Forms/RadioButton',
        name: 'Radio Button',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('RadioGroup disabled', async () => {
    const {click} = await openStoryPage({
        section: 'Components/Forms/RadioButton',
        name: 'Radio Button',
    });

    const checkboxes = await screen.findAllByText('Is disabled');
    await Promise.all(checkboxes.map((checkbox) => click(checkbox)));

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
