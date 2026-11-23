import {openStoryPage, screen} from '../test-utils';

describe.each([{colorScheme: 'light'}, {colorScheme: 'dark'}])(
    'Date fields in $colorScheme mode',
    ({colorScheme}) => {
        test.each([
            {
                componentName: 'DateField',
                storyId: 'components-input-fields-datefield--uncontrolled',
                typedDate: '06' + '10' + '1980',
            },
            {
                componentName: 'DateTimeField',
                storyId: 'components-input-fields-datetimefield--uncontrolled',
                typedDate: '06' + '10' + '1980' + '13' + '14',
            },
        ])('$componentName', async ({storyId, typedDate}) => {
            const page = await openStoryPage({
                id: storyId,
                isDarkMode: colorScheme === 'dark',
                args: {defaultValue: ''},
            });

            const field = await screen.findByLabelText('Label');
            await field.focus();
            await field.type(typedDate);
            await page.click(field);

            const image = await page.screenshot();

            expect(image).toMatchImageSnapshot();
        });
    }
);
