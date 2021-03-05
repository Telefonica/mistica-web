import {openStoryPage, screen} from '../test-utils';

test('Checkbox', async () => {
    await openStoryPage({
        section: 'Components/Forms/Checkbox',
        name: 'Checkbox',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    await (await screen.findAllByRole('checkbox'))[2].click();

    const imageChecked = await page.screenshot();
    expect(imageChecked).toMatchImageSnapshot();
});
