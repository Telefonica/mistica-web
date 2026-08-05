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
    useCustomWidth: boolean;
    width: number;
    useCustomBackgrounds: boolean;
    headerBackgroundColor: string;
    bodyBackgroundColor: string;
    footerBackgroundColor: string;
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
    useCustomWidth,
    width,
    useCustomBackgrounds,
    headerBackgroundColor,
    bodyBackgroundColor,
    footerBackgroundColor,
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
            {...(useCustomWidth ? {width} : ({} as any))}
            {...(useCustomBackgrounds
                ? {
                      background: {
                          header: headerBackgroundColor as any,
                          body: bodyBackgroundColor,
                          footer: footerBackgroundColor as any,
                      },
                  }
                : {})}
        >
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" asset={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" asset={IconDocumentsRegular} href="#active" />
                    <SidenavItem label="Archived" asset={IconDocumentsRegular} href="#archived" />
                    <SidenavItem label="Draft" href="#draft" />
                    <SidenavItem label="In Review" asset={IconDocumentsRegular} href="#review" />
                </SidenavItem>
                <SidenavItem label="Teams" asset={IconFolderRegular}>
                    <SidenavItem label="Engineering" asset={IconSearchRegular} href="#eng" />
                    <SidenavItem label="Design" asset={IconSearchRegular} href="#design" />
                    <SidenavItem label="Marketing" asset={IconSearchRegular} href="#marketing" />
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
    useCustomWidth: false,
    width: 240,
    useCustomBackgrounds: false,
    headerBackgroundColor: '#e8f4f8',
    bodyBackgroundColor: '#fafafa',
    footerBackgroundColor: '#f0e8f4',
};

Default.argTypes = {
    variant: {
        options: ['default', 'brand', 'alternative', 'negative', 'media'],
        control: {type: 'select'},
    },
    divider: {if: {arg: 'boxed', truthy: false}},
    fixedFooter: {if: {arg: 'footerSlot', truthy: true}},
    useCustomWidth: {
        control: {type: 'boolean'},
        description: 'Use custom width instead of default',
    },
    width: {
        control: {type: 'range', min: 200, max: 400, step: 5},
        description: 'Width of the sidenav in pixels (only when useCustomWidth is enabled)',
    },
    useCustomBackgrounds: {
        control: {type: 'boolean'},
        description: 'Override background colors for each region',
    },
    headerBackgroundColor: {
        control: {type: 'color'},
        description: 'Background color for header (must be opaque)',
        if: {arg: 'useCustomBackgrounds', truthy: true},
    },
    bodyBackgroundColor: {
        control: {type: 'color'},
        description: 'Background color for body (can be any color including transparent)',
        if: {arg: 'useCustomBackgrounds', truthy: true},
    },
    footerBackgroundColor: {
        control: {type: 'color'},
        description: 'Background color for footer (must be opaque)',
        if: {arg: 'useCustomBackgrounds', truthy: true},
    },
};

export const DeepNesting = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Nested items example">
            <SidenavSection>
                <SidenavItem label="Home" asset={IconHomeRegular} href="#home" selected />
            </SidenavSection>
            <SidenavSection title="Navigation" dividerTop>
                <SidenavItem label="Products" asset={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Web App" asset={IconDocumentsRegular} href="#web" />
                    <SidenavItem label="Mobile App" asset={IconDocumentsRegular} href="#mobile" />
                    <SidenavItem label="Desktop App" asset={IconDocumentsRegular} href="#desktop" />
                    <SidenavItem label="API Docs" href="#api" />
                </SidenavItem>
                <SidenavItem label="Resources" asset={IconFolderRegular}>
                    <SidenavItem label="Documentation" asset={IconDocumentsRegular} href="#docs" />
                    <SidenavItem label="Examples" asset={IconSearchRegular} href="#examples" />
                    <SidenavItem label="FAQ" href="#faq" />
                </SidenavItem>
                <SidenavItem label="Other" asset={IconSearchRegular} href="#other" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DeepNesting.storyName = 'Nested items';

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
