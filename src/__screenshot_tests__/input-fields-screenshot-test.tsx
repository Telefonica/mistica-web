import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize, within} from '../test-utils';

test('TextField - appears properly on desktop', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'DESKTOP',
    });

    const field = await screen.findByTestId('text-field');
    await expectScreenshot(field);
});

test('TextField - label', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - optional', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: '', optional: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - optional showOptionalLabel=false', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: '', optional: true, showOptionalLabel: false},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - multiline and optional', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: '', optional: true, multiline: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - multiline and maxLength', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: '', maxLength: true, multiline: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - multiline and maxLength with long helperText', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {
            defaultValue: '',
            maxLength: true,
            multiline: true,
            helperText: 'This is a very long helper text to test that the maxLength text is not wrapping',
        },
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - long label', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: '', label: 'This TextField has a very long label and should display ellipsis'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');

    const image = await fieldWrapper.screenshot();

    const field = await screen.findByLabelText(
        'This TextField has a very long label and should display ellipsis'
    );
    await field.pressSequentially('Some text');

    await expectScreenshot(fieldWrapper);

    await expectScreenshot(image);
});

test('TextField - long value', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: 'This TextField has a very long text and should cover the entire field'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - label and default value', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - helper text', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {helperText: 'Helper text'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - error', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {error: true, helperText: 'I am a descriptive error'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - prefix', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {prefix: 'Prefix'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - end icon', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {icon: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - prefix and end icon focus-ring', async () => {
    const page = await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {prefix: 'Prefix', icon: true},
    });

    // press Tab until the field gets focused
    do {
        await page.keyboard.press('Tab');
    } while ((await page.evaluate(() => document.activeElement?.tagName)) !== 'INPUT');

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - disabled', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {icon: true, disabled: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - read only', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {icon: true, readOnly: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    const field = await screen.findByTestId('text-field');

    await expectScreenshot(fieldWrapper);

    field.click();
    await expectScreenshot(fieldWrapper);
});

test('TextField - inverse and helper text', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand', helperText: 'Helper text'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - inverse and prefix', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand', prefix: 'Prefix'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - inverse and error', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {variantOutside: 'brand', error: true, helperText: 'I am a descriptive error'},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('TextField - collapses its label when autofill fills out the form', async () => {
    const page = await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);

    // it simulates a data autofill
    await page.evaluate(() => {
        const input = document.querySelector('input[name="text"]');
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')?.set?.call(input, 'ciao');
        input?.dispatchEvent(new Event('input', {bubbles: true}));
    });

    await expectScreenshot(fieldWrapper);
});

test('TextField - appears properly (focus)', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    await (await screen.findByLabelText('Label')).click();
    await expectScreenshot(fieldWrapper);
});

test('TextField - appears properly (typing)', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    const field = await screen.findByLabelText('Label');
    await field.pressSequentially('hello moto');
    await expectScreenshot(fieldWrapper);
});

test('TextField - appears properly (typing and blur)', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    const field = await screen.findByLabelText('Label');
    await field.pressSequentially('hello moto');

    await field.evaluate((el) => (el as HTMLInputElement).blur());
    await expectScreenshot(fieldWrapper);
});

test('TextField - multiline', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: '', multiline: true},
    });

    const fieldWrapper = await screen.findByTestId('text-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    const lines = ['1111111111', '2222222222', '3333333333', '4444444444', '5555555555', '6666666666'].join(
        '\n'
    );

    await field.pressSequentially(lines);

    await expectScreenshot(fieldWrapper);

    await field.evaluate((el) => (el as HTMLInputElement).blur());
    await expectScreenshot(fieldWrapper);

    await field.click();
    await expectScreenshot(fieldWrapper);
});

