import * as React from 'react';
import {RowList, Row} from '../list';
import {screen, render, within} from '@testing-library/react';
import {
    ButtonPrimary,
    ButtonSecondary,
    Callout,
    DataCard,
    DateField,
    Hero,
    Image,
    HighlightedCard,
    IconShopRegular,
    Meter,
    Placeholder,
    SearchField,
    Stack,
    SuccessFeedbackScreen,
    TextField,
    ThemeContextProvider,
    Tag,
    CoverHero,
    Header,
    MainSectionHeader,
    Drawer,
    MediaCard,
    NakedCard,
} from '..';
import {makeTheme} from './test-utils';

const checkTestIds = (
    content: React.ReactElement,
    elements: ReadonlyArray<{componentName: string; internalTestIds: ReadonlyArray<string>}>
) => {
    render(<ThemeContextProvider theme={makeTheme()}>{content}</ThemeContextProvider>);

    elements.forEach(({componentName, internalTestIds}) => {
        const element = screen.getByTestId(componentName);
        expect(element).toBeInTheDocument();

        internalTestIds.forEach((id) => expect(within(element).getByTestId(id)).toBeInTheDocument());
    });
};

test('Row test ids', () => {
    checkTestIds(
        <RowList>
            <Row
                title="Title"
                headline="Headline"
                subtitle="Subtitle"
                description="Description"
                detail="Detail"
                asset={<IconShopRegular />}
                extra={<Placeholder />}
                right="right"
                href="#"
            />
        </RowList>,
        [
            {
                componentName: 'Row',
                internalTestIds: [
                    'headline',
                    'title',
                    'subtitle',
                    'description',
                    'detail',
                    'asset',
                    'slot',
                    'chevron',
                    'endSlot',
                ],
            },
        ]
    );
});

test('DataCard test ids', () => {
    checkTestIds(
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
        />,
        [
            {
                componentName: 'DataCard',
                internalTestIds: [
                    'headline',
                    'pretitle',
                    'title',
                    'subtitle',
                    'description',
                    'asset',
                    'topActions',
                    'slot',
                ],
            },
        ]
    );
});

test('MediaCard test ids', () => {
    checkTestIds(
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
        />,
        [
            {
                componentName: 'MediaCard',
                internalTestIds: [
                    'headline',
                    'pretitle',
                    'title',
                    'subtitle',
                    'description',
                    'asset',
                    'topActions',
                    'slot',
                    'footer',
                    'image',
                ],
            },
        ]
    );
});

test('NakedCard test ids', () => {
    checkTestIds(
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
        />,
        [
            {
                componentName: 'NakedCard',
                internalTestIds: [
                    'headline',
                    'pretitle',
                    'title',
                    'subtitle',
                    'description',
                    'asset',
                    'topActions',
                    'slot',
                    'footer',
                    'image',
                ],
            },
        ]
    );
});

test('HighlightedCard test ids', () => {
    checkTestIds(<HighlightedCard title="Title" description="Description" imageUrl="https://anyurl.com" />, [
        {
            componentName: 'HighlightedCard',
            internalTestIds: ['title', 'description', 'image'],
        },
    ]);
});

test('FeedbackScreen test ids', () => {
    checkTestIds(
        <SuccessFeedbackScreen
            title="Title"
            description="Description"
            extra={<Placeholder />}
            primaryButton={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
            imageUrl="https://picsum.photos/1200/1200"
        />,
        [
            {
                componentName: 'SuccessFeedbackScreen',
                internalTestIds: ['icon', 'title', 'description', 'image', 'slot'],
            },
        ]
    );
});

test('InputFields test ids', () => {
    checkTestIds(
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
        </Stack>,

        [
            {
                componentName: 'TextField',
                internalTestIds: ['label', 'helperText', 'endHelperText', 'endIcon'],
            },
            {
                componentName: 'SearchField',
                internalTestIds: ['startIcon', 'errorText'],
            },
            // In DateField/MonthField/DatetimeField, we use endIconOverlay for setting the endIcon
            {
                componentName: 'DateField',
                internalTestIds: ['endIcon'],
            },
        ]
    );
});

test('Buttons test ids', () => {
    checkTestIds(
        <Stack space={16}>
            <ButtonPrimary StartIcon={IconShopRegular} EndIcon={IconShopRegular} onPress={() => {}}>
                Action
            </ButtonPrimary>
            <ButtonSecondary loadingText="Loading text" showSpinner onPress={() => {}}>
                Action 2
            </ButtonSecondary>
        </Stack>,
        [
            {
                componentName: 'ButtonPrimary',
                internalTestIds: ['startIcon', 'endIcon'],
            },
            {
                componentName: 'ButtonSecondary',
                internalTestIds: ['loadingText'],
            },
        ]
    );
});

test('Callout test ids', () => {
    checkTestIds(
        <Callout title="Title" description="Description" asset={<IconShopRegular />} onClose={() => {}} />,
        [
            {
                componentName: 'Callout',
                internalTestIds: ['title', 'description', 'asset', 'closeButton'],
            },
        ]
    );
});

test('Hero test ids', () => {
    checkTestIds(
        <Hero
            background="default"
            media={<Image src="https://anyurl.com" />}
            headline={<Tag type="active">tag</Tag>}
            pretitle="pretitle"
            title="title"
            description="description"
            button={<ButtonPrimary fake>button</ButtonPrimary>}
            desktopMediaPosition="right"
            extra={<Placeholder />}
        />,
        [
            {
                componentName: 'Hero',
                internalTestIds: ['headline', 'pretitle', 'title', 'description', 'slot'],
            },
        ]
    );
});

test('CoverHero test ids', () => {
    checkTestIds(
        <CoverHero
            backgroundImage="https://anyurl.com"
            headline={<Tag type="active">tag</Tag>}
            pretitle="pretitle"
            title="title"
            description="description"
            button={<ButtonPrimary fake>button</ButtonPrimary>}
            extra={<Placeholder />}
            sideExtra={<Placeholder />}
        />,
        [
            {
                componentName: 'CoverHero',
                internalTestIds: ['headline', 'pretitle', 'title', 'description', 'slot', 'sideSlot'],
            },
        ]
    );
});

test('Header test ids', () => {
    checkTestIds(
        <Header
            headline={<Tag type="active">tag</Tag>}
            pretitle="pretitle"
            title="title"
            description="description"
        />,
        [
            {
                componentName: 'Header',
                internalTestIds: ['headline', 'pretitle', 'title', 'description'],
            },
        ]
    );
});

test('MainSectionHeader test ids', () => {
    checkTestIds(
        <MainSectionHeader
            title="Title"
            description="Description"
            button={<ButtonPrimary href="asdf">Action</ButtonPrimary>}
        />,
        [
            {
                componentName: 'MainSectionHeader',
                internalTestIds: ['title', 'description'],
            },
        ]
    );
});

test('Meter test ids', () => {
    checkTestIds(<Meter values={[10, 20, 30]} />, [
        {
            componentName: 'Meter',
            internalTestIds: [],
        },
    ]);
});

test('Drawer test ids', () => {
    checkTestIds(<Drawer title="Title" subtitle="Subtitle" description="Description" onClose={() => {}} />, [
        {
            componentName: 'Drawer',
            internalTestIds: ['title', 'subtitle', 'description'],
        },
    ]);
});
