import {test, expect} from '../test-utils/component';

import type {Phone} from './phone-number-field.story';

for (const {contextRegionCode, e164, prefix, typed, expectedValue, expectedValueRaw} of [
    {
        contextRegionCode: 'ES',
        e164: false,
        prefix: undefined,
        typed: '+123123123',
        expectedValue: '123123123',
        expectedValueRaw: '+1 231-231-23',
    },
    {
        contextRegionCode: 'ES',
        e164: false,
        prefix: undefined,
        typed: '+54 9 223 123-4567',
        expectedValue: '5492231234567',
        expectedValueRaw: '+54 9 223 123-4567',
    },
    {
        contextRegionCode: 'ES',
        e164: false,
        prefix: undefined,
        typed: '654834455',
        expectedValue: '654834455',
        expectedValueRaw: '654 83 44 55',
    },
    {
        contextRegionCode: 'ES',
        e164: false,
        prefix: '+49',
        typed: '69654321',
        expectedValue: '69654321',
        expectedValueRaw: '69 654321',
    },
    {
        contextRegionCode: 'ES',
        e164: false,
        prefix: undefined,
        typed: '+4969654321',
        expectedValue: '4969654321',
        expectedValueRaw: '+49 69 654321',
    },
    {
        contextRegionCode: 'DE',
        e164: false,
        prefix: undefined,
        typed: '069654321',
        expectedValue: '069654321',
        expectedValueRaw: '069 654321',
    },
    {
        contextRegionCode: 'ES',
        e164: true,
        prefix: undefined,
        typed: '+123123123',
        expectedValue: '+123123123',
        expectedValueRaw: '+1 231-231-23',
    },
    {
        contextRegionCode: 'ES',
        e164: true,
        prefix: undefined,
        typed: '+54 9 223 123-4567',
        expectedValue: '+5492231234567',
        expectedValueRaw: '+54 9 223 123-4567',
    },
    {
        contextRegionCode: 'ES',
        e164: true,
        prefix: undefined,
        typed: '654834455',
        expectedValue: '+34654834455',
        expectedValueRaw: '654 83 44 55',
    },
    {
        contextRegionCode: 'ES',
        e164: true,
        prefix: '+49',
        typed: '69654321',
        expectedValue: '+4969654321',
        expectedValueRaw: '69 654321',
    },
    {
        contextRegionCode: 'ES',
        e164: true,
        prefix: undefined,
        typed: '+4969654321',
        expectedValue: '+4969654321',
        expectedValueRaw: '+49 69 654321',
    },
    {
        contextRegionCode: 'DE',
        e164: true,
        prefix: undefined,
        typed: '069654321',
        expectedValue: '+4969654321',
        expectedValueRaw: '069 654321',
    },
] as const) {
    test(`PhoneNumberField(${contextRegionCode}, ${e164}, ${prefix}, ${typed}, ${expectedValue}, ${expectedValueRaw})`, async ({
        mount,
    }) => {
        const component = await mount<typeof Phone>('phone-number-field/Phone', {
            contextRegionCode,
            e164,
            prefix,
        });
        await component.getByLabel('Enter Phone').pressSequentially(typed);
        await expect(component.getByTestId('change')).toHaveValue(
            JSON.stringify([expectedValue, expectedValueRaw])
        );
    });
}
