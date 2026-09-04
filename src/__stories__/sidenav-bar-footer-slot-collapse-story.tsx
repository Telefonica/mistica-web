'use client';

import * as React from 'react';
import {SidenavBar} from '..';
import IconHomeRegular from '../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../generated/mistica-icons/icon-folder-regular';
import IconDocumentsRegular from '../generated/mistica-icons/icon-documents-regular';
import IconBellRegular from '../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../generated/mistica-icons/icon-settings-regular';
import IconPanelCollapseRegular from '../generated/mistica-icons/icon-panel-collapse-regular';
import IconPanelExpandRegular from '../generated/mistica-icons/icon-panel-expand-regular';
import Box from '../box';
import Stack from '../stack';
import {ButtonSecondary} from '../button';
import {IconButton} from '../icon-button';
import {Boxed} from '../boxed';
import {UnorderedList, ListItem} from '../list';
import {Text2, Text3, Text5, Text6} from '../text';
import {useScreenSize} from '../hooks';
import {vars as skinVars} from '../skins/skin-contract.css';
import {SidenavStoryPage} from './sidenav-bar-story-page';

import type {SidenavEntry} from '../sidenav-bar-types';

type Args = {
    showDefaultCollapseAction: boolean;
    boxed: boolean;
};

const sections: Array<SidenavEntry> = [
    {
        id: 'overview',
        label: 'Overview',
        asset: IconHomeRegular,
        href: '#overview',
    },
    {
        title: 'Activities',
        dividerTop: true,
        items: [
            {
                id: 'water-sports',
                label: 'Water sports',
                asset: IconFolderRegular,
                children: [
                    {
                        id: 'water-sailing',
                        label: 'Sailing',
                        asset: IconDocumentsRegular,
                        href: '#water-sailing',
                    },
                    {
                        id: 'water-kayak',
                        label: 'Kayaking',
                        asset: IconDocumentsRegular,
                        href: '#water-kayak',
                    },
                ],
            },
            {
                id: 'climbing',
                label: 'Rock climbing',
                asset: IconBellRegular,
                href: '#climbing',
            },
        ],
    },
    {
        id: 'settings',
        label: 'Settings',
        asset: IconSettingsRegular,
        href: '#settings',
    },
];

export const FooterSlotCollapseControl = ({showDefaultCollapseAction, boxed}: Args): React.JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const [collapsed, setCollapsed] = React.useState(false);
    const [selectedItemId, setSelectedItemId] = React.useState<string | null>('overview');

    const footerSlot = collapsed ? (
        <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'column'}}>
            <Text2 as="p" regular>
                This button has been rendered within the slot
            </Text2>
            <IconButton
                Icon={IconPanelExpandRegular}
                type="neutral"
                backgroundType="soft"
                small
                onPress={() => setCollapsed(false)}
                aria-label="Expand"
            />
        </div>
    ) : (
        <>
            <Text2 as="p" regular>
                This button has been rendered within the slot
            </Text2>
            <ButtonSecondary small StartIcon={IconPanelCollapseRegular} onPress={() => setCollapsed(true)}>
                Collapse
            </ButtonSecondary>
        </>
    );

    return (
        <SidenavStoryPage
            sidenav={
                <SidenavBar
                    aria-label="Alto Garda activities"
                    sections={sections}
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    renderCollapseAction={showDefaultCollapseAction ? undefined : () => null}
                    // The mobile sidenav is a top bar, and it never collapses, so a control that writes the
                    // collapsed state has no meaning there.
                    footerSlot={isTabletOrSmaller ? undefined : footerSlot}
                    selectedItemId={selectedItemId}
                    onSelectedItemIdChange={setSelectedItemId}
                    {...(boxed ? {boxed: true as const} : {boxed: false as const})}
                />
            }
        >
            <Box padding={32}>
                <Stack space={24}>
                    <Stack space={8}>
                        <Text6 as="h1">Collapse control in the footer slot</Text6>
                        <Text3 regular>
                            The page holds the collapsed state and passes it to the sidenav with the collapsed
                            prop. The button of the footer slot writes that state.
                        </Text3>
                    </Stack>

                    <Boxed>
                        <Box padding={24}>
                            <Stack space={16}>
                                <Stack space={8}>
                                    <Text2 medium color={skinVars.colors.textSecondary}>
                                        Value of the collapsed prop
                                    </Text2>
                                    <Text5>{String(collapsed)}</Text5>
                                </Stack>
                                <ButtonSecondary small onPress={() => setCollapsed(!collapsed)}>
                                    {collapsed ? 'Expand from the page' : 'Collapse from the page'}
                                </ButtonSecondary>
                            </Stack>
                        </Box>
                    </Boxed>

                    <Boxed>
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="how-to-test">
                                    How to test
                                </Text3>
                                <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                    <UnorderedList aria-labelledby="how-to-test">
                                        <ListItem>
                                            Press the Collapse button in the footer of the sidenav. The
                                            sidenav becomes a rail, and the readout above shows true.
                                        </ListItem>
                                        <ListItem>
                                            Press the icon button of the rail. The sidenav expands again.
                                        </ListItem>
                                        <ListItem>
                                            Press the button of the page. Both controls write the same state,
                                            so the sidenav follows either of them.
                                        </ListItem>
                                        <ListItem>
                                            Turn on the showDefaultCollapseAction control. The header then
                                            shows the default action next to the logo, and both actions move
                                            the same state.
                                        </ListItem>
                                    </UnorderedList>
                                </Text2>
                            </Stack>
                        </Box>
                    </Boxed>
                </Stack>
            </Box>
        </SidenavStoryPage>
    );
};

FooterSlotCollapseControl.storyName = 'Collapse control in the footer slot';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
        controls: {expanded: true},
    },
    args: {
        showDefaultCollapseAction: false,
        boxed: false,
    },
    argTypes: {
        showDefaultCollapseAction: {
            control: {type: 'boolean'},
            description:
                'Keeps the default collapse action of the header. When it is off, renderCollapseAction hides that action, and only the button of the footer slot collapses the sidenav.',
        },
        boxed: {
            control: {type: 'boolean'},
            description: 'Renders the sidenav as a floating box, with its own edge instead of a divider.',
        },
    },
};
