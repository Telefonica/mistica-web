import {openStoryPage, screen} from '../test-utils';

test.each`
    overInverse | singleOpen
    ${false}    | ${false}
    ${false}    | ${true}
    ${true}     | ${false}
    ${true}     | ${true}
`('Accordion. overInverse($overInverse) singleOpen($singleOpen)', async ({overInverse, singleOpen}) => {
    await openStoryPage({
        id: 'components-accordions--accordion-story',
        device: 'MOBILE_IOS',
        args: {
            overInverse,
            singleOpen,
        },
    });

    const accordion = await screen.findByTestId('accordion');

    expect(await accordion.screenshot()).toMatchImageSnapshot();

    await (await screen.findByTestId('accordion-item-1')).click();
    await (await screen.findByTestId('accordion-item-1')).click();
    await (await screen.findByTestId('accordion-item-2')).click();
    await (await screen.findByTestId('accordion-item-4')).click();
    await (await screen.findByTestId('accordion-item-6')).click();

    expect(await accordion.screenshot()).toMatchImageSnapshot();
});

test.each`
    inverse  | overInverse | singleOpen
    ${false} | ${false}    | ${false}
    ${false} | ${false}    | ${true}
    ${false} | ${true}     | ${false}
    ${false} | ${true}     | ${true}
    ${true}  | ${false}    | ${false}
    ${true}  | ${false}    | ${true}
    ${true}  | ${true}     | ${false}
    ${true}  | ${true}     | ${true}
`(
    'BoxedAccordion. inverse($inverse) overInverse($overInverse) singleOpen($singleOpen)',
    async ({inverse, overInverse, singleOpen}) => {
        await openStoryPage({
            id: 'components-accordions--boxed-accordion-story',
            device: 'MOBILE_IOS',
            args: {
                inverse,
                overInverse,
                singleOpen,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        expect(await accordion.screenshot()).toMatchImageSnapshot();

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        expect(await accordion.screenshot()).toMatchImageSnapshot();
    }
);

test.each`
    detail      | right    | overInverse
    ${''}       | ${false} | ${false}
    ${''}       | ${true}  | ${false}
    ${'Detail'} | ${false} | ${false}
    ${'Detail'} | ${true}  | ${false}
    ${'Detail'} | ${true}  | ${true}
`(
    'Accordion. detail($detail) right($right) overInverse($overInverse)',
    async ({detail, right, overInverse}) => {
        await openStoryPage({
            id: 'components-accordions--accordion-story',
            device: 'MOBILE_IOS',
            args: {
                detail,
                right,
                overInverse,
            },
        });

        const accordion = await screen.findByTestId('accordion');

        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-1')).click();
        await (await screen.findByTestId('accordion-item-2')).click();
        await (await screen.findByTestId('accordion-item-4')).click();
        await (await screen.findByTestId('accordion-item-6')).click();

        expect(await accordion.screenshot()).toMatchImageSnapshot();
    }
);

test.each`
    detail      | right
    ${''}       | ${false}
    ${''}       | ${true}
    ${'Detail'} | ${false}
    ${'Detail'} | ${true}
`('BoxedAccordion. detail($detail) right($right)', async ({detail, right}) => {
    await openStoryPage({
        id: 'components-accordions--boxed-accordion-story',
        device: 'MOBILE_IOS',
        args: {
            detail,
            right,
        },
    });

    const accordion = await screen.findByTestId('accordion');

    await (await screen.findByTestId('accordion-item-1')).click();
    await (await screen.findByTestId('accordion-item-1')).click();
    await (await screen.findByTestId('accordion-item-2')).click();
    await (await screen.findByTestId('accordion-item-4')).click();
    await (await screen.findByTestId('accordion-item-6')).click();

    expect(await accordion.screenshot()).toMatchImageSnapshot();
});
