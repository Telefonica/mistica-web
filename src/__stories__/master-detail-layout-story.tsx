import * as React from 'react';
import {
    MasterDetailLayout,
    RowList,
    Row,
    NegativeBox,
    Box,
    Stack,
    Title1,
    ButtonPrimary,
    IconCreditCardVisaRegular,
    IconInformationUserRegular,
    IconLockClosedRegular,
    IconBellProgramRegular,
    IconSupportAgentRegular,
    IconUserAccountRegular,
    Text4,
    Text2,
    Placeholder,
} from '..';

export default {
    title: 'Layout/Master detail layout',
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
                {title: 'Notifications', icon: <IconBellProgramRegular />},
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
                                <Title1>{category.categoryName}</Title1>
                                <NegativeBox>
                                    <RowList>
                                        {category.settings.map((setting) => (
                                            <Row
                                                key={setting.title}
                                                title={setting.title}
                                                asset={setting.icon}
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

Default.storyName = 'Master detail layout';
