import {test, expect} from '../test-utils/component';

import type {Phones} from './phone-number-field-lite.story';

for (const {regionCode, number, expected, expectedRaw, expectedE164, description} of [
    {
        regionCode: 'ZZ',
        number: '123456789012345',
        expected: '123456789012345',
        expectedRaw: '123456789012345',
        expectedE164: '123456789012345',
        description: 'Unknown region',
    },
    {
        regionCode: 'ES',
        number: '654834455',
        expected: '654834455',
        expectedRaw: '654 83 44 55',
        expectedE164: '+34654834455',
        description: 'ES mobile',
    },
    {
        regionCode: 'ES',
        number: '914-44/10 25',
        expected: '914441025',
        expectedRaw: '914 44 10 25',
        expectedE164: '+34914441025',
        description: 'ES landline',
    },
    {
        regionCode: 'ES',
        number: '6548344556',
        expected: '6548344556',
        expectedRaw: '6548344556',
        expectedE164: '+346548344556',
        description: 'ES mobile too long',
    },
    {
        regionCode: 'ES',
        number: '914-44/10 256',
        expected: '9144410256',
        expectedRaw: '9144410256',
        expectedE164: '+349144410256',
        description: 'ES landline too long',
    },
    {
        regionCode: 'ES',
        number: '+34 654 834 455',
        expected: '+34654834455',
        expectedRaw: '+34 654 83 44 55',
        expectedE164: '+34654834455',
        description: 'ES E164 mobile',
    },
    {
        regionCode: 'ES',
        number: '+34 914-44/10 25',
        expected: '+34914441025',
        expectedRaw: '+34 914 44 10 25',
        expectedE164: '+34914441025',
        description: 'ES E164 landline',
    },
    {
        regionCode: 'BR',
        number: '21987654321',
        expected: '21987654321',
        expectedRaw: '(21) 98765-4321',
        expectedE164: '+5521987654321',
        description: 'BR mobile',
    },
    {
        regionCode: 'BR',
        number: '219876543210',
        expected: '219876543210',
        expectedRaw: '219876543210',
        expectedE164: '+55219876543210',
        description: 'BR mobile too long',
    },
    {
        regionCode: 'BR',
        number: '2123456789',
        expected: '2123456789',
        expectedRaw: '(21) 2345-6789',
        expectedE164: '+552123456789',
        description: 'BR landline',
    },
    {
        regionCode: 'BR',
        number: '21234567890',
        expected: '21234567890',
        expectedRaw: '(21) 23456-7890',
        expectedE164: '+5521234567890',
        description: 'BR landline long',
    },
    {
        regionCode: 'BR',
        number: '212345678901',
        expected: '212345678901',
        expectedRaw: '212345678901',
        expectedE164: '+55212345678901',
        description: 'BR landline too long',
    },
    {
        regionCode: 'BR',
        number: '+5521987654321',
        expected: '+5521987654321',
        expectedRaw: '+55 21 98765-4321',
        expectedE164: '+5521987654321',
        description: 'BR E164 mobile',
    },
    {
        regionCode: 'BR',
        number: '+34654834455',
        expected: '+34654834455',
        expectedRaw: '+34 654 83 44 55',
        expectedE164: '+34654834455',
        description: 'BR with ES E164',
    },
    {
        regionCode: 'DE',
        number: '015789012345',
        expected: '015789012345',
        expectedRaw: '01578 9012345',
        expectedE164: '+4915789012345',
        description: 'DE mobile 15',
    },
    {
        regionCode: 'DE',
        number: '01601234567',
        expected: '01601234567',
        expectedRaw: '0160 1234567',
        expectedE164: '+491601234567',
        description: 'DE mobile 16',
    },
    {
        regionCode: 'DE',
        number: '01701234567',
        expected: '01701234567',
        expectedRaw: '0170 1234567',
        expectedE164: '+491701234567',
        description: 'DE mobile 17',
    },
    {
        regionCode: 'DE',
        number: '12345678901',
        expected: '12345678901',
        expectedRaw: '12345678901',
        expectedE164: '+4912345678901',
        description: 'DE unknown',
    },
    {
        regionCode: 'DE',
        number: '+4915789012345',
        expected: '+4915789012345',
        expectedRaw: '+49 1578 9012345',
        expectedE164: '+4915789012345',
        description: 'DE E164 mobile',
    },
    {
        regionCode: 'DE',
        number: '+49015789012345',
        expected: '+49015789012345',
        expectedRaw: '+49 015789012345',
        expectedE164: '+49015789012345',
        description: 'DE E164 mobile wrong zero',
    },
    {
        regionCode: 'GB',
        number: '07123456789',
        expected: '07123456789',
        expectedRaw: '07123 456789',
        expectedE164: '+447123456789',
        description: 'GB mobile',
    },
    {
        regionCode: 'GB',
        number: '071234567890',
        expected: '071234567890',
        expectedRaw: '071234567890',
        expectedE164: '+4471234567890',
        description: 'GB mobile too long',
    },
    {
        regionCode: 'GB',
        number: '+447123456789',
        expected: '+447123456789',
        expectedRaw: '+44 7123 456789',
        expectedE164: '+447123456789',
        description: 'GB E164 mobile',
    },
    {
        regionCode: 'GB',
        number: '+4407123456789',
        expected: '+4407123456789',
        expectedRaw: '+44 07123456789',
        expectedE164: '+4407123456789',
        description: 'GB E164 mobile wrong zero',
    },
] as const) {
    test(`PhoneNumberFieldLite - ${description} - ${number}`, async ({mount}) => {
        const component = await mount<typeof Phones>('phone-number-field-lite/Phones', {regionCode});
        await component.getByLabel('Phone', {exact: true}).pressSequentially(number);
        await component.getByLabel('Phone E164', {exact: true}).pressSequentially(number);
        await component.getByLabel('Reference', {exact: true}).pressSequentially(number);
        await expect(component.getByTestId('last-change')).toHaveValue(
            JSON.stringify([expected, expectedRaw])
        );
        await expect(component.getByTestId('e164-last-change')).toHaveValue(
            JSON.stringify([expectedE164, expectedRaw])
        );
        if (!number.startsWith('+')) {
            await expect(component.getByTestId('calls')).toHaveValue(
                await component.getByTestId('reference-calls').inputValue()
            );
        }
    });
}
test('PhoneNumberFieldLite custom formatter', async ({mount}) => {
    const component = await mount<typeof Phones>('phone-number-field-lite/Phones', {
        regionCode: 'ES',
        customFormatter: true,
    });
    await component.getByLabel('Phone', {exact: true}).pressSequentially('654834455');
    await expect(component.getByTestId('last-change')).toHaveValue(
        JSON.stringify(['654834455', '6-5-4-8-3-4-4-5-5'])
    );
});
