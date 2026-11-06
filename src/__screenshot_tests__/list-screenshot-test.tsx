import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];
const controls = [
    'chevron',
    'checkbox',
    'checkbox and onPress',
    'checkbox with custom element',
    'switch',
    'switch and onPress',
    'radio',
    'radio and onPress',
    'iconButton',
    'iconButton and onPress',
    'custom element',
    'custom element with text',
];

const controlsWithOnPress = ['checkbox', 'switch', 'radio'];
const controlsWithIconButton = ['iconButton', 'iconButton and onPress', 'toggleIconButton'];

const getCases = () => {
    const cases = [];
    for (const device of devices) {
        for (const control of controls) {
            const slot = false;
            const badge = true;
            cases.push([device, control, slot, badge]);
        }
        for (const slot of [true, false]) {
            const badge = false;
            cases.push([device, 'none', slot, badge]);
        }
    }
    return cases;
};

for (const testCase of getCases()) {
    const [device, control, slot, badge] = testCase;
    test(`Row list - ${testCase[0]} ${testCase[1]} slot ${testCase[2]} badge ${testCase[3]}`, async () => {
        await openStoryPage({
            id: 'components-lists--row-list-story',
            device: device as Device,
            args: {
                control,
                slot,
                badge,
                headline: 'Headline',
                detail: 'Detail',
                subtitle: 'Subtitle',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

for (const testCase of getCases()) {
    const [device, control, slot, badge] = testCase;
    test(`Boxed row list - ${testCase[0]} ${testCase[1]} slot ${testCase[2]} badge ${testCase[3]}`, async () => {
        await openStoryPage({
            id: 'components-lists--boxed-row-list-story',
            device: device as Device,
            args: {
                control,
                slot,
                badge,
                headline: 'Headline',
                detail: 'Detail',
                subtitle: 'Subtitle',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

for (const testCase of controls) {
    const control = testCase;
    test(`Row list disabled - ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-lists--row-list-story',
            device: 'MOBILE_IOS',
            args: {
                control,
                headline: 'Headline',
                badge: true,
                disabled: true,
                detail: 'Detail',
                subtitle: 'Subtitle',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

for (const testCase of controls) {
    const control = testCase;
    test(`Boxed row list disabled - ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-lists--boxed-row-list-story',
            device: 'MOBILE_IOS',
            args: {
                control,
                headline: 'Headline',
                badge: true,
                disabled: true,
                detail: 'Detail',
                subtitle: 'Subtitle',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

test('Rows with only a Title content are centered', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            title: 'Title',
            subtitle: 'Subtitle',
            headline: '',
            description: '',
            control: 'chevron',
            detail: 'Detail',
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

for (const testCase of devices) {
    const device = testCase;
    test(`Custom row with text centered (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--boxed-row-list-story',
            device,
            args: {
                control: 'custom element with text',
                title: 'Title',
                subtitle: 'Subtitle',
                headline: '',
                description: '',
                detail: 'Detail',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

for (const testCase of controlsWithOnPress) {
    const control = testCase;
    test(`Click control with onPress - ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-lists--row-list-story',
            device: 'MOBILE_IOS',
            args: {
                control: control + ' and onPress',
            },
        });

        const elements = await screen.findAllByRole(control);
        await elements[0].click();

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

test('Selectable custom boxed row', async () => {
    await openStoryPage({
        id: 'components-lists--selectable-boxed-rows-story',
        device: 'MOBILE_IOS',
    });

    const list = await screen.findByTestId('selectable-boxed-row-list');
    await expectScreenshot(list);

    const buttons = await screen.findAllByRole('button', {name: /^(Select|Unselect) row$/});
    await buttons[0].click();
    await buttons[1].click();

    await expectScreenshot(list);
});

for (const testCase of controlsWithIconButton) {
    const control = testCase;
    test(`Rows with ${testCase} using big fontSize`, async () => {
        await openStoryPage({
            id: 'components-lists--boxed-row-list-story',
            device: 'DESKTOP',
            args: {control},
        });

        await setRootFontSize(32);

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

test('Rows over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            variantOutside: 'brand',
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

test('BoxedRows over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            variantOutside: 'brand',
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

test('BoxedRows inverse', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            variant: 'brand',
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

test('BoxedRows inverse over inverse', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            variant: 'brand',
            variantOutside: 'brand',
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

test('Rows danger', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            danger: true,
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

test('Rows danger over inverse background', async () => {
    await openStoryPage({
        id: 'components-lists--row-list-story',
        device: 'MOBILE_IOS',
        args: {
            variantOutside: 'brand',
            danger: true,
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

test('BoxedRows danger', async () => {
    await openStoryPage({
        id: 'components-lists--boxed-row-list-story',
        device: 'MOBILE_IOS',
        args: {
            danger: true,
        },
    });

    const list = await screen.findByTestId('list');
    await expectScreenshot(list);
});

for (const testCase of devices) {
    const device = testCase;
    test(`UnorderedList (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--unordered-list-story',
            device,
        });

        const list = await screen.findByLabelText('Unordered List');

        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`UnorderedList default icons (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--unordered-list-story',
            device,
            args: {customIcon: false},
        });

        const list = await screen.findByLabelText('Unordered List');

        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`UnorderedList without marker (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--unordered-list-story',
            device,
            args: {withMarker: false},
        });

        const list = await screen.findByLabelText('Unordered List');

        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`OrderedList (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--ordered-list-story',
            device,
        });

        const list = await screen.findByLabelText('Ordered List');

        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`OrderedList default icons (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--ordered-list-story',
            device,
            args: {customIcon: false},
        });

        const list = await screen.findByLabelText('Ordered List');

        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`OrderedList without marker (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--ordered-list-story',
            device,
            args: {withMarker: false},
        });

        const list = await screen.findByLabelText('Ordered List');

        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`Row list small (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--row-list-story',
            device,
            args: {
                small: true,
                headline: 'Headline',
                subtitle: 'Subtitle',
                detail: 'Detail',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}

for (const testCase of devices) {
    const device = testCase;
    test(`Boxed row list small (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-lists--boxed-row-list-story',
            device,
            args: {
                small: true,
                headline: 'Headline',
                subtitle: 'Subtitle',
                detail: 'Detail',
            },
        });

        const list = await screen.findByTestId('list');
        await expectScreenshot(list);
    });
}
