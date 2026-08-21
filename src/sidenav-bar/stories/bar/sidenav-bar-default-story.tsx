'use client';

import * as React from 'react';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconSearchRegular from '../../../generated/mistica-icons/icon-search-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';
import IconBellRegular from '../../../generated/mistica-icons/icon-bell-regular';
import IconSettingsRegular from '../../../generated/mistica-icons/icon-settings-regular';
import IconDocumentsRegular from '../../../generated/mistica-icons/icon-documents-regular';
import IconChevronRightRegular from '../../../generated/mistica-icons/icon-chevron-right-regular';
import {Placeholder} from '../../../placeholder';
import Circle from '../../../circle';
import Badge from '../../../badge';
import {IconButton} from '../../../icon-button';
import {ButtonLink} from '../../../button';
import Box from '../../../box';
import Stack from '../../../stack';
import Inline from '../../../inline';
import {Boxed} from '../../../boxed';
import {UnorderedList, ListItem} from '../../../list';
import {Text2, Text3, Text6} from '../../../text';
import {useScreenSize} from '../../../hooks';
import {vars as skinVars} from '../../../skins/skin-contract.css';
import {SidenavStoryPage} from './sidenav-story-page';

import type {Variant} from '../../../theme-variant-context';
import type {SidenavSection} from '../../sidenav-types';
import type {
    SidenavBarBackgroundColors,
    SidenavCollapseActionRenderProps,
    SidenavLogoRenderProps,
} from '../../sidenav-bar';

const getDefaultSections = (): Array<SidenavSection> => [
    {
        items: [
            {
                id: 'home',
                label: 'Home (href)',
                asset: IconHomeRegular,
                href: '#home',
                onNavigate: () => console.log('Home navigated'),
            },
            {
                id: 'search',
                label: 'Search (onPress)',
                asset: IconSearchRegular,
                onPress: () => console.log('Search clicked'),
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
                        asset: IconDocumentsRegular,
                        href: '#active',
                        onNavigate: () => console.log('Active clicked'),
                    },
                    {
                        id: 'archived',
                        label: 'Archived',
                        asset: IconDocumentsRegular,
                        href: '#archived',
                        onNavigate: () => console.log('Archived clicked'),
                    },
                ],
            },
            {
                id: 'teams',
                label: 'Teams',
                asset: IconFolderRegular,
                children: [
                    {
                        id: 'eng',
                        label: 'Engineering',
                        asset: IconSearchRegular,
                        onPress: () => console.log('Engineering team clicked'),
                    },
                    {
                        id: 'design',
                        label: 'Design',
                        asset: IconSearchRegular,
                        onPress: () => console.log('Design team clicked'),
                    },
                ],
            },
            {
                id: 'notifications',
                label: 'Notifications',
                asset: IconBellRegular,
                href: '#notifications',
                rightSlot: <Badge value={2} />,
                onNavigate: () => console.log('Notifications clicked'),
            },
        ],
    },
    {
        title: 'Account',
        dividerTop: true,
        items: [
            {
                id: 'settings',
                label: 'Settings',
                asset: IconSettingsRegular,
                href: '#settings',
                onNavigate: () => console.log('Settings clicked'),
            },
        ],
    },
];

// A custom collapse action receives the props of the default one, so it keeps the behavior and the
// accessible name. This one also reads `collapsed`: it shows a text link on the expanded sidenav, and an
// icon on the collapsed rail, where a text would not fit.
const renderCustomCollapseAction = ({
    collapsed,
    onPress,
    'aria-label': ariaLabel,
}: SidenavCollapseActionRenderProps): React.ReactNode =>
    collapsed ? (
        <IconButton
            Icon={IconChevronRightRegular}
            type="neutral"
            backgroundType="transparent"
            small
            onPress={onPress}
            aria-label={ariaLabel}
        />
    ) : (
        <ButtonLink small bleedY onPress={onPress} aria-label={ariaLabel}>
            Hide
        </ButtonLink>
    );

// The logo slot takes an element, and a function when that element must follow the collapsed state, even
// though the default logo keeps the isotype in both states. This one is the mark of a product,
// built with Mistica components: the rail shows the mark alone, because it clamps the width of the logo to
// 32px, and the expanded sidenav adds the name of the product beside it.
const productMark = (
    <Circle size={32} backgroundColor={skinVars.colors.brand}>
        <Text2 medium color={skinVars.colors.textPrimaryInverse}>
            M
        </Text2>
    </Circle>
);

