import * as React from 'react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import {SidenavBar} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';

import type {SidenavEntry} from '../sidenav-bar-types';

const defaultEntries = (onSettingsPress: () => void): Array<SidenavEntry> => [
    {id: 'dashboard', label: 'Dashboard', asset: IconHomeRegular, href: '/dashboard'},
    {
        title: 'Workspace',
        dividerTop: true,
        dividerBottom: true,
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                children: [
                    {id: 'active', label: 'Active', href: '/active'},
                    {id: 'archived', label: 'Archived', href: '/archived'},
                ],
            },
            {id: 'settings', label: 'Settings', asset: IconFolderRegular, onPress: onSettingsPress},
        ],
    },
];
const theme = makeTheme({i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'GB'}});
export const Scenario1 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario2 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{headerSlot: <button type="button">Header action</button>}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario3 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{
                    headerSlot: ({collapsed, state}) => (
                        <button type="button">{`Header ${state} ${collapsed}`}</button>
                    ),
                }}
            />
        </ThemeContextProvider>
    );
};
export const Scenario4 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{
                    collapsed: true,
                    onCollapse: () => {},
                    logo: ({collapsed}) => <img src="/brand.svg" alt={`Logo ${collapsed}`} />,
                    headerSlot: ({collapsed, state}) => (
                        <button type="button">{`Header ${state} ${collapsed}`}</button>
                    ),
                    footerSlot: ({collapsed, state}) => (
                        <button type="button">{`Footer ${state} ${collapsed}`}</button>
                    ),
                }}
            />
        </ThemeContextProvider>
    );
};
export const Scenario5 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario6 = ({
    onSelectedItemIdChange = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    const entries: Array<SidenavEntry> = [
        {
            title: {text: 'Workspace', hidden: true},
            items: [{id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'}],
        },
    ];
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={entries}
            />
        </ThemeContextProvider>
    );
};
export const Scenario7 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario8 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{footerSlot: <button type="button">Footer action</button>}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario9 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario10 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
            />
        </ThemeContextProvider>
    );
};
export const Scenario11 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
            />
        </ThemeContextProvider>
    );
};
export const Scenario12 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{selectedItemId: 'home'}}
            />
        </ThemeContextProvider>
    );
};
export const Scenario13 = ({
    onSelectedItemIdChange = () => {},
    onSettingsPress = () => {},
}: {
    onSelectedItemIdChange?: (id: string | null) => void;
    onSettingsPress?: () => void;
}): JSX.Element => {
    return (
        <ThemeContextProvider theme={theme}>
            <SidenavBar
                aria-label="Main navigation"
                onSelectedItemIdChange={onSelectedItemIdChange}
                entries={defaultEntries(onSettingsPress)}
                {...{}}
            />
        </ThemeContextProvider>
    );
};
