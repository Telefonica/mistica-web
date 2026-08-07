'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import Badge from '../../../badge';
import Box from '../../../box';

import type {SidenavSection} from '../../sidenav-types';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
};

export const WithRightSlots = (): React.JSX.Element => {
    const sections: SidenavSection[] = [
        {
            items: [
                {
                    id: 'home',
                    label: 'Home',
                    asset: IconHomeRegular,
                    href: '#home',
                    rightSlot: <Badge value={3} />,
                },
                {
                    id: 'notif',
                    label: 'Notifications',
                    asset: IconBellRegular,
                    href: '#notif',
                    rightSlot: <Badge value={12} />,
                },
            ],
        },
        {
            title: 'Workspace',
            dividerTop: true,
            items: [
                {
                    id: 'projects',
                    label: 'Projects',
                    asset: IconFolderRegular,
                    defaultOpen: true,
                    children: [
                        {
                            id: 'active',
                            label: 'Active',
                            asset: IconFolderRegular,
                            href: '#active',
                            rightSlot: <Box paddingRight={8}>{/* custom content */}</Box>,
                        },
                        {
                            id: 'archived',
                            label: 'Archived',
                            asset: IconFolderRegular,
                            href: '#archived',
                        },
                    ],
                },
                {
                    id: 'settings',
                    label: 'Settings',
                    asset: IconSettingsRegular,
                    href: '#settings',
                    rightSlot: <Box paddingRight={8}>New</Box>,
                },
            ],
        },
    ];

    return (
        <div style={{height: '100vh'}}>
            <SidenavBar aria-label="Right slots example" sections={sections} />
        </div>
    );
};

WithRightSlots.storyName = 'With right slots';
