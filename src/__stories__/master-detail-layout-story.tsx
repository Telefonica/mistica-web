import * as React from 'react';
import {
    MasterDetailLayout,
    RowList,
    Row,
    NegativeBox,
    Box,
    Stack,
    SectionTitle,
    ButtonPrimary,
    IconCreditCardVisaRegular,
    IconInformationUserRegular,
    IconLockClosedRegular,
    IconProgramAlarmRegular,
    IconSupportAgentRegular,
    IconUserAccountRegular,
    Text4,
    Text2,
    Placeholder,
} from '..';

export default {
    title: 'Components/Layouts/MasterDetailLayout',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
    const settings = [
        {
            categoryName: 'Personal information',
            settings: [
                {title: 'Personal details', icon: <IconUserAccountRegular />},
                {title: 'Security', icon: <IconLockClosedRegular />},
                {title: 'Payment methods', icon: <IconCreditCardVisaRegular />},
            ],
        },
        {
            categoryName: 'Configuration',
            settings: [
                {title: 'Notifications', icon: <IconProgramAlarmRegular />},
                {title: 'FAQs', icon: <IconSupportAgentRegular />},
                {title: 'About', icon: <IconInformationUserRegular />},
            ],
        },
    ];
    return (
        <Box paddingY={24}>
            <MasterDetailLayout
                isOpen={!!selectedItem}
                master={
                    <Stack space={32}>
                        {settings.map((category) => (
                            <Stack key={category.categoryName} space={8}>
                                <SectionTitle>{category.categoryName}</SectionTitle>
                                <NegativeBox>
                                    <RowList>
                                        {category.settings.map((setting) => (
                                            <Row
                                                key={setting.title}
                                                title={setting.title}
                                                icon={setting.icon}
                                                iconSize={24}
                                                onPress={() => {
                                                    setSelectedItem(setting.title);
                                                }}
                                            />
                                        ))}
                                    </RowList>
                                </NegativeBox>
                            </Stack>
                        ))}
                    </Stack>
                }
                detail={
                    selectedItem ? (
                        <Stack space={16}>
                            <Text4 as="h2" medium>
                                {selectedItem}
                            </Text4>
                            <Text2 regular>You are inside {selectedItem} section</Text2>
                            <Placeholder />
                            <ButtonPrimary
                                small
                                onPress={() => {
                                    setSelectedItem(null);
                                }}
                            >
                                Close
                            </ButtonPrimary>
                        </Stack>
                    ) : (
                        <Text2 regular>Select one of the sections from the sidebar</Text2>
                    )
                }
            />
        </Box>
    );
};

Default.storyName = 'MasterDetailLayout';
