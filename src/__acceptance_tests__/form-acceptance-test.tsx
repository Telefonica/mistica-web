import {openStoryPage, screen} from '../test-utils';

test('Form with Fixed Footer Layout', async () => {
    await openStoryPage({
        id: 'components-forms-example-fixed-footer--fixed-footer-form',
        device: 'MOBILE_IOS',
    });

    await screen.findByText('Form was submitted 0 times');

    await (await screen.findByRole('button')).click();

    await screen.findByText('Form was submitted 1 times');
});

test('Form focuses first field with error after submit validation', async () => {
    await openStoryPage({
        id: 'components-forms-example-automatic--automatic-form',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByText('Send')).click();

    const focusedElementHandle = await page.$(':focus');
    const namePropertyHandle = await focusedElementHandle?.getProperty('name');
    const name = await namePropertyHandle?.jsonValue();

    expect(name).toBe('phone');
});
