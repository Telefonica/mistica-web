import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconAlarmClockRegular from '../../../generated/mistica-icons/icon-alarm-clock-regular';
import {Placeholder} from '../../../placeholder';
import Badge from '../../../badge';
import Box from '../../../box';

import type {Variant} from '../../../theme-variant-context';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {fullScreen: true},
};

type Args = {
    label: string;
    variant: Variant;
    logo: boolean;
    headerSlot: boolean;
    footerSlot: boolean;
    fixedFooter: boolean;
    boxed: boolean;
    divider: boolean;
    collapsible: boolean;
    defaultCollapsed: boolean;
    doublePanel: boolean;
};

export const Default = ({
    label,
    variant,
    logo,
    headerSlot,
    footerSlot,
    fixedFooter,
    boxed,
    divider,
    collapsible,
    defaultCollapsed,
    doublePanel,
}: Args): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar
            aria-label={label}
            variant={variant}
            logo={logo ? undefined : false}
            headerSlot={headerSlot ? <Placeholder height={76} /> : undefined}
            footerSlot={footerSlot ? <Placeholder height={76} /> : undefined}
            fixedFooter={fixedFooter}
            {...(boxed ? ({boxed: true} as const) : ({boxed: false, divider} as const))}
            collapsible={collapsible}
            defaultCollapsed={defaultCollapsed}
            doublePanel={doublePanel}
        >
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" asset={IconBellRegular} href="#notifications" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

Default.storyName = 'SidenavBar';

Default.args = {
    label: 'Main navigation',
    variant: 'default',
    logo: true,
    headerSlot: true,
    footerSlot: true,
    fixedFooter: false,
    boxed: false,
    divider: true,
    collapsible: true,
    defaultCollapsed: false,
    doublePanel: false,
};

Default.argTypes = {
    variant: {
        options: ['default', 'brand', 'alternative', 'negative', 'media'],
        control: {type: 'select'},
    },
    divider: {if: {arg: 'boxed', truthy: false}},
    fixedFooter: {if: {arg: 'footerSlot', truthy: true}},
};

export const DeepNesting = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Deep nesting example">
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
            </SidenavSection>
            <SidenavSection title="Navigation" dividerTop>
                <SidenavItem label="Level 1" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Level 2a" asset={IconDocumentsRegular} defaultOpen>
                        <SidenavItem label="Level 3a" asset={IconDocumentsRegular} href="#l3a" />
                        <SidenavItem label="Level 3b" asset={IconDocumentsRegular} href="#l3b" />
                    </SidenavItem>
                    <SidenavItem label="Level 2b" asset={IconDocumentsRegular} href="#l2b" />
                </SidenavItem>
                <SidenavItem label="Other" asset={IconSearchRegular} href="#other" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DeepNesting.storyName = 'Deep nesting';

export const WithRightSlots = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Right slots example">
            <SidenavSection>
                <SidenavItem
                    label="Home"
                    asset={IconHomeRegular}
                    href="#home"
                    selected
                    rightSlot={<Badge value={3} />}
                />
                <SidenavItem
                    label="Notifications"
                    asset={IconBellRegular}
                    href="#notif"
                    rightSlot={<Badge value={12} />}
                />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem
                        label="Active"
                        asset={IconFolderRegular}
                        href="#active"
                        rightSlot={<Box paddingRight={8}>{/* custom content */}</Box>}
                    />
                    <SidenavItem label="Archived" asset={IconFolderRegular} href="#archived" />
                </SidenavItem>
                <SidenavItem
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
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection
                title="Workspace"
                dividerTop={workspaceDividerTop}
                dividerBottom={workspaceDividerBottom}
            >
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" asset={IconBellRegular} href="#notifications" />
            </SidenavSection>
            <SidenavSection
                title="Account"
                dividerTop={accountDividerTop}
                dividerBottom={accountDividerBottom}
            >
                <SidenavItem label="Profile" asset={IconDocumentsRegular} href="#profile" />
                <SidenavItem label="History" asset={IconAlarmClockRegular} href="#history" />
                <SidenavItem label="Settings" asset={IconSettingsRegular} href="#settings" />
            </SidenavSection>
            <SidenavSection title="Other" dividerTop={otherDividerTop} dividerBottom={otherDividerBottom}>
                <SidenavItem label="Documentation" href="#docs" asset={IconDocumentsRegular} />
                <SidenavItem label="Help" href="#help" asset={IconSearchRegular} />
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

export const NotCollapsible = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Not collapsible example" collapsible={false}>
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" asset={IconBellRegular} href="#notifications" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

NotCollapsible.storyName = 'Not collapsible';

