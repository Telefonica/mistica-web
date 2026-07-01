import * as React from 'react';
import {
    Avatar,
    IconBellRegular,
    IconEyeRegular,
    IconExportRegular,
    IconListRegular,
    IconSettingsRegular,
    SideNavigation,
    SideNavigationItem,
    SideNavigationSection,
    Text2,
} from '../../..';

const SideNavigationTest = (): JSX.Element => (
    <SideNavigation
        logo={<Text2 medium>Movistar</Text2>}
        header={
            <SideNavigationItem
                label="Movistar Spain"
                asset={<Avatar size={24} initials="ES" />}
                onPress={() => {}}
            />
        }
        footer={
            <>
                <SideNavigationItem label="Configurable pages" Icon={IconExportRegular} onPress={() => {}} />
                <SideNavigationItem
                    label="User profile"
                    asset={<Avatar size={24} initials="JL" />}
                    onPress={() => {}}
                />
            </>
        }
    >
        <SideNavigationSection label="Explore" Icon={IconEyeRegular} defaultOpen>
            <SideNavigationItem label="Overview" onPress={() => {}} />
            <SideNavigationItem label="Reports" onPress={() => {}} />
        </SideNavigationSection>
        <SideNavigationItem label="Dynamic Content" Icon={IconSettingsRegular} onPress={() => {}} />
        <SideNavigationItem label="Entrypoint List" Icon={IconListRegular} selected href="#" />
        <SideNavigationItem label="Alerts" Icon={IconBellRegular} onPress={() => {}} />
    </SideNavigation>
);

export default SideNavigationTest;
