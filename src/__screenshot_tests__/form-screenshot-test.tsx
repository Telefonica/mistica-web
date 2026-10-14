import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

test.each(['DESKTOP', 'MOBILE_IOS'] as Array<Device>)(
    'form fields with required errors after submit validation on %s',
    async (device) => {
        await openStoryPage({
            id: 'patterns-forms-form-with-automatic-state-management--default',
            device,
        });

        await (await screen.findByText('Send')).click();

        const fieldWrapper = await screen.findByTestId('form-wrapper');
        const image = await fieldWrapper.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);
