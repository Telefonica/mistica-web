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
            id: 'components-primitives-boxed--default',
            device: 'MOBILE_IOS',
            args: {
                inverseInside,
                inverseOutside,
            },
        });

        const image = await (await screen.findByTestId('boxed')).screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
