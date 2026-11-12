import {test, expect} from '../test-utils/playwright';
import {within, openStoryPage, screen, waitFor} from '../test-utils';

import type {Locator, PageApi} from '../test-utils';

const clearAndType = async (element: Locator, text: string) => {
    await element.click({clickCount: 3});
    await element.pressSequentially(text);
};

const getValue = async (element: Promise<Locator> | Locator) => (await element).inputValue();

const STORY_TYPES = ['controlled', 'uncontrolled'] as const;
export type StoryType = (typeof STORY_TYPES)[number];

const getStoryOfType = (component: string, storyType: StoryType) => ({
    id: `components-input-fields-${component}--${storyType}`,
});

test('Autocomplete', async () => {
    await openStoryPage(getStoryOfType('autocomplete', 'controlled'));

    const field = await screen.findByRole('combobox', {name: 'Label'});

    await field.focus();
    const items = await screen.findAllByRole('option');
    expect(items).toHaveLength(5);
});

test('TextField with suggestions', async () => {
    await openStoryPage({
        ...getStoryOfType('textfield', 'controlled'),
        args: {suggestions: true},
    });

    const field = await screen.findByLabelText('Label');

    await clearAndType(field, 'a'); // start typing to trigger suggestions list
    const items = await screen.findAllByRole('option');
    expect(items).toHaveLength(5);

    const item = await screen.findByText('Algeria');

    await item.click();
    await expect(getValue(screen.findByLabelText('Label'))).resolves.toBe('Algeria');
});

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`IntegerField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('integerfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, '+-1,2.3e4$5i%');
        expect(await getValue(field)).toBe('12345');
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`DecimalField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('decimalfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, '123,456');
        expect(await getValue(field)).toBe('123,456');

        await clearAndType(field, '123.456');
        expect(await getValue(field)).toBe('123,456');

        await clearAndType(field, '+-123e.4,5.6i');
        expect(await getValue(field)).toBe('123,456');

        // test editing the number to set the decimal char in a previous pos
        await clearAndType(field, '124,5');
        expect(await getValue(field)).toBe('124,5');
        await field.evaluate((el) => {
            // set the caret position on a digit before the ,
            (el as HTMLInputElement).setSelectionRange(2, 2);
        });
        await field.pressSequentially('.3');
        expect(await getValue(field)).toBe('12,345');

        // test editing the number to set the decimal char in a later pos
        await clearAndType(field, '1,24');
        expect(await getValue(field)).toBe('1,24');
        await field.evaluate((el) => {
            // set the caret position on a digit after the ,
            (el as HTMLInputElement).setSelectionRange(3, 3);
        });
        await field.pressSequentially('.3');
        expect(await getValue(field)).toBe('1,234'); // only the first , should be considered.
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`CreditCardNumberField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('creditcardnumberfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, '1234567890123456');
        expect(await getValue(field)).toBe('1234 5678 9012 3456');

        await clearAndType(field, '1234-567.8 9012/34abc567 890');
        expect(await getValue(field)).toBe('1234 5678 9012 3456');

        await clearAndType(field, '123456789012');
        expect(await getValue(field)).toBe('1234 5678 9012');
        await field.evaluate((el) => {
            // set the caret position after the first block
            (el as HTMLInputElement).setSelectionRange(4, 4);
        });
        await field.pressSequentially('1234');
        expect(await getValue(field)).toBe('1234 1234 5678 9012');
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`CreditCardExpirationField (${testCase})`, async () => {
        const page = await openStoryPage(getStoryOfType('creditcardexpirationfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, '1234');
        expect(await getValue(field)).toBe('12/34');

        await clearAndType(field, ' ');
        expect(await getValue(field)).toBe('');

        await clearAndType(field, '934');
        expect(await getValue(field)).toBe('09/34');

        await clearAndType(field, '12///34/56');
        expect(await getValue(field)).toBe('12/34');

        await clearAndType(field, '222');
        expect(await getValue(field)).toBe('02/22');

        await page.keyboard.press('Backspace');
        await page.keyboard.press('Backspace');
        expect(await getValue(field)).toBe('02/');

        await page.keyboard.press('Backspace');
        expect(await getValue(field)).toBe('0');

        await field.pressSequentially('222');
        expect(await getValue(field)).toBe('02/22');
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`PasswordField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('passwordfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, 'patata123');
        expect(await getValue(field)).toBe('patata123');

        await field.evaluate((el) => {
            // move the caret
            (el as HTMLInputElement).setSelectionRange(6, 6);
        });
        await (await screen.findByLabelText('Mostrar contraseña')).click();

        await waitFor(async () => {
            expect(await field.evaluate((element) => (element as HTMLInputElement).selectionStart)).toBe(6);
        });

        await field.evaluate(
            (el) =>
                new Promise<void>((resolve) => {
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() => {
                            (el as HTMLInputElement).setSelectionRange(0, 0);
                            resolve();
                        })
                    );
                })
        );

        await (await screen.findByLabelText('Ocultar contraseña')).click();

        await waitFor(async () => {
            expect(await field.evaluate((element) => (element as HTMLInputElement).selectionStart)).toBe(0);
        });
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`DateField (${testCase})`, async () => {
        await openStoryPage({...getStoryOfType('datefield', storyType), device: 'DESKTOP'});
        const field = await screen.findByLabelText('Label');
        await field.focus();
        // Use the same day and month so either date segment order works.
        await field.pressSequentially('06061980');
        await expect(field).toHaveValue('1980-06-06');
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`PhoneNumberField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('phonenumberfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, '654834455');
        expect(await getValue(field)).toBe('654 83 44 55');

        await clearAndType(field, '+34 (654) 83-44 / 55');
        expect(await getValue(field)).toBe('+34 654 83 44 55');

        await clearAndType(field, '#1 *2');
        expect(await getValue(field)).toBe('#1*2');

        await clearAndType(field, '6542211');
        expect(await getValue(field)).toBe('654 22 11');
        await field.evaluate((el) => {
            // set the caret position after the 654 prefix
            (el as HTMLInputElement).setSelectionRange(3, 3);
        });
        await field.pressSequentially('39');
        expect(await getValue(field)).toBe('654 39 22 11');
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`SearchField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('searchfield', storyType));

        const field = await screen.findByLabelText('Label');

        await clearAndType(field, 'something');
        expect(await getValue(field)).toBe('something');
        await (await screen.findByLabelText('Borrar búsqueda')).click();
        expect(await getValue(field)).toBe('');
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`SearchField width does not change when clear icon appears (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('searchfield', storyType));

        const fieldWrapper = await screen.findByTestId('search-field');
        const field = await screen.findByLabelText('Label');

        const emptyWidth = await fieldWrapper.evaluate((element) => element.getBoundingClientRect().width);

        await clearAndType(field, 'something');

        const filledWidth = await fieldWrapper.evaluate((element) => element.getBoundingClientRect().width);

        expect(filledWidth).toBeCloseTo(emptyWidth);
    });
}

for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`PinField (${testCase})`, async () => {
        await openStoryPage(getStoryOfType('pinfield', storyType));

        const fieldGroup = await screen.findByLabelText('OTP');
        const firstDigitField = await within(fieldGroup).findByLabelText('Dígito 1 de 6');
        await firstDigitField.pressSequentially('123456');

        await screen.findByText('value: (string) "123456"');
        await screen.findByText('rawValue: (string) "123456"');
    });
}
for (const testCase of STORY_TYPES) {
    const storyType = testCase;
    test(`PinField (hideCode) (${testCase})`, async () => {
        await openStoryPage({...getStoryOfType('pinfield', storyType), args: {hideCode: true}});

        const fieldGroup = await screen.findByLabelText('PIN');
        const firstDigitField = await within(fieldGroup).findByLabelText('Dígito 1 de 6');
        await firstDigitField.pressSequentially('123456');

        await screen.findByText('value: (string) "123456"');
        await screen.findByText('rawValue: (string) "123456"');
    });
}

test('PinField focus management', async () => {
    test.setTimeout(1200000);

    await openStoryPage(getStoryOfType('pinfield', 'controlled'));

    const fieldGroup = await screen.findByLabelText('OTP');

    const firstDigitField = await within(fieldGroup).findByLabelText('Dígito 1 de 6');
    const secondDigitField = await within(fieldGroup).findByLabelText('Dígito 2 de 6');
    const thirdDigitField = await within(fieldGroup).findByLabelText('Dígito 3 de 6');
    const forthDigitField = await within(fieldGroup).findByLabelText('Dígito 4 de 6');

    // try to focus forth field, but the first one is focused instead
    await forthDigitField.focus();
    expect(await forthDigitField.evaluate((el) => el === document.activeElement)).toBe(false);
    expect(await firstDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // focus is moved to second field after typing
    await firstDigitField.pressSequentially('1');
    expect(await secondDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    await secondDigitField.evaluate((el) => (el as HTMLInputElement).blur());
    expect(await secondDigitField.evaluate((el) => el === document.activeElement)).toBe(false);

    // try to focus forth field, but the second one is focused instead
    await forthDigitField.focus();
    expect(await secondDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // focus is moved to third field after typing
    await secondDigitField.pressSequentially('2');
    expect(await thirdDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // move to previous field with left arrow
    await thirdDigitField.press('ArrowLeft');
    expect(await secondDigitField.evaluate((el) => el === document.activeElement)).toBe(true);
    await secondDigitField.press('ArrowLeft');
    expect(await firstDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // type a number to overwrite the first field value
    await firstDigitField.pressSequentially('9');
    await screen.findByText('value: (string) "92"');
    expect(await secondDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // move to next field with right arrow
    await secondDigitField.press('ArrowRight');
    expect(await thirdDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // type a new number
    await thirdDigitField.pressSequentially('3');
    await screen.findByText('value: (string) "923"');
    expect(await forthDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // go back with Backspace
    await forthDigitField.press('Backspace');
    await screen.findByText('value: (string) "923"');
    expect(await thirdDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // delete with Backspace
    await thirdDigitField.press('Backspace');
    await screen.findByText('value: (string) "92"');
    expect(await secondDigitField.evaluate((el) => el === document.activeElement)).toBe(true);

    // move left with left arrow and delete with Delete key
    await secondDigitField.press('ArrowLeft');
    expect(await firstDigitField.evaluate((el) => el === document.activeElement)).toBe(true);
    await firstDigitField.press('Delete');
    await screen.findByText('value: (string) "2"');
});

const copyFieldContentToClipboard = async (page: PageApi, field: Locator) => {
    await field.focus();
    await page.keyboard.press('ControlOrMeta+A');

    await page.keyboard.press('ControlOrMeta+C');
};

const pasteClipboardContentToField = async (page: PageApi, field: Locator) => {
    await field.focus();
    await page.keyboard.press('ControlOrMeta+V');
};

test('TextField preventCopy', async () => {
    test.setTimeout(1200000);

    let page = await openStoryPage(getStoryOfType('textfield', 'controlled'));

    let field = await screen.findByLabelText('Label');

    await clearAndType(field, 'first input text');

    await copyFieldContentToClipboard(page, field);
    await field.fill('');
    expect(await getValue(field)).toBe('');

    await pasteClipboardContentToField(page, field);

    // paste worked because preventCopy is false
    expect(await getValue(field)).toBe('first input text');

    page = await openStoryPage({
        ...getStoryOfType('textfield', 'controlled'),
        args: {preventCopy: true},
    });

    field = await screen.findByLabelText('Label');

    await clearAndType(field, 'second input text');

    await copyFieldContentToClipboard(page, field);
    await field.fill('');
    expect(await getValue(field)).toBe('');

    await pasteClipboardContentToField(page, field);

    // paste did not work because preventCopy is true. So the field has the previous clipboard content
    expect(await getValue(field)).toBe('first input text');
});
