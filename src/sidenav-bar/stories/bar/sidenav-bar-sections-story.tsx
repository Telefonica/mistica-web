'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconAlarmClockRegular from '../../../generated/mistica-icons/icon-alarm-clock-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
};

type MultipleSectionsArgs = {
    workspaceDividerTop: boolean;
    workspaceDividerBottom: boolean;
    accountDividerTop: boolean;
    accountDividerBottom: boolean;
    otherDividerTop: boolean;
    otherDividerBottom: boolean;
};

export const MultipleSections = ({
    workspaceDividerTop,
    workspaceDividerBottom,
    accountDividerTop,
    accountDividerBottom,
    otherDividerTop,
    otherDividerBottom,
}: MultipleSectionsArgs): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Multiple sections example">
            <SidenavSection>
                <SidenavItem id="home" label="Home" asset={IconHomeRegular} href="#home" />
                <SidenavItem id="search" label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection
                title="Workspace"
                dividerTop={workspaceDividerTop}
                dividerBottom={workspaceDividerBottom}
            >
                <SidenavItem id="projects" label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem id="active" label="Active" href="#active" />
                    <SidenavItem id="archived" label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem
                    id="notifications"
                    label="Notifications"
                    asset={IconBellRegular}
                    href="#notifications"
                />
            </SidenavSection>
            <SidenavSection
                title="Account"
                dividerTop={accountDividerTop}
                dividerBottom={accountDividerBottom}
            >
                <SidenavItem id="profile" label="Profile" asset={IconDocumentsRegular} href="#profile" />
                <SidenavItem id="history" label="History" asset={IconAlarmClockRegular} href="#history" />
                <SidenavItem id="settings" label="Settings" asset={IconSettingsRegular} href="#settings" />
            </SidenavSection>
            <SidenavSection title="Other" dividerTop={otherDividerTop} dividerBottom={otherDividerBottom}>
                <SidenavItem id="docs" label="Documentation" href="#docs" asset={IconDocumentsRegular} />
                <SidenavItem id="help" label="Help" href="#help" asset={IconSearchRegular} />
            </SidenavSection>
        </SidenavBar>
    </div>
);

MultipleSections.storyName = 'Multiple sections';

MultipleSections.args = {
    workspaceDividerTop: true,
    workspaceDividerBottom: true,
    accountDividerTop: true,
    accountDividerBottom: true,
    otherDividerTop: false,
    otherDividerBottom: false,
};

MultipleSections.argTypes = {
    workspaceDividerTop: {control: 'boolean'},
    workspaceDividerBottom: {control: 'boolean'},
    accountDividerTop: {control: 'boolean'},
    accountDividerBottom: {control: 'boolean'},
    otherDividerTop: {control: 'boolean'},
    otherDividerBottom: {control: 'boolean'},
};
