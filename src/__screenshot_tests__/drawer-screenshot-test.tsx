import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

test.each`
    device          | withActions | dismissible | contentLength
    ${'MOBILE_IOS'} | ${true}     | ${true}     | ${1}
    ${'MOBILE_IOS'} | ${true}     | ${true}     | ${5}
    ${'MOBILE_IOS'} | ${true}     | ${false}    | ${1}
    ${'DESKTOP'}    | ${true}     | ${true}     | ${1}
    ${'TABLET'}     | ${true}     | ${true}     | ${1}
    ${'MOBILE_IOS'} | ${false}    | ${true}     | ${1}
    ${'DESKTOP'}    | ${false}    | ${true}     | ${1}
    ${'TABLET'}     | ${false}    | ${true}     | ${1}
`(
    'Drawer $device actions:$withActions dismissible:$dismissible contentLength:$contentLength',
    async ({device, withActions, dismissible, contentLength}) => {
        const page = await openStoryPage({
            id: 'components-modals-drawer--default',
            device: device as Device,
            args: {
                showButton: withActions,
                showSecondaryButton: withActions,
                showButtonLink: withActions,
                onDismissHandler: dismissible,
                contentLength,
            },
        });

        const button = await screen.findByRole('button', {name: 'Open Drawer'});
        await button.click();

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
