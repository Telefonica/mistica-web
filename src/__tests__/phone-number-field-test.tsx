import * as React from 'react';
import {Form, PhoneNumberField, ThemeContextProvider} from '..';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

        await userEvent.type(screen.getByLabelText('Enter Phone'), typed);

        expect(onChangeValueSpy).toHaveBeenLastCalledWith(expectedValue, expectedValueRaw);
    }
);

test.each`
    contextRegionCode | prefix       | typed           | expectedValue  | expectedValueRaw
    ${'ES'}           | ${undefined} | ${'+123123123'} | ${'123123123'} | ${'1-2-3-1-2-3-1-2-3'}
    ${'ES'}           | ${'+49'}     | ${'69654321'}   | ${'69654321'}  | ${'6-9-6-5-4-3-2-1'}
    ${'DE'}           | ${undefined} | ${'069654321'}  | ${'069654321'} | ${'0-6-9-6-5-4-3-2-1'}
`(
    `PhoneNumberField with custom formatter ($contextRegionCode, $prefix, $typed, $expectedValue, $expectedValueRaw)`,
    async ({contextRegionCode, prefix, typed, expectedValue, expectedValueRaw}) => {
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
                    prefix={prefix}
                    label="Enter Phone"
                    name="phone"
                    onChangeValue={onChangeValueSpy}
                    format={(number) => {
                        // dumb formatter that just adds a dash between each digit
                        return number.replace(/[^\d]/g, '').split('').join('-');
                    }}
                />
            </ThemeContextProvider>
        );

        await userEvent.type(screen.getByLabelText('Enter Phone'), typed);

        expect(onChangeValueSpy).toHaveBeenLastCalledWith(expectedValue, expectedValueRaw);
    }
);

test('PhoneNumberField gets formatted when libphonenumber loads', async () => {
    const onChangeValueSpy = jest.fn();
    const theme = makeTheme();

    const TestComponent = () => {
        const [isLib, setIsLib] = React.useState(false);
        return (
            <ThemeContextProvider
                theme={{
                    ...theme,
                    i18n: {...theme.i18n, phoneNumberFormattingRegionCode: 'ES'},
                }}
            >
                <Form onSubmit={() => {}}>
                    <PhoneNumberField
                        label="Enter Phone"
                        name="phone"
                        onChangeValue={onChangeValueSpy}
                        format={isLib ? undefined : (number) => number}
                    />
                    <button onClick={() => setIsLib(true)}>enable libphonenumber</button>
                </Form>
            </ThemeContextProvider>
        );
    };

    render(<TestComponent />);

    await userEvent.type(screen.getByLabelText('Enter Phone'), '654834455');

    expect(onChangeValueSpy).toHaveBeenLastCalledWith('654834455', '654834455');

    await userEvent.click(screen.getByText('enable libphonenumber'));

    await waitFor(() => {
        expect(onChangeValueSpy).toHaveBeenLastCalledWith('654834455', '654 83 44 55');
    });
});
