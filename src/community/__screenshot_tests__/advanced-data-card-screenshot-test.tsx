import {test, expectScreenshot} from '../../test-utils/playwright';
import {openStoryPage, screen} from '../../test-utils';

for (const testCase of [
    {actions: 'none', footerImage: false},
    {actions: 'button', footerImage: false},
    {actions: 'link', footerImage: false},
    {actions: 'button and link', footerImage: false},
    {actions: 'none', footerImage: true},
    {actions: 'button', footerImage: true},
    {actions: 'link', footerImage: true},
    {actions: 'button and link', footerImage: true},
] as const) {
    const {actions, footerImage} = testCase;
    test(`Advanced Data Card actions: ${testCase.actions} - footerImage: ${testCase.footerImage}`, async () => {
        await openStoryPage({
            id: 'community-vivo-advanceddatacard--default',
            device: 'MOBILE_IOS',
            args: {actions, footerImage},
        });

        const element = await screen.findByTestId('advanced-data-card');
        await expectScreenshot(element);
    });
}

for (const testCase of [{slot: 0}, {slot: 1}, {slot: 3}] as const) {
    const {slot} = testCase;
    test(`Advanced Data Card slots: ${testCase.slot}`, async () => {
        await openStoryPage({
            id: 'community-vivo-advanceddatacard--default',
            device: 'MOBILE_IOS',
            args: {slot},
        });

        const element = await screen.findByTestId('advanced-data-card');
        await expectScreenshot(element);
    });
}

test('Advanced Data Card slots: 3 no divider', async () => {
    await openStoryPage({
        id: 'community-vivo-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {slot: 3, noSlotDivider: true},
    });

    const element = await screen.findByTestId('advanced-data-card');
    await expectScreenshot(element);
});

test('Advanced Data Card inside Carousel', async () => {
    await openStoryPage({
        id: 'community-vivo-advanceddatacards-in-carousel--default',
        device: 'DESKTOP',
    });

    const element = await screen.findByTestId('advanced-data-card-carousel');
    await expectScreenshot(element);
});

test('Advanced Data Card without stackingGroup, with top actions and too long title', async () => {
    const page = await openStoryPage({
        id: 'community-vivo-advanceddatacard--default',
        device: 'MOBILE_IOS',
        args: {
            stackingGroup: false,
            headline: '',
            pretitle: '',
            title: 'Too long title too long title too long titltoo long title too long title',
        },
    });

    await expectScreenshot(page, {...{fullPage: true}});
});
