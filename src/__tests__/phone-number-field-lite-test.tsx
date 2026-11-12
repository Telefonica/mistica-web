import {render, screen} from '@testing-library/react';
import PhoneNumberFieldLite from '../phone-number-field-lite';
import {getMovistarSkin} from '../skins/movistar';
import ThemeContextProvider from '../theme-context-provider';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import PhoneNumberField from '../phone-number-field';

test.each`
    regionCode | number                | expected             | expectedRaw            | expectedE164         | description
    ${'ZZ'}    | ${'123456789012345'}  | ${'123456789012345'} | ${'123456789012345'}   | ${'123456789012345'} | ${'Unknown region'}
    ${'ES'}    | ${'654834455'}        | ${'654834455'}       | ${'654 83 44 55'}      | ${'+34654834455'}    | ${'ES mobile'}
    ${'ES'}    | ${'914-44/10 25'}     | ${'914441025'}       | ${'914 44 10 25'}      | ${'+34914441025'}    | ${'ES landline'}
    ${'ES'}    | ${'6548344556'}       | ${'6548344556'}      | ${'6548344556'}        | ${'+346548344556'}   | ${'ES mobile too long'}
    ${'ES'}    | ${'914-44/10 256'}    | ${'9144410256'}      | ${'9144410256'}        | ${'+349144410256'}   | ${'ES landline too long'}
    ${'ES'}    | ${'+34 654 834 455'}  | ${'+34654834455'}    | ${'+34 654 83 44 55'}  | ${'+34654834455'}    | ${'ES E164 mobile'}
    ${'ES'}    | ${'+34 914-44/10 25'} | ${'+34914441025'}    | ${'+34 914 44 10 25'}  | ${'+34914441025'}    | ${'ES E164 landline'}
    ${'BR'}    | ${'21987654321'}      | ${'21987654321'}     | ${'(21) 98765-4321'}   | ${'+5521987654321'}  | ${'BR mobile'}
    ${'BR'}    | ${'219876543210'}     | ${'219876543210'}    | ${'219876543210'}      | ${'+55219876543210'} | ${'BR mobile too long'}
    ${'BR'}    | ${'2123456789'}       | ${'2123456789'}      | ${'(21) 2345-6789'}    | ${'+552123456789'}   | ${'BR landline'}
    ${'BR'}    | ${'21234567890'}      | ${'21234567890'}     | ${'(21) 23456-7890'}   | ${'+5521234567890'}  | ${'BR landline long'}
    ${'BR'}    | ${'212345678901'}     | ${'212345678901'}    | ${'212345678901'}      | ${'+55212345678901'} | ${'BR landline too long'}
    ${'BR'}    | ${'+5521987654321'}   | ${'+5521987654321'}  | ${'+55 21 98765-4321'} | ${'+5521987654321'}  | ${'BR E164 mobile'}
    ${'BR'}    | ${'+34654834455'}     | ${'+34654834455'}    | ${'+34 654 83 44 55'}  | ${'+34654834455'}    | ${'BR with ES E164'}
    ${'DE'}    | ${'015789012345'}     | ${'015789012345'}    | ${'01578 9012345'}     | ${'+4915789012345'}  | ${'DE mobile 15'}
    ${'DE'}    | ${'01601234567'}      | ${'01601234567'}     | ${'0160 1234567'}      | ${'+491601234567'}   | ${'DE mobile 16'}
    ${'DE'}    | ${'01701234567'}      | ${'01701234567'}     | ${'0170 1234567'}      | ${'+491701234567'}   | ${'DE mobile 17'}
    ${'DE'}    | ${'12345678901'}      | ${'12345678901'}     | ${'12345678901'}       | ${'+4912345678901'}  | ${'DE unknown'}
    ${'DE'}    | ${'+4915789012345'}   | ${'+4915789012345'}  | ${'+49 1578 9012345'}  | ${'+4915789012345'}  | ${'DE E164 mobile'}
    ${'DE'}    | ${'+49015789012345'}  | ${'+49015789012345'} | ${'+49 015789012345'}  | ${'+49015789012345'} | ${'DE E164 mobile wrong zero'}
    ${'GB'}    | ${'07123456789'}      | ${'07123456789'}     | ${'07123 456789'}      | ${'+447123456789'}   | ${'GB mobile'}
    ${'GB'}    | ${'071234567890'}     | ${'071234567890'}    | ${'071234567890'}      | ${'+4471234567890'}  | ${'GB mobile too long'}
    ${'GB'}    | ${'+447123456789'}    | ${'+447123456789'}   | ${'+44 7123 456789'}   | ${'+447123456789'}   | ${'GB E164 mobile'}
    ${'GB'}    | ${'+4407123456789'}   | ${'+4407123456789'}  | ${'+44 07123456789'}   | ${'+4407123456789'}  | ${'GB E164 mobile wrong zero'}
`(
    'PhoneNumberFieldLite - $description - $number',
    async ({regionCode, number, expected, expectedRaw, expectedE164}) => {
        const onChangeValue = jest.fn();
        const onChangeValueE164 = jest.fn();
        const onChangeValueUsingLibphonenumber = jest.fn();

        render(
            <ThemeContextProvider
                theme={{
                    skin: getMovistarSkin(),
                    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: regionCode},
                }}
            >
                <PhoneNumberFieldLite name="phone" label="Phone" onChangeValue={onChangeValue} />
                <PhoneNumberFieldLite name="e164" label="Phone E164" onChangeValue={onChangeValueE164} e164 />
                <PhoneNumberField
                    name="ref"
                    label="Reference"
                    onChangeValue={onChangeValueUsingLibphonenumber}
                />
            </ThemeContextProvider>
        );

        const input = screen.getByLabelText('Phone');
        const inputE164 = screen.getByLabelText('Phone E164');
        const referenceInput = screen.getByLabelText('Reference');

        await userEvent.type(input, number);
        await userEvent.type(inputE164, number);
        await userEvent.type(referenceInput, number);

        expect(onChangeValue).toHaveBeenLastCalledWith(expected, expectedRaw);
        expect(onChangeValueE164).toHaveBeenLastCalledWith(expectedE164, expectedRaw);

        // We expect the same result as the libphonenumber version, except for the E164 format
        if (!number.startsWith('+')) {
            // This checks all the calls to onChangeValue (as you type)
            expect(onChangeValue.mock.calls).toEqual(onChangeValueUsingLibphonenumber.mock.calls);
        }
    }
);

test('PhoneNumberFieldLite custom formatter', async () => {
    const onChangeValue = jest.fn();

    render(
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
            }}
        >
            <PhoneNumberFieldLite
                name="a"
                label="Phone"
                onChangeValue={onChangeValue}
                format={(number) => {
                    return number.replace(/\D/g, '').split('').join('-');
                }}
            />
        </ThemeContextProvider>
    );

    const input = screen.getByLabelText('Phone');
    await userEvent.type(input, '654834455');

    expect(onChangeValue).toHaveBeenLastCalledWith('654834455', '6-5-4-8-3-4-4-5-5');
});
