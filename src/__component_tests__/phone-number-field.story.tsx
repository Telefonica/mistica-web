import * as React from 'react';
import {PhoneNumberField, ThemeContextProvider} from '..';
import {makeTheme} from '../test-utils/theme';

import type {RegionCode} from '../utils/region-code';

export const Phone = ({
    contextRegionCode,
    e164,
    prefix,
}: {
    contextRegionCode: RegionCode;
    e164: boolean;
    prefix?: string;
}): JSX.Element => {
    const [lastChange, setLastChange] = React.useState<Array<string>>([]);
    return (
        <ThemeContextProvider
            theme={makeTheme({i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: contextRegionCode}})}
        >
            <PhoneNumberField
                e164={e164}
                prefix={prefix}
                label="Enter Phone"
                name="phone"
                onChangeValue={(value, rawValue) => setLastChange([value, rawValue])}
            />
            <input type="hidden" data-testid="change" value={JSON.stringify(lastChange)} />
        </ThemeContextProvider>
    );
};