for (const testCase of ['top', 'bottom']) {
    const verticalPosition = testCase;
    test(`Autocomplete menu renders on ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'components-input-fields-autocomplete--controlled',
            device: 'MOBILE_IOS',
            args: {verticalPosition},
        });

        const field = await screen.findByRole('combobox', {name: 'Label'});
        await field.focus();

        await expectScreenshot(page, {...{fullPage: true}});
    });
}

test('Autocomplete scrolls to active option on keyboard navigation', async () => {
    const page = await openStoryPage({
        id: 'components-input-fields-autocomplete--controlled',
        device: 'MOBILE_IOS',
        viewport: {width: 375, height: 200},
    });

    const field = await screen.findByRole('combobox', {name: 'Label'});
    await field.focus();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await expectScreenshot(page);
});

test('SearchField', async () => {
    await openStoryPage({
        id: 'components-input-fields-searchfield--controlled',
        device: 'MOBILE_IOS',
    });

    const fieldWrapper = await screen.findByTestId('search-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('hello moto');
    await expectScreenshot(fieldWrapper);
});

test('SearchField with suggestions', async () => {
    const page = await openStoryPage({
        id: 'components-input-fields-searchfield--controlled',
        device: 'MOBILE_IOS',
        args: {suggestions: true},
    });

    const field = await screen.findByLabelText('Label');
    await field.pressSequentially('a');

    await expectScreenshot(page, {...{fullPage: true}});
});

test('SearchField without suggestions', async () => {
    const page = await openStoryPage({
        id: 'components-input-fields-searchfield--controlled',
        device: 'MOBILE_IOS',
        args: {suggestions: true, withSuggestionsEmptyCase: true},
    });

    const field = await screen.findByLabelText('Label');
    await field.pressSequentially('merry xmas');

    await expectScreenshot(page, {...{fullPage: true}});
});

test('DateField', async () => {
    await openStoryPage({
        id: 'components-input-fields-datefield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('date-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.focus();
    await field.pressSequentially('06' + '10' + '1980');

    await expectScreenshot(fieldWrapper);
});

test('DateField - disabled', async () => {
    await openStoryPage({
        id: 'components-input-fields-datefield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const fieldWrapper = await screen.findByTestId('date-field');

    await expectScreenshot(fieldWrapper);
});

test('DateField - readOnly', async () => {
    await openStoryPage({
        id: 'components-input-fields-datefield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {readOnly: true},
    });

    const fieldWrapper = await screen.findByTestId('date-field');

    await expectScreenshot(fieldWrapper);
});

test('DateTimeField', async () => {
    await openStoryPage({
        id: 'components-input-fields-datetimefield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('datetime-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.focus();
    await field.pressSequentially('06' + '10' + '1980' + '13' + '14');

    await expectScreenshot(fieldWrapper);
});

test('TimeField', async () => {
    await openStoryPage({
        id: 'components-input-fields-timefield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('time-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.focus();
    await field.pressSequentially('09' + '00');

    await expectScreenshot(fieldWrapper);
});

test('MonthField', async () => {
    const page = await openStoryPage({
        id: 'components-input-fields-monthfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('month-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.focus();
    await field.pressSequentially('10');
    page.keyboard.press('Tab');
    await field.pressSequentially('2021');

    await expectScreenshot(fieldWrapper);
});

test('PinField', async () => {
    await openStoryPage({
        id: 'components-input-fields-pinfield--uncontrolled',
        device: 'MOBILE_IOS',
    });

    const fieldGroup = await screen.findByTestId('pin-field');
    await expectScreenshot(fieldGroup);

    const firstDigitField = await within(fieldGroup).findByLabelText('Dígito 1 de 6');
    await firstDigitField.focus();
    await expectScreenshot(fieldGroup);

    await firstDigitField.pressSequentially('1');
    await expectScreenshot(fieldGroup);
});

test('PinField - hideCode', async () => {
    await openStoryPage({
        id: 'components-input-fields-pinfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {hideCode: true},
    });

    const fieldGroup = await screen.findByTestId('pin-field');

    const firstDigitField = await within(fieldGroup).findByLabelText('Dígito 1 de 6');
    await firstDigitField.pressSequentially('1');
    await expectScreenshot(fieldGroup);
});

for (const testCase of [
    {skin: 'Vivo', number: '2145678901'},
    {skin: 'Vivo', number: '+34654834455'},
    {skin: 'Movistar', number: '654834455'},
] as const) {
    const {skin, number} = testCase;
    test(`PhoneNumberField - ${testCase.number} in ${testCase.skin} skin`, async () => {
        await openStoryPage({
            id: 'components-input-fields-phonenumberfield--uncontrolled',
            device: 'MOBILE_IOS',
            skin,
            args: {defaultValue: number},
        });

        const fieldWrapper = await screen.findByTestId('phone-number-field');
        const field = await screen.findByLabelText('Label');

        await field.click({clickCount: 3});
        await field.pressSequentially(number);

        await expectScreenshot(fieldWrapper);
    });
}

for (const testCase of [
    {skin: 'Vivo', number: '2145678901'},
    {skin: 'Vivo', number: '+34654834455'},
    {skin: 'Movistar', number: '654834455'},
] as const) {
    const {skin, number} = testCase;
    test(`PhoneNumberFieldLite - ${testCase.number} in ${testCase.skin} skin`, async () => {
        await openStoryPage({
            id: 'components-input-fields-phonenumberfieldlite--uncontrolled',
            device: 'MOBILE_IOS',
            skin,
            args: {defaultValue: number},
        });

        const fieldWrapper = await screen.findByTestId('phone-number-field-lite');
        const field = await screen.findByLabelText('Label');

        await field.click({clickCount: 3});
        await field.pressSequentially(number);

        await expectScreenshot(fieldWrapper);
    });
}

test('CreditCardExpirationField', async () => {
    await openStoryPage({
        id: 'components-input-fields-creditcardexpirationfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('credit-card-expiration-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('a10b25c');
    await expectScreenshot(fieldWrapper);
});

test('CreditCardNumberField', async () => {
    await openStoryPage({
        id: 'components-input-fields-creditcardnumberfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('credit-card-number-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('d1234567812ab345678c');
    await expectScreenshot(fieldWrapper);
});

test('CvvField', async () => {
    await openStoryPage({
        id: 'components-input-fields-cvvfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('cvv-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('1234abc123');
    await expectScreenshot(fieldWrapper);
});

test('DecimalField', async () => {
    await openStoryPage({
        id: 'components-input-fields-decimalfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('decimal-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('123a,456bc,.3');
    await expectScreenshot(fieldWrapper);
});

test('EmailField', async () => {
    await openStoryPage({
        id: 'components-input-fields-emailfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('email-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('aitor.menta@gmail.com');
    await expectScreenshot(fieldWrapper);
});

test('IbanField', async () => {
    await openStoryPage({
        id: 'components-input-fields-ibanfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('iban-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('ES2114650100722030876293');
    await expectScreenshot(fieldWrapper);
});

test('IntegerField', async () => {
    await openStoryPage({
        id: 'components-input-fields-integerfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('integer-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('123abc123');
    await expectScreenshot(fieldWrapper);
});

test('PasswordField', async () => {
    await openStoryPage({
        id: 'components-input-fields-passwordfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {defaultValue: ''},
    });

    const fieldWrapper = await screen.findByTestId('password-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('password123');
    await expectScreenshot(fieldWrapper);

    await (await screen.findByLabelText('Mostrar contraseña')).click();

    await expectScreenshot(fieldWrapper);
});

test("PasswordField - long label doesn't collide with icon", async () => {
    await openStoryPage({
        id: 'components-input-fields-passwordfield--uncontrolled',
        device: 'MOBILE_IOS',
        args: {label: 'This TextField has a very long label and should display ellipsis'},
    });

    const fieldWrapper = await screen.findByTestId('password-field');

    await expectScreenshot(fieldWrapper);
});

test('TextField - increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-textfield--controlled',
        device: 'MOBILE_IOS',
        args: {prefix: 'Prefix'},
    });

    await setRootFontSize(32);

    const fieldWrapper = await screen.findByTestId('text-field');
    await expectScreenshot(fieldWrapper);
});

test('PasswordField - increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-passwordfield--controlled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const fieldWrapper = await screen.findByTestId('password-field');
    await expectScreenshot(fieldWrapper);
});

test('SearchField - increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-searchfield--controlled',
        device: 'MOBILE_IOS',
        args: {initialValue: 'Some text'},
    });

    await setRootFontSize(32);

    const fieldWrapper = await screen.findByTestId('search-field');
    const field = await screen.findByLabelText('Label');

    await expectScreenshot(fieldWrapper);

    await field.pressSequentially('a long text to cause overflow');
    await field.evaluate((el) => (el as HTMLInputElement).blur());

    await expectScreenshot(fieldWrapper);
});

test('DateField - increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-datefield--controlled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const fieldWrapper = await screen.findByTestId('date-field');
    await expectScreenshot(fieldWrapper);
});

test('CreditCardNumberField - increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-creditcardnumberfield--controlled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const fieldWrapper = await screen.findByTestId('credit-card-number-field');
    await expectScreenshot(fieldWrapper);
});

test('CvvField - increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-cvvfield--controlled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const fieldWrapper = await screen.findByTestId('cvv-field');
    await expectScreenshot(fieldWrapper);
});

test('PinField- increased font size', async () => {
    await openStoryPage({
        id: 'components-input-fields-pinfield--uncontrolled',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const fieldGroup = await screen.findByTestId('pin-field');

    const firstDigitField = await within(fieldGroup).findByLabelText('Dígito 1 de 6');
    await firstDigitField.pressSequentially('1');

    await expectScreenshot(fieldGroup);
});
