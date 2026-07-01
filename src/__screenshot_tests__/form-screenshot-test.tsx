import {openStoryPage, screen} from '../test-utils';

test('Form fields after submit validation', async () => {
    await openStoryPage({
        id: 'patterns-forms-form-with-automatic-state-management--default',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByText('Send')).click();

    const fieldWrapper = await screen.findByTestId('form-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('Form fields after submit validation on desktop', async () => {
    await openStoryPage({
        id: 'patterns-forms-form-with-automatic-state-management--default',
        device: 'DESKTOP',
    });

    await (await screen.findByText('Send')).click();

    const fieldWrapper = await screen.findByTestId('form-wrapper');
    const image = await fieldWrapper.screenshot();

    expect(image).toMatchImageSnapshot();
});
