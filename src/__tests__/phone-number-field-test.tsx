import * as React from 'react';
import {PhoneNumberField} from '..';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test.each`
    contextRegionCode | e164     | prefix       | typed                   | expectedValue       | expectedValueRaw
    ${'ES'}           | ${false} | ${undefined} | ${'+123123123'}         | ${'123123123'}      | ${'+1 231-231-23'}
    ${'ES'}           | ${false} | ${undefined} | ${'+54 9 223 123-4567'} | ${'5492231234567'}  | ${'+54 9 223 123-4567'}
    ${'ES'}           | ${false} | ${undefined} | ${'654834455'}          | ${'654834455'}      | ${'654 83 44 55'}
    ${'ES'}           | ${false} | ${'+49'}     | ${'69654321'}           | ${'69654321'}       | ${'69 654321'}
    ${'ES'}           | ${false} | ${undefined} | ${'+4969654321'}        | ${'4969654321'}     | ${'+49 69 654321'}
    ${'DE'}           | ${false} | ${undefined} | ${'069654321'}          | ${'069654321'}      | ${'069 654321'}
    ${'ES'}           | ${true}  | ${undefined} | ${'+123123123'}         | ${'+123123123'}     | ${'+1 231-231-23'}
    ${'ES'}           | ${true}  | ${undefined} | ${'+54 9 223 123-4567'} | ${'+5492231234567'} | ${'+54 9 223 123-4567'}
    ${'ES'}           | ${true}  | ${undefined} | ${'654834455'}          | ${'+34654834455'}   | ${'654 83 44 55'}
    ${'ES'}           | ${true}  | ${'+49'}     | ${'69654321'}           | ${'+4969654321'}    | ${'69 654321'}
    ${'ES'}           | ${true}  | ${undefined} | ${'+4969654321'}        | ${'+4969654321'}    | ${'+49 69 654321'}
    ${'DE'}           | ${true}  | ${undefined} | ${'069654321'}          | ${'+4969654321'}    | ${'069 654321'}
`(
    `PhoneNumberField($contextRegionCode, $e164, $prefix, $typed, $expectedValue, $expectedValueRaw)`,
    async ({contextRegionCode, e164, prefix, typed, expectedValue, expectedValueRaw}) => {
        const onChangeValueSpy = jest.fn();
        const theme = makeTheme();

        render(
            <ThemeContextProvider
                theme={{
                    ...theme,
                    i18n: {...theme.i18n, phoneNumberFormattingRegionCode: contextRegionCode},
                }}
            >
                <PhoneNumberField
                    e164={e164}
                    prefix={prefix}
                    label="Enter Phone"
                    name="phone"
                    onChangeValue={onChangeValueSpy}
                />
            </ThemeContextProvider>
        );

        userEvent.type(screen.getByLabelText('Enter Phone'), typed);

        expect(onChangeValueSpy).toHaveBeenLastCalledWith(expectedValue, expectedValueRaw);
    }
);

/**

 */
