import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../index';
import IconHomeRegular from '../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../generated/mistica-icons/icon-bell-regular';
import {Placeholder} from '../../placeholder';

import type {Variant} from '../../theme-variant-context';

export default {
    title: 'Components/SidenavBar',
    parameters: {fullScreen: true},
};

type Args = {
    label: string;
    variant: Variant;
    logo: boolean;
    headerSlot: boolean;
    footerSlot: boolean;
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
            {...(boxed ? ({boxed: true} as const) : ({boxed: false, divider} as const))}
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
    logo: true,
    headerSlot: true,
    footerSlot: true,
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
    // A boxed sidenav has its own edge, so `divider` is not part of its props.
    divider: {if: {arg: 'boxed', truthy: false}},
};
