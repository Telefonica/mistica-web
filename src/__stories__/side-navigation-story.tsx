import * as React from 'react';
import {
    Avatar,
    Box,
    IconBellRegular,
    IconChevronLeftRegular,
    IconEyeRegular,
    IconExportRegular,
    IconFolderRegular,
    IconListRegular,
    IconLoudspeakerRegular,
    IconSettingsRegular,
    IconStarRegular,
    Logo,
    SideNavigation,
    SideNavigationItem,
    SideNavigationSection,
    skinVars,
} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Navigation bars/SideNavigation',
    component: SideNavigation,
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    collapsed: boolean;
    logo: boolean;
    header: boolean;
    footer: boolean;
    selectedItem: 'explore' | 'entrypoint' | 'alerts';
    sectionOpen: boolean;
};

const Flag = ({label}: {label: string}): JSX.Element => (
    <span
        aria-label={label}
        role="img"
        style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: skinVars.colors.brandLow,
            fontSize: 14,
        }}
    >
        ES
    </span>
);

export const Default: StoryComponent<Args> = ({
    collapsed,
    logo,
    header,
    footer,
    selectedItem,
    sectionOpen,
}) => {
    const [isSectionOpen, setIsSectionOpen] = React.useState(sectionOpen);

    React.useEffect(() => {
        setIsSectionOpen(sectionOpen);
    }, [sectionOpen]);

    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            <SideNavigation
                collapsed={collapsed}
                dataAttributes={{testid: 'side-navigation'}}
                logo={
                    logo ? (
                        <Logo size={collapsed ? 32 : 80} type={collapsed ? 'isotype' : 'imagotype'} />
                    ) : undefined
                }
                header={
                    header ? (
                        <SideNavigationItem
                            label="Movistar Spain"
                            asset={<Flag label="Spain" />}
                            right={<IconChevronLeftRegular size={16} />}
                            onPress={() => {}}
                        />
                    ) : undefined
                }
                footer={
                    footer ? (
                        <>
                            <SideNavigationItem label="Commons" Icon={IconListRegular} onPress={() => {}} />
                            <SideNavigationItem
                                label="Configurable pages"
                                Icon={IconExportRegular}
                                onPress={() => {}}
                            />
                            <SideNavigationItem
                                label="Juan José López Serrano"
                                asset={<Avatar size={24} src={avatarImg} />}
                                onPress={() => {}}
                            />
                        </>
                    ) : undefined
                }
            >
                <SideNavigationSection
                    label="Explore"
                    Icon={IconEyeRegular}
                    open={isSectionOpen}
                    onChange={setIsSectionOpen}
                    selected={selectedItem === 'explore'}
                >
                    <SideNavigationItem label="Overview" onPress={() => {}} />
                    <SideNavigationItem label="Reports" onPress={() => {}} />
                </SideNavigationSection>
                <SideNavigationSection label="CommsTool" Icon={IconLoudspeakerRegular}>
                    <SideNavigationItem label="Campaigns" onPress={() => {}} />
                </SideNavigationSection>
                <SideNavigationItem label="Dynamic Content" Icon={IconSettingsRegular} onPress={() => {}} />
                <SideNavigationItem label="Movistar Likes" Icon={IconStarRegular} onPress={() => {}} />
                <SideNavigationItem
                    label="Entrypoint List"
                    Icon={IconListRegular}
                    selected={selectedItem === 'entrypoint'}
                    href="#"
                />
                <SideNavigationItem label="Extras" Icon={IconFolderRegular} onPress={() => {}} />
                <SideNavigationItem
                    label="Alerts"
                    Icon={IconBellRegular}
                    selected={selectedItem === 'alerts'}
                    onPress={() => {}}
                />
            </SideNavigation>
            <Box padding={32}>
                <div style={{width: 800, height: 560, background: skinVars.colors.backgroundAlternative}} />
            </Box>
        </div>
    );
};

Default.storyName = 'SideNavigation';
Default.args = {
    collapsed: false,
    logo: true,
    header: true,
    footer: true,
    selectedItem: 'entrypoint',
    sectionOpen: false,
};

Default.argTypes = {
    selectedItem: {
        options: ['explore', 'entrypoint', 'alerts'],
        control: {type: 'select'},
    },
};
