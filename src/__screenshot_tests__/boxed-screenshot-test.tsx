import {openStoryPage, screen} from '../test-utils';

test.each`
    overInverse | inverse
    ${false}    | ${false}
    ${false}    | ${true}
    ${true}     | ${false}
    ${true}     | ${true}
`('Boxed inverseOutside($overInverse) inverseInside($inverse)', async ({overInverse, inverse}) => {
    await openStoryPage({
        id: 'components-primitives-boxed--default',
        device: 'MOBILE_IOS',
        args: {
            overInverse,
            inverse,
        },
    });

    const image = await (await screen.findByTestId('boxed')).screenshot();
    expect(image).toMatchImageSnapshot();
});
