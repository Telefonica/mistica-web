// @flow
import * as React from 'react';
import {formatAsYouType} from '@tuenti/libphonenumber';
import {useTheme} from './hooks';

import type {RegionCode} from './utils/region-code';

const format = (regionCode: RegionCode, number?: string): ?string =>
    number === undefined ? undefined : formatAsYouType(number.replace(/[^\d+*#]/g, ''), regionCode);

const PhoneInput = ({inputRef, value, defaultValue, ...other}: any): React.Element<'input'> => {
    const {i18n} = useTheme();
    return (
        <input
            {...other}
            type="tel" // shows telephone keypad in Android and iOS
            onInput={(e) => {
                e.currentTarget.value = format(i18n.phoneNumberFormattingRegionCode, e.currentTarget.value);
            }}
            value={format(i18n.phoneNumberFormattingRegionCode, value)}
            defaultValue={format(i18n.phoneNumberFormattingRegionCode, defaultValue)}
            ref={inputRef}
        />
    );
};

export type PhoneInputType = typeof PhoneInput;

export default PhoneInput;
