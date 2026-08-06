'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import Badge from '../../../badge';
import Box from '../../../box';

export default {
    title: 'Components/SidenavBar/Bar',
};

export const WithRightSlots = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Right slots example">
            <SidenavSection>
                <SidenavItem
                    id="home"
                    label="Home"
                    asset={IconHomeRegular}
                    href="#home"
                    rightSlot={<Badge value={3} />}
                />
                <SidenavItem
                    id="notif"
                    label="Notifications"
                    asset={IconBellRegular}
                    href="#notif"
                    rightSlot={<Badge value={12} />}
                />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem id="projects" label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem
                        id="active"
                        label="Active"
                        asset={IconFolderRegular}
                        href="#active"
                        rightSlot={<Box paddingRight={8}>{/* custom content */}</Box>}
                    />
                    <SidenavItem id="archived" label="Archived" asset={IconFolderRegular} href="#archived" />
                </SidenavItem>
                <SidenavItem
                    id="settings"
                    label="Settings"
                    asset={IconSettingsRegular}
                    href="#settings"
                    rightSlot={<Box paddingRight={8}>New</Box>}
                />
            </SidenavSection>
        </SidenavBar>
    </div>
);

WithRightSlots.storyName = 'With right slots';
