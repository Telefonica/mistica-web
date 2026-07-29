import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../index';
import IconHomeRegular from '../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../generated/mistica-icons/icon-settings-regular';
import IconUserAccountRegular from '../../generated/mistica-icons/icon-user-account-regular';

import type {Variant} from '../../theme-variant-context';

export default {
    title: 'Components/SidenavBar',
    parameters: {fullScreen: true},
};

type Args = {
    label: string;
    variant: Variant;
    boxed: boolean;
    divider: boolean;
    collapsible: boolean;
    defaultCollapsed: boolean;
    doublePanel: boolean;
};

export const Default = ({
    label,
    variant,
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
            boxed={boxed}
            divider={divider}
            collapsible={collapsible}
            defaultCollapsed={defaultCollapsed}
            doublePanel={doublePanel}
        >
            <SidenavSection>
                <SidenavItem label="Home" Icon={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" Icon={IconSearchRegular} href="#search" />
            </SidenavSection>
            <SidenavSection title="Workspace" dividerTop>
                <SidenavItem label="Projects" Icon={IconFolderRegular} defaultOpen>
                    <SidenavItem label="Active" href="#active" />
                    <SidenavItem label="Archived" href="#archived" />
                </SidenavItem>
                <SidenavItem label="Notifications" Icon={IconBellRegular} href="#notifications" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

Default.storyName = 'SidenavBar';

Default.args = {
    label: 'Main navigation',
    variant: 'default',
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
};

export const WithHeaderAndFooter = ({label, variant}: Args): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar
            aria-label={label}
            variant={variant}
            logo={<IconSettingsRegular size={40} />}
            footer={<SidenavItem label="Account" Icon={IconUserAccountRegular} href="#account" />}
        >
            <SidenavSection>
                <SidenavItem label="Home" Icon={IconHomeRegular} href="#home" selected />
                <SidenavItem label="Search" Icon={IconSearchRegular} href="#search" />
            </SidenavSection>
        </SidenavBar>
    </div>
);

WithHeaderAndFooter.storyName = 'SidenavBar with header and footer';

WithHeaderAndFooter.args = {
    label: 'Main navigation',
    variant: 'default',
};

WithHeaderAndFooter.argTypes = {
    variant: {
        options: ['default', 'brand', 'alternative', 'negative', 'media'],
        control: {type: 'select'},
    },
};
