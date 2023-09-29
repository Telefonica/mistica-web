import {openStoryPage, screen} from '../test-utils';

test.each`
    component              | inverse  | singleOpen
    ${'Accordion'}         | ${false} | ${false}
    ${'Accordion'}         | ${false} | ${true}
    ${'Accordion'}         | ${true}  | ${false}
    ${'Accordion'}         | ${true}  | ${true}
    ${'Boxed accordion'}   | ${false} | ${false}
    ${'Boxed accordion'}   | ${false} | ${true}
    ${'Boxed accordion'}   | ${true}  | ${false}
    ${'Boxed accordion'}   | ${true}  | ${true}
    ${'Grouped accordion'} | ${false} | ${false}
    ${'Grouped accordion'} | ${false} | ${true}
    ${'Grouped accordion'} | ${true}  | ${false}
    ${'Grouped accordion'} | ${true}  | ${true}
`('$component. inverse($inverse) singleOpen($singleOpen)', async ({component, inverse, singleOpen}) => {
    await openStoryPage({
        id: `components-accordions--${component.toLowerCase().replace(' ', '-')}-story`,
        device: 'MOBILE_IOS',
        args: {
            inverse,
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
