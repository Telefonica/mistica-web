import * as React from 'react';
import {formatAsYouType} from '@telefonica/libphonenumber';
import {useTheme} from './hooks';

import type {RegionCode} from './utils/region-code';

const format = (regionCode: RegionCode, number?: string): string =>
    number === undefined ? '' : formatAsYouType(number.replace(/[^\d+*#]/g, ''), regionCode);

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

const PhoneInput: React.FC<Props> = ({inputRef, value, defaultValue, ...other}) => {
    const {i18n} = useTheme();
    return (
        <input
            {...other}
            type="tel" // shows telephone keypad in Android and iOS
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
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
