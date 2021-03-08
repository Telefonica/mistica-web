import {openStoryPage, screen} from '../test-utils';

test('Checkbox', async () => {
    await openStoryPage({
        section: 'Components/Forms/Checkbox',
        name: 'Checkbox',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    const checkboxes = await screen.findAllByRole('checkbox');

    await checkboxes[0].click();
    await checkboxes[1].click();
    await checkboxes[2].click();

    const imageChecked = await page.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});
