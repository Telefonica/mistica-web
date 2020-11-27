import {openStoryPage, screen} from '../test-utils';

test('Form With Fixed Footer Layout', async () => {
    await openStoryPage({
        section: 'Components/Forms/Form examples',
        name: 'Form With Fixed Footer Layout',
        device: 'MOBILE_IOS',
    });

    await screen.findByText('Form was submitted 0 times');

    await (await screen.findByRole('button')).click();

    await screen.findByText('Form was submitted 1 times');
});
