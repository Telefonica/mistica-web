import {openStoryPage, screen} from '../test-utils';

test.each`
    inverseOutside | inverseInside
    ${false}       | ${false}
    ${false}       | ${true}
    ${true}        | ${false}
    ${true}        | ${true}
`(
    'Boxed inverseOutside($inverseOutside) inverseInside($inverseInside)',
    async ({inverseOutside, inverseInside}) => {
        await openStoryPage({
            section: 'Components/Layouts/Boxed',
            name: 'Boxed',
            device: 'MOBILE_IOS',
        });

        if (inverseOutside) {
            await (await screen.findByText('Inverse outside')).click();
        }

        if (inverseInside) {
            await (await screen.findByText('Inverse inside')).click();
        }

        const image = await (await screen.findByTestId('boxed')).screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
