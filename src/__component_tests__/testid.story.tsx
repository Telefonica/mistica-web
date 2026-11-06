import * as React from 'react';
import {RowList, Row} from '../list';
import {
    ButtonPrimary,
    ButtonSecondary,
    Callout,
    DataCard,
    DateField,
    Hero,
    Image,
    IconShopRegular,
    Meter,
    Placeholder,
    SearchField,
    Stack,
    SuccessFeedbackScreen,
    TextField,
    Tag,
    CoverHero,
    Header,
    MainSectionHeader,
    Drawer,
    MediaCard,
    NakedCard,
} from '..';

export const Scenario1 = (): JSX.Element => (
    <RowList>
        <Row
            title="Title"
            headline="Headline"
            subtitle="Subtitle"
            description="Description"
            detail="Detail"
            asset={<IconShopRegular />}
            slot={<Placeholder />}
            right="right"
            href="#"
        />
    </RowList>
);
export const Scenario2 = (): JSX.Element => (
    <DataCard
        headline="Headline"
        pretitle="Pretitle"
        title="Title"
        subtitle="Subtitle"
        description="Description"
        slot={<Placeholder />}
        asset={<IconShopRegular />}
        topActions={[
            {
                Icon: IconShopRegular,
                onPress: () => {},
                label: 'Lightning',
            },
        ]}
    />
);
export const Scenario3 = (): JSX.Element => (
    <MediaCard
        headline="Headline"
        pretitle="Pretitle"
        title="Title"
        subtitle="Subtitle"
        description="Description"
        slot={<Placeholder />}
        asset={<IconShopRegular />}
        topActions={[
            {
                Icon: IconShopRegular,
                onPress: () => {},
                label: 'Lightning',
            },
        ]}
        imageSrc="https://picsum.photos/1200/1200"
        showFooter
        buttonPrimary={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
    />
);
export const Scenario4 = (): JSX.Element => (
    <NakedCard
        headline="Headline"
        pretitle="Pretitle"
        title="Title"
        subtitle="Subtitle"
        description="Description"
        slot={<Placeholder />}
        asset={<IconShopRegular />}
        topActions={[
            {
                Icon: IconShopRegular,
                onPress: () => {},
                label: 'Lightning',
            },
        ]}
        imageSrc="https://picsum.photos/1200/1200"
        showFooter
        buttonPrimary={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
    />
);
export const Scenario5 = (): JSX.Element => (
    <SuccessFeedbackScreen
        title="Title"
        description="Description"
        slot={<Placeholder />}
        primaryButton={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
        imageUrl="https://picsum.photos/1200/1200"
    />
);
export const Scenario6 = (): JSX.Element => (
    <Stack space={16}>
        <TextField
            name="textField"
            label="Label 1"
            helperText="Helper"
            multiline
            maxLength={200}
            endIcon={<IconShopRegular />}
        />
        <SearchField name="searchField" label="Label 2" helperText="helperText" error />
        <DateField name="dateField" label="Label 3" />
    </Stack>
);
export const Scenario7 = (): JSX.Element => (
    <Stack space={16}>
        <ButtonPrimary StartIcon={IconShopRegular} EndIcon={IconShopRegular} onPress={() => {}}>
            Action
        </ButtonPrimary>
        <ButtonSecondary loadingText="Loading text" showSpinner onPress={() => {}}>
            Action 2
        </ButtonSecondary>
    </Stack>
);
export const Scenario8 = (): JSX.Element => (
    <Callout title="Title" description="Description" asset={<IconShopRegular />} onClose={() => {}} />
);
export const Scenario9 = (): JSX.Element => (
    <Hero
        background="default"
        media={<Image src="https://anyurl.com" />}
        headline={<Tag type="active">tag</Tag>}
        pretitle="pretitle"
        title="title"
        description="description"
        button={<ButtonPrimary fake>button</ButtonPrimary>}
        desktopMediaPosition="right"
        slot={<Placeholder />}
    />
);
export const Scenario10 = (): JSX.Element => (
    <CoverHero
        backgroundImage="https://anyurl.com"
        headline={<Tag type="active">tag</Tag>}
        pretitle="pretitle"
        title="title"
        description="description"
        button={<ButtonPrimary fake>button</ButtonPrimary>}
        slot={<Placeholder />}
        sideSlot={<Placeholder />}
    />
);
export const Scenario11 = (): JSX.Element => (
    <Header
        headline={<Tag type="active">tag</Tag>}
        pretitle="pretitle"
        title="title"
        description="description"
    />
);
export const Scenario12 = (): JSX.Element => (
    <MainSectionHeader
        title="Title"
        description="Description"
        button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
    />
);
export const Scenario13 = (): JSX.Element => <Meter values={[10, 20, 30]} />;
export const Scenario14 = (): JSX.Element => (
    <Drawer title="Title" subtitle="Subtitle" description="Description" onClose={() => {}} />
);