export const Boxed = (): React.JSX.Element => (
    <div style={{height: '100vh', padding: '24px', backgroundColor: '#f5f5f5'}}>
        <SidenavBar aria-label="Boxed example" boxed>
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" asset={IconBellRegular} href="#notifications" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

Boxed.storyName = 'Boxed';

type SectionDividersOnlyArgs = {
    section1DividerTop: boolean;
    section1DividerBottom: boolean;
    section2DividerTop: boolean;
    section2DividerBottom: boolean;
    section3DividerTop: boolean;
    section3DividerBottom: boolean;
};

export const SectionDividersOnly = ({
    section1DividerTop,
    section1DividerBottom,
    section2DividerTop,
    section2DividerBottom,
    section3DividerTop,
    section3DividerBottom,
}: SectionDividersOnlyArgs): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Section dividers only example">
            <SidenavSection dividerTop={section1DividerTop} dividerBottom={section1DividerBottom}>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection dividerTop={section2DividerTop} dividerBottom={section2DividerBottom}>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" asset={IconBellRegular} href="#notifications" />
            </SidenavSection>
            <SidenavSection dividerTop={section3DividerTop} dividerBottom={section3DividerBottom}>
                <SidenavItem label="Profile" asset={IconDocumentsRegular} href="#profile" />
                <SidenavItem label="Settings" asset={IconSettingsRegular} href="#settings" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

SectionDividersOnly.storyName = 'Section dividers only';

SectionDividersOnly.args = {
    section1DividerTop: false,
    section1DividerBottom: false,
    section2DividerTop: true,
    section2DividerBottom: true,
    section3DividerTop: true,
    section3DividerBottom: false,
};

SectionDividersOnly.argTypes = {
    section1DividerTop: {control: 'boolean'},
    section1DividerBottom: {control: 'boolean'},
    section2DividerTop: {control: 'boolean'},
    section2DividerBottom: {control: 'boolean'},
    section3DividerTop: {control: 'boolean'},
    section3DividerBottom: {control: 'boolean'},
};

export const IconVisibility = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Icon visibility example">
            <SidenavSection>
                <SidenavItem
                    label="Home"
                    asset={IconHomeRegular}
                    href="#home"
                    selected
                    showIconWhenExpanded
                />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="With icons expanded" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem
                    label="Notifications"
                    asset={IconBellRegular}
                    href="#notifications"
                    showIconWhenExpanded
                />
            </SidenavSection>
            <SidenavSection title="Without icons expanded" dividerTop dividerBottom>
                <SidenavItem
                    label="Profile"
                    asset={IconDocumentsRegular}
                    href="#profile"
                    showIconWhenExpanded={false}
                />
                <SidenavItem
                    label="Settings"
                    asset={IconSettingsRegular}
                    href="#settings"
                    showIconWhenExpanded={false}
                />
            </SidenavSection>
            <SidenavSection title="Mixed">
                <SidenavItem
                    label="History"
                    asset={IconAlarmClockRegular}
                    href="#history"
                    showIconWhenExpanded
                />
                <SidenavItem
                    label="Help"
                    asset={IconSearchRegular}
                    href="#help"
                    showIconWhenExpanded={false}
                />
            </SidenavSection>
        </SidenavBar>
    </div>
);

IconVisibility.storyName = 'Icon visibility';

export const DifferentAssets = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Different assets example">
            <SidenavSection>
                <SidenavItem label="With icon" asset={IconHomeRegular} href="#icon-asset" />
            </SidenavSection>
            <SidenavSection title="Alternative assets" dividerTop>
                <SidenavItem label="With badge" asset={<Badge value={5} />} href="#badge-asset" />
                <SidenavItem
                    label="With avatar"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: '#FF6B35',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            AB
                        </div>
                    }
                    href="#avatar-asset"
                />
                <SidenavItem
                    label="With image"
                    asset={
                        <img
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect fill='%23E8E8E8' width='20' height='20'/%3E%3Ctext x='10' y='15' font-size='12' text-anchor='middle' fill='%23666'%3E📷%3C/text%3E%3C/svg%3E"
                            alt=""
                            style={{width: 20, height: 20}}
                        />
                    }
                    href="#image-asset"
                />
                <SidenavItem
                    label="With emoji"
                    asset={<span style={{fontSize: 20, lineHeight: 1}}>⭐</span>}
                    href="#emoji-asset"
                />
                <SidenavItem
                    label="With custom box"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#00BCD4',
                                borderRadius: 4,
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            +
                        </div>
                    }
                    href="#custom-box-asset"
                />
                <SidenavItem
                    label="With custom component"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: '2px solid #999',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#0066CC',
                                }}
                            />
                        </div>
                    }
                    href="#radio-asset"
                />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DifferentAssets.storyName = 'Different assets';

export const ScrollingWithDividers = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar
            aria-label="Scrolling example"
            headerSlot={<Placeholder height={76} />}
            footerSlot={<Placeholder height={76} />}
        >
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" asset={IconBellRegular} href="#notifications" />
            </SidenavSection>
            <SidenavSection title="Account" dividerTop>
                <SidenavItem label="Profile" asset={IconDocumentsRegular} href="#profile" />
                <SidenavItem label="History" asset={IconAlarmClockRegular} href="#history" />
                <SidenavItem label="Settings" asset={IconSettingsRegular} href="#settings" />
            </SidenavSection>
            <SidenavSection title="Help" dividerTop dividerBottom>
                <SidenavItem label="Documentation" asset={IconDocumentsRegular} href="#docs" />
                <SidenavItem label="Support" asset={IconSearchRegular} href="#support" />
            </SidenavSection>
            <SidenavSection title="More" dividerTop dividerBottom>
                <SidenavItem label="Item 1" asset={IconHomeRegular} href="#item1" />
                <SidenavItem label="Item 2" asset={IconFolderRegular} href="#item2" />
                <SidenavItem label="Item 3" asset={IconBellRegular} href="#item3" />
                <SidenavItem label="Item 4" asset={IconSettingsRegular} href="#item4" />
                <SidenavItem label="Item 5" asset={IconDocumentsRegular} href="#item5" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

ScrollingWithDividers.storyName = 'Scrolling with dividers';
