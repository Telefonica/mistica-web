import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

for (const [caseIndex, testCase] of (
    [
        {values: [0], type: 'linear', themeVariant: 'default', extraContent: ''},
        {values: [0], type: 'circular', themeVariant: 'default', extraContent: ''},
        {values: [0], type: 'angular', themeVariant: 'default', extraContent: ''},
        {values: [100], type: 'linear', themeVariant: 'default', extraContent: ''},
        {values: [100], type: 'circular', themeVariant: 'default', extraContent: ''},
        {values: [100], type: 'angular', themeVariant: 'default', extraContent: ''},
        {values: [33, 33], type: 'linear', themeVariant: 'default', extraContent: ''},
        {values: [33, 33], type: 'circular', themeVariant: 'default', extraContent: ''},
        {values: [33, 33], type: 'angular', themeVariant: 'default', extraContent: ''},
        {values: [33, 33], type: 'linear', themeVariant: 'inverse', extraContent: ''},
        {values: [33, 33], type: 'circular', themeVariant: 'inverse', extraContent: ''},
        {values: [33, 33], type: 'angular', themeVariant: 'inverse', extraContent: ''},
        {values: [33, 33], type: 'linear', themeVariant: 'media', extraContent: ''},
        {values: [33, 33], type: 'circular', themeVariant: 'media', extraContent: ''},
        {values: [33, 33], type: 'angular', themeVariant: 'media', extraContent: ''},
        {values: [20, 20, 20, 20, 0], type: 'linear', themeVariant: 'default', extraContent: ''},
        {values: [20, 20, 20, 20, 0], type: 'circular', themeVariant: 'default', extraContent: ''},
        {values: [20, 20, 20, 20, 0], type: 'angular', themeVariant: 'default', extraContent: ''},
        {values: [33, 33], type: 'linear', themeVariant: 'default', extraContent: 'This is a small slot'},
        {
            values: [33, 33],
            type: 'linear',
            themeVariant: 'default',
            extraContent:
                'This is a super long slot This is a super long slot This is a super long slot This is a super long slot',
        },
        {values: [33, 33], type: 'angular', themeVariant: 'default', extraContent: 'This is a small slot'},
        {
            values: [33, 33],
            type: 'angular',
            themeVariant: 'default',
            extraContent:
                'This is a super long slot This is a super long slot This is a super long slot This is a super long slot',
        },
        {values: [33, 33], type: 'circular', themeVariant: 'default', extraContent: 'This is a small slot'},
        {
            values: [33, 33],
            type: 'circular',
            themeVariant: 'default',
            extraContent:
                'This is a super long slot This is a super long slot This is a super long slot This is a super long slot',
        },
    ] as const
).entries()) {
    const {themeVariant, values, type, extraContent} = testCase;
    test(`Meter ${testCase.themeVariant} ${testCase.type} ${testCase.values} (case ${caseIndex + 1})`, async () => {
        await openStoryPage({
            id: 'components-data-visualizations-meter--meter-story',
            args: {
                variantOutside: normalizeVariant(themeVariant),
                width: 200,
                type,
                valuesCount: values.length,
                ...values.reduce(
                    (acc: Record<string, number>, value: number, index: number) => ({
                        ...acc,
                        [`value${index + 1}`]: value,
                    }),
                    {}
                ),
                extraContent,
            },
        });

        const stepper = await screen.findByTestId('Meter');
        await expectScreenshot(stepper);
    });
}
