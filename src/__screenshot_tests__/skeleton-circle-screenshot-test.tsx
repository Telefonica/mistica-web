import {openStoryPage, screen} from '../test-utils';

test.each`
    givenInverse | givenSize
    ${false}     | ${undefined}
    ${false}     | ${60}
    ${false}     | ${100}
    ${true}      | ${undefined}
    ${true}      | ${100}
`(`Given inverse $givenInverse and size of $givenSize`, async ({givenInverse, givenSize}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-circle',
        device: 'MOBILE_IOS',
        args: {inverse: givenInverse, size: givenSize, disableAnimation: true},
    });

    const element = await screen.findByTestId('skeleton-circle');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
