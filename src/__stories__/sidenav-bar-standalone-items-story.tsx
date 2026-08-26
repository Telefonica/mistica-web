'use client';

import * as React from 'react';
import {SidenavBar} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../generated/mistica-icons/icon-documents-regular';
import IconBellRegular from '../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../generated/mistica-icons/icon-settings-regular';
import IconSearchRegular from '../generated/mistica-icons/icon-search-regular';
import Box from '../box';
import {Text3} from '../text';
import {SidenavStoryPage} from './sidenav-bar-story-page';

import type {SidenavEntry} from '../sidenav-bar-types';

type Args = {
    defaultCollapsed: boolean;
    doublePanel: boolean;
    divider: boolean;
};

export const StandaloneItems = ({defaultCollapsed, doublePanel, divider}: Args): React.JSX.Element => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>('section-1-item-1');

    // The first level admits sections and stand-alone items, in any order.
    const sections: Array<SidenavEntry> = [
        {
            id: 'standalone-top',
            label: 'Item without section',
            asset: IconHomeRegular,
            href: '#standalone-top',
        },
        {
            title: 'Section 1 title',
            items: [
                {
                    id: 'section-1-item-1',
                    label: 'Section 1 item 1',
                    asset: IconFolderRegular,
                    href: '#section-1-item-1',
                },
                {
                    id: 'section-1-item-2',
                    label: 'Section 1 item 2',
                    asset: IconDocumentsRegular,
                    href: '#section-1-item-2',
                },
            ],
        },
        {
            id: 'standalone-middle',
            label: 'Item without section',
            asset: IconBellRegular,
            href: '#standalone-middle',
        },
        {
            title: 'Section 2',
            items: [
                {
                    id: 'section-2-item-1',
                    label: 'Section 2 item 1',
                    asset: IconSearchRegular,
                    children: [
                        {
                            id: 'section-2-child-1',
                            label: 'Section 2 child 1',
                            asset: IconDocumentsRegular,
                            href: '#section-2-child-1',
                        },
                        {
                            id: 'section-2-child-2',
                            label: 'Section 2 child 2',
                            asset: IconDocumentsRegular,
                            href: '#section-2-child-2',
                        },
                    ],
                },
            ],
        },
        {
            id: 'standalone-bottom',
            label: 'Item without section',
            asset: IconSettingsRegular,
            href: '#standalone-bottom',
        },
    ];

    return (
        <SidenavStoryPage
            sidenav={
                <SidenavBar
                    {...({
                        'aria-label': 'Sections and stand-alone items',
                        sections,
                        defaultCollapsed,
                        doublePanel,
                        divider,
                        selectedItemId,
                        onSelectedItemIdChange: setSelectedItemId,
                    } as any)}
                />
            }
        >
            <Box padding={24}>
                <Text3 regular>
                    Sections and stand-alone items share the first level. A stand-alone item aligns with the
                    items of a section, and every first level entry keeps the same 16px space to the next one.
                </Text3>
            </Box>
        </SidenavStoryPage>
    );
};

StandaloneItems.storyName = 'Sections and stand-alone items';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
    args: {
        defaultCollapsed: false,
        doublePanel: false,
        divider: true,
    },
    argTypes: {
        defaultCollapsed: {
            control: {type: 'boolean'},
        },
        doublePanel: {
            control: {type: 'boolean'},
        },
        divider: {
            control: {type: 'boolean'},
        },
    },
};
