import {openStoryPage, screen} from '../test-utils';

test.each`
    givenInverse | givenHeight
    ${false}     | ${24}
    ${true}      | ${200}
    ${false}     | ${150}
`(`Given inverse $givenInverse and height of $givenHeight`, async ({givenInverse, givenHeight}) => {
    await openStoryPage({
        id: 'components-skeletons-skeleton-media',
        device: 'MOBILE_IOS',
        args: {inverse: givenInverse, height: givenHeight, disableAnimation: true},
    });

    const element = await screen.findByTestId('skeleton-media');
    expect(await element.screenshot()).toMatchImageSnapshot();
});
