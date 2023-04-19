import {openStoryPage} from '../test-utils';

test.each`
    isInverse | isDarkMode | type           | size
    ${false}  | ${false}   | ${'imagotype'} | ${48}
    ${false}  | ${false}   | ${'vertical'}  | ${48}
    ${false}  | ${false}   | ${'isotype'}   | ${48}
    ${false}  | ${true}    | ${'imagotype'} | ${48}
    ${false}  | ${true}    | ${'vertical'}  | ${48}
    ${false}  | ${true}    | ${'isotype'}   | ${48}
    ${true}   | ${false}   | ${'imagotype'} | ${48}
    ${true}   | ${false}   | ${'vertical'}  | ${48}
    ${true}   | ${false}   | ${'isotype'}   | ${48}
    ${true}   | ${true}    | ${'imagotype'} | ${48}
    ${true}   | ${true}    | ${'vertical'}  | ${48}
    ${true}   | ${true}    | ${'isotype'}   | ${48}
`(
    'Logo. isInverse={$isInverse} isDarkMode={$isDarkMode} type={$type}',
    async ({isInverse, isDarkMode, type, size}) => {
        await openStoryPage({
            id: 'components-logo--default',
            device: 'DESKTOP',
            args: {isInverse, type, size},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

const SKINS = ['Movistar', 'O2', 'O2-classic', 'Vivo', 'Telefonica', 'Blau'] as const;

test.each(SKINS)('Logo with defaults and skin %s', async (skin) => {
    const page = await openStoryPage({
        id: 'components-logo--default',
        device: 'DESKTOP',
        skin: skin as (typeof SKINS)[number],
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
