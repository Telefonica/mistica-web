import {test, expect} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

test('Form with Fixed Footer Layout', async () => {
    await openStoryPage({
        id: 'patterns-forms-form-with-submit-button-in-fixed-footer--default',
        device: 'MOBILE_IOS',
    });

    await screen.findByText('Form was submitted 0 times');

    await (await screen.findByRole('button')).click();

    await screen.findByText('Form was submitted 1 times');
});

test('Form focuses first field with error after submit validation', async () => {
    await openStoryPage({
        id: 'patterns-forms-form-with-automatic-state-management--default',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByText('Send')).click();

    await expect(await screen.findByLabelText('phone')).toBeFocused();
});
