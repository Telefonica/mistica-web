import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Vivo', 'Vivo-new', 'Telefonica', 'Blau'] as const;

test.each(SKINS)('Counter default. skin={%s}', async (skin) => {
    await openStoryPage({
        id: 'components-counter--default',
        device: 'DESKTOP',
        args: {defaultValue: 1},
        skin: skin as (typeof SKINS)[number],
    });

    const counter = await screen.findByTestId('counter');

    const image = await counter.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Counter. isInverse', async () => {
    await openStoryPage({
        id: 'components-counter--default',
        device: 'DESKTOP',
        args: {isInverse: true, defaultValue: 1},
    });

    const counter = await screen.findByTestId('counter');

    const image = await counter.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Counter. isDarkMode', async () => {
    await openStoryPage({
        id: 'components-counter--default',
        device: 'DESKTOP',
        args: {defaultValue: 1},
        isDarkMode: true,
    });

    const counter = await screen.findByTestId('counter');

    const image = await counter.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    min  | max   | defaultValue | removable | disabled
    ${1} | ${1}  | ${1}         | ${false}  | ${false}
    ${0} | ${4}  | ${0}         | ${false}  | ${false}
    ${0} | ${4}  | ${4}         | ${false}  | ${false}
    ${3} | ${4}  | ${3}         | ${false}  | ${false}
    ${0} | ${20} | ${10}        | ${false}  | ${false}
    ${1} | ${1}  | ${1}         | ${true}   | ${false}
    ${0} | ${4}  | ${0}         | ${true}   | ${false}
    ${0} | ${20} | ${10}        | ${true}   | ${false}
    ${1} | ${1}  | ${1}         | ${false}  | ${true}
    ${0} | ${4}  | ${0}         | ${false}  | ${true}
    ${0} | ${4}  | ${4}         | ${false}  | ${true}
    ${3} | ${4}  | ${3}         | ${false}  | ${true}
    ${0} | ${20} | ${10}        | ${false}  | ${true}
    ${3} | ${4}  | ${3}         | ${true}   | ${true}
`(
    'Counter. min=$min max=$max defaultValue=$defaultValue removable=$removable disabled=$disabled',
    async ({min, max, defaultValue, removable, disabled}) => {
        await openStoryPage({
            id: 'components-counter--default',
            device: 'DESKTOP',
            args: {min, max, defaultValue, removable, disabled},
            skin: 'Vivo-new',
        });

        const counter = await screen.findByTestId('counter');

        const image = await counter.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
