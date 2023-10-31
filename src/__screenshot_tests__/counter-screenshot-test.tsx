import {openStoryPage, screen} from '../test-utils';

const SKINS = ['Movistar', 'O2', 'Vivo', 'Vivo-new', 'Telefonica', 'Blau'] as const;
const INVERSE_VALUES = [false, true];
const DARK_MODE_VALUES = [false, true];

const getCases = () => {
    const cases = [];
    for (const skin of SKINS) {
        for (const isInverse of INVERSE_VALUES) {
            for (const isDarkMode of DARK_MODE_VALUES) {
                cases.push([skin, isInverse, isDarkMode]);
            }
        }
    }

    return cases;
};

test.each(getCases())(
    'Counter default. skin={%s} isInverse={%s} isDarkMode={%s}',
    async (skin, isInverse, isDarkMode) => {
        await openStoryPage({
            id: 'components-counter--default',
            device: 'DESKTOP',
            args: {inverse: isInverse, defaultValue: 1},
            isDarkMode: isDarkMode as boolean,
            skin: skin as (typeof SKINS)[number],
        });

        const counter = await screen.findByTestId('counter');

        const image = await counter.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    min  | max   | defaultValue | removable | disabled
    ${1} | ${1}  | ${1}         | ${false}  | ${false}
    ${0} | ${4}  | ${0}         | ${false}  | ${false}
    ${0} | ${4}  | ${4}         | ${false}  | ${false}
    ${3} | ${4}  | ${3}         | ${false}  | ${false}
    ${0} | ${20} | ${10}        | ${false}  | ${false}
    ${1} | ${1}  | ${1}         | ${true}   | ${false}
    ${0} | ${4}  | ${0}         | ${true}   | ${false}
    ${0} | ${4}  | ${4}         | ${true}   | ${false}
    ${3} | ${4}  | ${3}         | ${true}   | ${false}
    ${0} | ${20} | ${10}        | ${true}   | ${false}
    ${1} | ${1}  | ${1}         | ${false}  | ${true}
    ${0} | ${4}  | ${0}         | ${false}  | ${true}
    ${0} | ${4}  | ${4}         | ${false}  | ${true}
    ${3} | ${4}  | ${3}         | ${false}  | ${true}
    ${0} | ${20} | ${10}        | ${false}  | ${true}
    ${1} | ${1}  | ${1}         | ${true}   | ${true}
    ${0} | ${4}  | ${0}         | ${true}   | ${true}
    ${0} | ${4}  | ${4}         | ${true}   | ${true}
    ${3} | ${4}  | ${3}         | ${true}   | ${true}
    ${0} | ${20} | ${10}        | ${true}   | ${true}
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