const renderCustomLogo = ({collapsed}: SidenavLogoRenderProps): React.ReactNode =>
    collapsed ? (
        productMark
    ) : (
        <Inline space={8} alignItems="center">
            {productMark}
            <Text3 medium>Console</Text3>
        </Inline>
    );

type Args = {
    label: string;
    variant: Variant;
    logo: boolean;
    customLogo: boolean;
    headerSlot: boolean;
    footerSlot: boolean;
    fixedFooter: boolean;
    boxed: boolean;
    divider: boolean;
    collapsible: boolean;
    customCollapseAction: boolean;
    defaultCollapsed: boolean;
    doublePanel: boolean;
    width: number;
    'Colors/Enabled'?: boolean;
    'Colors/Header'?: string;
    'Colors/Body'?: string;
    'Colors/Footer'?: string;
};

export const Default = ({
    label,
    variant,
    logo,
    customLogo,
    headerSlot,
    footerSlot,
    fixedFooter,
    boxed,
    divider,
    collapsible,
    customCollapseAction,
    defaultCollapsed,
    doublePanel,
    width,
    'Colors/Enabled': colorsEnabled,
    'Colors/Header': headerColor,
    'Colors/Body': bodyColor,
    'Colors/Footer': footerColor,
}: Args): React.JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();
    const background: SidenavBarBackgroundColors = colorsEnabled
        ? {
              header: headerColor as any,
              body: bodyColor as any,
              footer: footerColor as any,
          }
        : {};

    const sections: Array<SidenavSection> = getDefaultSections();

    // The mobile top bar holds the header slot, and it is 56px tall, so the slot of that breakpoint takes
    // the size of an action of a navigation bar. The expanded sidenav has a whole row for it instead.
    const headerSlotContent = isTabletOrSmaller ? (
        <Placeholder height={32} width={72} />
    ) : (
        <Placeholder height={76} />
    );

    return (
        <SidenavStoryPage
            sidenav={
                <SidenavBar
                    {...({
                        'aria-label': label,
                        variant,
                        logo: logo && customLogo ? renderCustomLogo : logo,
                        headerSlot: headerSlot ? headerSlotContent : undefined,
                        footerSlot: footerSlot ? <Placeholder height={76} /> : undefined,
                        fixedFooter,
                        boxed,
                        divider,
                        collapsible,
                        renderCollapseAction: customCollapseAction ? renderCustomCollapseAction : undefined,
                        defaultCollapsed,
                        doublePanel,
                        width,
                        sections,
                        background,
                    } as any)}
                />
            }
        >
            <Box padding={32}>
                <Stack space={24}>
                    <Stack space={8}>
                        <Text6 as="h1">SidenavItem props showcase</Text6>
                        <Text3 regular>
                            Press the items of the sidenav to see each type of prop in action.
                        </Text3>
                    </Stack>

                    <Boxed>
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="prop-types">
                                    Types of props of a SidenavItem
                                </Text3>
                                <Text2 as="div" regular color={skinVars.colors.textSecondary}>
                                    <UnorderedList aria-labelledby="prop-types">
                                        <ListItem>
                                            href navigates with a hyperlink, and it takes an optional
                                            onNavigate callback. See &quot;Home (href)&quot;.
                                        </ListItem>
                                        <ListItem>
                                            onPress runs a custom action. See &quot;Search (onPress)&quot;.
                                        </ListItem>
                                        <ListItem>
                                            children makes the item expandable. See &quot;Projects&quot; and
                                            &quot;Teams&quot;. Such an item takes neither href nor onPress.
                                        </ListItem>
                                        <ListItem>
                                            rightSlot adds custom content on the right side. See the badge of
                                            &quot;Notifications&quot;.
                                        </ListItem>
                                    </UnorderedList>
                                </Text2>
                            </Stack>
                        </Box>
                    </Boxed>

                    <Boxed variant="alternative">
                        <Box padding={24}>
                            <Stack space={16}>
                                <Text3 medium as="h2" id="key-features">
                                    Key features
                                </Text3>
                                <Text2 as="div" regular>
                                    <UnorderedList aria-labelledby="key-features">
                                        <ListItem>
                                            A first level item either expands its children, or navigates with
                                            href, to, or onPress.
                                        </ListItem>
                                        <ListItem>
                                            A child item takes no children, so the tree holds two levels.
                                        </ListItem>
                                        <ListItem>The onNavigate callback runs for href and for to.</ListItem>
                                        <ListItem>
                                            The label of an item says which prop it uses, either
                                            &quot;(href)&quot; or &quot;(onPress)&quot;.
                                        </ListItem>
                                        <ListItem>
                                            The header shows a collapse action by default. Turn on the
                                            customCollapseAction control to paint that action with
                                            renderCollapseAction, which receives the collapsed state, the
                                            press handler, and the accessible name.
                                        </ListItem>
                                        <ListItem>
                                            The header shows the logo of the skin by default: the isotype on
                                            both the expanded sidenav and the collapsed rail. The logo prop
                                            also takes an element of your own, or a function that receives the
                                            collapsed state and returns one logo for each state. Turn on the
                                            customLogo control to see that function, and turn the logo control
                                            off to hide the slot.
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

Default.storyName = 'SidenavBar';

export default {
    title: 'Components/SidenavBar/Bar',
    component: SidenavBar,
    parameters: {
        fullScreen: true,
        docs: {
            source: {state: 'open'},
        },
        controls: {
            expanded: false,
        },
    },
    tags: ['autodocs'],
    args: {
        label: 'Main navigation',
        variant: 'default',
        logo: true,
        customLogo: false,
        headerSlot: true,
        footerSlot: true,
        fixedFooter: false,
        boxed: false,
        divider: true,
        collapsible: true,
        customCollapseAction: false,
        defaultCollapsed: false,
        doublePanel: false,
        width: 240,
        'Colors/Enabled': false,
        'Colors/Header': '#ffffff',
        'Colors/Body': '#f5f5f5',
        'Colors/Footer': '#ffffff',
    },
    argTypes: {
        label: {
            control: {type: 'text'},
        },
        variant: {
            options: ['default', 'brand', 'alternative', 'negative', 'media'],
            control: {type: 'select'},
        },
        logo: {
            control: {type: 'boolean'},
            // The prop takes an element or a boolean, and Storybook drops a control value that does not
            // match the type it reads from that union. The story declares the type of its own arg instead.
            type: {name: 'boolean'},
            description:
                'The logo of the skin: the isotype on both the expanded sidenav and the collapsed rail. It also takes an element of your own, or a function of the collapsed state.',
        },
        customLogo: {
            control: {type: 'boolean'},
            description:
                'Puts a logo of your own in the slot with a function of the collapsed state: the mark of a product alone on the rail, and the mark with the name of the product on the expanded sidenav.',
            if: {arg: 'logo', truthy: true},
        },
        headerSlot: {
            control: {type: 'boolean'},
        },
        footerSlot: {
            control: {type: 'boolean'},
        },
        fixedFooter: {
            control: {type: 'boolean'},
            if: {arg: 'footerSlot', truthy: true},
        },
        boxed: {
            control: {type: 'boolean'},
        },
        divider: {
            if: {arg: 'boxed', truthy: false},
        },
        collapsible: {
            control: {type: 'boolean'},
        },
        customCollapseAction: {
            control: {type: 'boolean'},
            description:
                'Paints the collapse action with renderCollapseAction: a text link on the expanded sidenav, and an icon on the collapsed rail.',
            if: {arg: 'collapsible', truthy: true},
        },
        defaultCollapsed: {
            control: {type: 'boolean'},
            description:
                'Initial collapsed state. It seeds the state of a collapsible sidenav, so a later change of this control moves the sidenav only when collapsible is off.',
        },
        doublePanel: {
            control: {type: 'boolean'},
        },
        width: {
            control: {type: 'range', min: 200, max: 400, step: 5},
        },
        'Colors/Enabled': {
            control: {type: 'boolean'},
            table: {category: 'Colors'},
        },
        'Colors/Header': {
            control: {type: 'color'},
            description: 'Header background color (must be opaque)',
            table: {category: 'Colors'},
        },
        'Colors/Body': {
            control: {type: 'color'},
            description: 'Body background color (can be any color)',
            table: {category: 'Colors'},
        },
        'Colors/Footer': {
            control: {type: 'color'},
            description: 'Footer background color (must be opaque)',
            table: {category: 'Colors'},
        },
    },
};
