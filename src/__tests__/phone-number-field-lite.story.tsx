import * as React from 'react';
import {PhoneNumberFieldLite, PhoneNumberField, ThemeContextProvider} from '..';
import {makeTheme} from '../test-utils/theme';

import type {RegionCode} from '../utils/region-code';

export const Phones = ({
    regionCode,
    customFormatter = false,
}: {
    regionCode: RegionCode | 'ZZ';
    customFormatter?: boolean;
}): JSX.Element => {
    const [calls, setCalls] = React.useState<Array<Array<string>>>([]);
    const [e164Calls, setE164Calls] = React.useState<Array<Array<string>>>([]);
    const [referenceCalls, setReferenceCalls] = React.useState<Array<Array<string>>>([]);
    return (
        <ThemeContextProvider
            theme={makeTheme({
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: regionCode as RegionCode},
            })}
        >
            <PhoneNumberFieldLite
                name="phone"
                label="Phone"
                onChangeValue={(value, rawValue) => setCalls((calls) => [...calls, [value, rawValue]])}
                format={
                    customFormatter ? (number) => number.replace(/\D/g, '').split('').join('-') : undefined
                }
            />
            <PhoneNumberFieldLite
                name="e164"
                label="Phone E164"
                onChangeValue={(value, rawValue) => setE164Calls((calls) => [...calls, [value, rawValue]])}
                e164
            />
            <PhoneNumberField
                name="ref"
                label="Reference"
                onChangeValue={(value, rawValue) =>
                    setReferenceCalls((calls) => [...calls, [value, rawValue]])
                }
            />
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
            <input type="hidden" data-testid="last-change" value={JSON.stringify(calls.at(-1)) ?? ''} />
            <input
                type="hidden"
                data-testid="e164-last-change"
                value={JSON.stringify(e164Calls.at(-1)) ?? ''}
            />
            <input type="hidden" data-testid="reference-calls" value={JSON.stringify(referenceCalls)} />
        </ThemeContextProvider>
    );
};
