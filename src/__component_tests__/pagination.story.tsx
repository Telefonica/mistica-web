import * as React from 'react';
import Pagination from '../pagination';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';

import type {Locale} from '../utils/locale';
import type {RegionCode} from '../utils/region-code';

export const Pages = (props: React.ComponentProps<typeof Pagination>): JSX.Element => (
    <Pagination {...props} />
);
export const Changes = (props: React.ComponentProps<typeof Pagination>): JSX.Element => {
    const [calls, setCalls] = React.useState<Array<number>>([]);
    return (
        <>
            <Pagination {...props} onChange={(value) => setCalls((calls) => [...calls, value])} />
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
        </>
    );
};
export const Localized = ({
    locale,
    phoneNumberFormattingRegionCode,
}: {
    locale: Locale;
    phoneNumberFormattingRegionCode: RegionCode;
}): JSX.Element => (
    <ThemeContextProvider theme={makeTheme({i18n: {locale, phoneNumberFormattingRegionCode}})}>
        <Pagination totalPages={5} currentPage={3} />
    </ThemeContextProvider>
);
