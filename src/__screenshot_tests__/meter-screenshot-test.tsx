import {openStoryPage, screen} from '../test-utils';

test.each`
    values                 | type          | themeVariant | extraContent
    ${[0]}                 | ${'linear'}   | ${'default'} | ${''}
    ${[0]}                 | ${'circular'} | ${'default'} | ${''}
    ${[0]}                 | ${'angular'}  | ${'default'} | ${''}
    ${[100]}               | ${'linear'}   | ${'default'} | ${''}
    ${[100]}               | ${'circular'} | ${'default'} | ${''}
    ${[100]}               | ${'angular'}  | ${'default'} | ${''}
    ${[33, 33]}            | ${'linear'}   | ${'default'} | ${''}
    ${[33, 33]}            | ${'circular'} | ${'default'} | ${''}
    ${[33, 33]}            | ${'angular'}  | ${'default'} | ${''}
    ${[33, 33]}            | ${'linear'}   | ${'inverse'} | ${''}
    ${[33, 33]}            | ${'circular'} | ${'inverse'} | ${''}
    ${[33, 33]}            | ${'angular'}  | ${'inverse'} | ${''}
    ${[33, 33]}            | ${'linear'}   | ${'media'}   | ${''}
    ${[33, 33]}            | ${'circular'} | ${'media'}   | ${''}
    ${[33, 33]}            | ${'angular'}  | ${'media'}   | ${''}
    ${[20, 20, 20, 20, 0]} | ${'linear'}   | ${'default'} | ${''}
    ${[20, 20, 20, 20, 0]} | ${'circular'} | ${'default'} | ${''}
    ${[20, 20, 20, 20, 0]} | ${'angular'}  | ${'default'} | ${''}
    ${[33, 33]}            | ${'linear'}   | ${'default'} | ${'This is a small extra'}
    ${[33, 33]}            | ${'linear'}   | ${'default'} | ${'This is a super long extra This is a super long extra This is a super long extra This is a super long extra'}
    ${[33, 33]}            | ${'angular'}  | ${'default'} | ${'This is a small extra'}
    ${[33, 33]}            | ${'angular'}  | ${'default'} | ${'This is a super long extra This is a super long extra This is a super long extra This is a super long extra'}
    ${[33, 33]}            | ${'circular'} | ${'default'} | ${'This is a small extra'}
    ${[33, 33]}            | ${'circular'} | ${'default'} | ${'This is a super long extra This is a super long extra This is a super long extra This is a super long extra'}
`('Meter $themeVariant $type $values', async ({themeVariant, values, type, extraContent}) => {
    await openStoryPage({
        id: 'components-data-visualizations-meter--meter-story',
        args: {
            themeVariant,
            width: 200,
            type,
            valuesCount: values.length,
            ...values.reduce(
                (acc: Array<number>, value: number, index: number) => ({
                    ...acc,
                    [`value${index + 1}`]: value,
                }),
                {}
            ),
            extraContent,
        },
    });

    const stepper = await screen.findByTestId('Meter');
    const image = await stepper.screenshot();
    expect(image).toMatchImageSnapshot();
});
