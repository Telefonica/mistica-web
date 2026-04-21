'use client';
import '@telefonica/mistica/css/mistica.css';
import * as React from 'react';
import {
    ThemeContextProvider,
    getMovistarNewSkin,
    skinVars,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    CoverHero,
    Carousel,
    CoverCard,
    Tag,
    ResponsiveLayout,
    Box,
    Stack,
    Title1,
    Text2,
    ButtonPrimary,
    ButtonSecondary,
    EmptyState,
    Avatar,
    IconSearchRegular,
} from '@telefonica/mistica';

const theme = {
    skin: getMovistarNewSkin(),
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'US'},
};

const NAV_SECTIONS = ['Home', 'Movies', 'Series', 'Kids', 'My List'];

type ContentItem = {
    id: number;
    title: string;
    tag?: 'new' | 'top';
    seed: number;
};

const trendingNow: ContentItem[] = [
    {id: 1, title: 'Dark Matter', tag: 'new', seed: 11},
    {id: 2, title: 'The Crown', tag: 'top', seed: 22},
    {id: 3, title: 'Stranger Things', seed: 33},
    {id: 4, title: 'Wednesday', tag: 'new', seed: 44},
    {id: 5, title: 'Ozark', tag: 'top', seed: 55},
    {id: 6, title: 'Squid Game', seed: 66},
];

const topRated: ContentItem[] = [
    {id: 7, title: 'Breaking Bad', tag: 'top', seed: 77},
    {id: 8, title: 'Better Call Saul', tag: 'top', seed: 88},
    {id: 9, title: 'The Bear', tag: 'new', seed: 99},
    {id: 10, title: 'Succession', seed: 110},
    {id: 11, title: 'The Last of Us', tag: 'top', seed: 121},
    {id: 12, title: 'House of the Dragon', tag: 'new', seed: 132},
];

const newReleases: ContentItem[] = [
    {id: 13, title: 'Fallout', tag: 'new', seed: 143},
    {id: 14, title: 'Shogun', tag: 'new', seed: 154},
    {id: 15, title: 'The Gentlemen', tag: 'new', seed: 165},
    {id: 16, title: 'Baby Reindeer', tag: 'new', seed: 176},
    {id: 17, title: 'Ripley', tag: 'new', seed: 187},
    {id: 18, title: 'Three-Body Problem', tag: 'new', seed: 198},
];

const myListSaved: ContentItem[] = [
    {id: 19, title: 'Dark Matter', tag: 'new', seed: 11},
    {id: 20, title: 'The Bear', tag: 'new', seed: 99},
    {id: 21, title: 'Fallout', tag: 'new', seed: 143},
];

const getCardHeadline = (item: ContentItem): React.ReactElement | undefined => {
    if (item.tag === 'new') return <Tag type="promo">NEW</Tag>;
    if (item.tag === 'top') return <Tag type="active">TOP</Tag>;
    return undefined;
};

const ContentRow = ({title, items}: {title: string; items: ContentItem[]}) => (
    <Stack space={16}>
        <Title1 as="h2">{title}</Title1>
        <Carousel
            itemsPerPage={{mobile: 2, tablet: 3, desktop: 5}}
            items={items.map((item) => (
                <CoverCard
                    key={item.id}
                    imageSrc={`https://picsum.photos/seed/${item.seed}/400/600`}
                    headline={getCardHeadline(item)}
                    title={item.title}
                    onPress={() => {}}
                    aria-label={`Watch ${item.title}`}
                />
            ))}
        />
    </Stack>
);

const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Movistar Sans', 'Helvetica', 'Arial', sans-serif;
            background-color: ${skinVars.colors.background};
            margin: 0;
        }
    `}</style>
);

const StreamingHomePageContent = () => {
    const [activeSection, setActiveSection] = React.useState(0);
    const [myListEmpty, setMyListEmpty] = React.useState(true);

    const isMyList = NAV_SECTIONS[activeSection] === 'My List';

    return (
        <>
            <GlobalStyles />
            <Stack space={0}>
                <MainNavigationBar
                    selectedIndex={activeSection}
                    sections={NAV_SECTIONS.map((title, index) => ({
                        title,
                        onPress: () => setActiveSection(index),
                    }))}
                    right={
                        <NavigationBarActionGroup>
                            <NavigationBarAction aria-label="Search" onPress={() => {}}>
                                <IconSearchRegular color="currentColor" />
                            </NavigationBarAction>
                            <NavigationBarAction aria-label="Profile" onPress={() => {}}>
                                <Avatar size={32} initials="US" />
                            </NavigationBarAction>
                        </NavigationBarActionGroup>
                    }
                />

                {isMyList ? (
                    <ResponsiveLayout>
                        <Box paddingY={48}>
                            {myListEmpty ? (
                                <EmptyState
                                    largeImageUrl="https://picsum.photos/seed/empty/600/400"
                                    title="Your list is empty"
                                    description="Save movies and series to watch them later. Browse the catalog and tap the bookmark icon to add titles here."
                                    button={
                                        <ButtonPrimary onPress={() => setActiveSection(0)}>
                                            Browse catalog
                                        </ButtonPrimary>
                                    }
                                    secondaryButton={
                                        <ButtonSecondary onPress={() => setMyListEmpty(false)}>
                                            Add sample items
                                        </ButtonSecondary>
                                    }
                                />
                            ) : (
                                <Stack space={32}>
                                    <Stack space={16}>
                                        <Title1 as="h2">My List</Title1>
                                        <Text2 regular color={skinVars.colors.textSecondary}>
                                            {myListSaved.length} title{myListSaved.length !== 1 ? 's' : ''}{' '}
                                            saved
                                        </Text2>
                                    </Stack>
                                    <Carousel
                                        itemsPerPage={{mobile: 2, tablet: 3, desktop: 5}}
                                        items={myListSaved.map((item) => (
                                            <CoverCard
                                                key={item.id}
                                                imageSrc={`https://picsum.photos/seed/${item.seed}/400/600`}
                                                headline={getCardHeadline(item)}
                                                title={item.title}
                                                onPress={() => {}}
                                                aria-label={`Watch ${item.title}`}
                                            />
                                        ))}
                                    />
                                    <ButtonSecondary onPress={() => setMyListEmpty(true)}>
                                        Clear list
                                    </ButtonSecondary>
                                </Stack>
                            )}
                        </Box>
                    </ResponsiveLayout>
                ) : (
                    <>
                        <CoverHero
                            imageSrc="https://picsum.photos/seed/hero/1920/800"
                            headline={<Tag type="promo">Featured</Tag>}
                            title="Stranger Worlds"
                            description="A group of scientists make a shocking discovery that tears open the fabric of reality itself, plunging our world and an alternate dimension into chaos."
                            button={<ButtonPrimary onPress={() => {}}>Watch Now</ButtonPrimary>}
                            secondaryButton={<ButtonSecondary onPress={() => {}}>More Info</ButtonSecondary>}
                        />

                        <ResponsiveLayout>
                            <Box paddingY={24}>
                                <Stack space={32}>
                                    <ContentRow title="Trending Now" items={trendingNow} />
                                    <ContentRow title="Top Rated" items={topRated} />
                                    <ContentRow title="New Releases" items={newReleases} />
                                </Stack>
                            </Box>
                        </ResponsiveLayout>
                    </>
                )}
            </Stack>
        </>
    );
};

export const StreamingHomePage = () => (
    <ThemeContextProvider theme={theme}>
        <StreamingHomePageContent />
    </ThemeContextProvider>
);

export default StreamingHomePage;
