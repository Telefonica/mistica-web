'use client';
import * as React from 'react';
import {
    MainNavigationBar,
    NavigationBarActionGroup,
    NavigationBarAction,
    Hero,
    Image,
    Carousel,
    MediaCard,
    Tag,
    ButtonPrimary,
    ButtonLink,
    EmptyState,
    Stack,
    Box,
    ResponsiveLayout,
    Title3,
    IconSearchRegular,
} from '@telefonica/mistica';

type Section = 'Home' | 'Movies' | 'Series' | 'Kids' | 'My List';

const SECTIONS: Section[] = ['Home', 'Movies', 'Series', 'Kids', 'My List'];

type ContentItem = {
    id: number;
    title: string;
    tag?: 'NEW' | 'TOP 10';
    seed: number;
};

type ContentRow = {
    heading: string;
    items: ContentItem[];
};

const FEATURED = {
    title: 'Stranger Things',
    description:
        'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
};

const CONTENT_ROWS: ContentRow[] = [
    {
        heading: 'Trending Now',
        items: [
            {id: 1, title: 'Breaking Bad', tag: 'TOP 10', seed: 10},
            {id: 2, title: 'Dark', tag: 'NEW', seed: 20},
            {id: 3, title: 'Ozark', seed: 30},
            {id: 4, title: 'Money Heist', tag: 'TOP 10', seed: 40},
            {id: 5, title: 'The Crown', seed: 50},
            {id: 6, title: 'Squid Game', tag: 'NEW', seed: 60},
            {id: 7, title: 'Narcos', seed: 70},
        ],
    },
    {
        heading: 'New Releases',
        items: [
            {id: 8, title: 'Wednesday', tag: 'NEW', seed: 80},
            {id: 9, title: 'The Witcher', seed: 90},
            {id: 10, title: 'Cobra Kai', tag: 'TOP 10', seed: 100},
            {id: 11, title: 'Emily in Paris', seed: 110},
            {id: 12, title: 'Bridgerton', tag: 'NEW', seed: 120},
            {id: 13, title: 'Lupin', seed: 130},
            {id: 14, title: 'Elite', tag: 'TOP 10', seed: 140},
        ],
    },
    {
        heading: 'Continue Watching',
        items: [
            {id: 15, title: 'Peaky Blinders', seed: 150},
            {id: 16, title: 'Better Call Saul', tag: 'TOP 10', seed: 160},
            {id: 17, title: 'House of Cards', seed: 170},
            {id: 18, title: 'Black Mirror', tag: 'NEW', seed: 180},
            {id: 19, title: 'Mindhunter', seed: 190},
            {id: 20, title: 'The Boys', tag: 'TOP 10', seed: 200},
            {id: 21, title: '1899', tag: 'NEW', seed: 210},
        ],
    },
    {
        heading: 'Top Picks for You',
        items: [
            {id: 22, title: 'Severance', tag: 'NEW', seed: 220},
            {id: 23, title: 'Succession', tag: 'TOP 10', seed: 230},
            {id: 24, title: 'The Last of Us', tag: 'NEW', seed: 240},
            {id: 25, title: 'Euphoria', seed: 250},
            {id: 26, title: 'Andor', tag: 'TOP 10', seed: 260},
            {id: 27, title: 'Slow Horses', seed: 270},
            {id: 28, title: 'Silo', tag: 'NEW', seed: 280},
        ],
    },
];

const MY_LIST_SEED_ITEMS: ContentItem[] = [
    {id: 101, title: 'Shogun', tag: 'TOP 10', seed: 310},
    {id: 102, title: 'True Detective', seed: 320},
    {id: 103, title: 'Fargo', tag: 'NEW', seed: 330},
    {id: 104, title: 'The Terror', seed: 340},
    {id: 105, title: 'Chernobyl', tag: 'TOP 10', seed: 350},
    {id: 106, title: 'Station Eleven', seed: 360},
    {id: 107, title: 'Devs', tag: 'NEW', seed: 370},
];

const tagTypeForLabel = (label: 'NEW' | 'TOP 10') =>
    label === 'NEW' ? ('active' as const) : ('promo' as const);

const ContentCarouselRow = ({row}: {row: ContentRow}) => (
    <Box paddingBottom={32}>
        <ResponsiveLayout>
            <Stack space={16}>
                <Title3>{row.heading}</Title3>
                <Carousel
                    itemsPerPage={{mobile: 2, tablet: 3, desktop: 5}}
                    free
                    items={row.items.map((item) => (
                        <MediaCard
                            key={item.id}
                            headline={
                                item.tag ? <Tag type={tagTypeForLabel(item.tag)}>{item.tag}</Tag> : undefined
                            }
                            title={item.title}
                            imageSrc={`https://picsum.photos/seed/${item.seed}/400/600`}
                            imageAlt={item.title}
                            mediaAspectRatio="7:10"
                        />
                    ))}
                />
            </Stack>
        </ResponsiveLayout>
    </Box>
);

const StreamingHomePage = (): JSX.Element => {
    const [activeSection, setActiveSection] = React.useState<Section>('Home');
    const [myListEnabled, setMyListEnabled] = React.useState(false);

    const navSections = SECTIONS.map((title) => ({
        title,
        onPress: () => setActiveSection(title),
    }));

    const selectedIndex = SECTIONS.indexOf(activeSection);
    const isMyList = activeSection === 'My List';

    return (
        <div>
            <MainNavigationBar
                variant="default"
                sections={navSections}
                selectedIndex={selectedIndex}
                right={
                    <NavigationBarActionGroup>
                        <NavigationBarAction aria-label="Search">
                            <IconSearchRegular size={24} />
                        </NavigationBarAction>
                    </NavigationBarActionGroup>
                }
            />

            {!isMyList && (
                <>
                    <Hero
                        background="none"
                        desktopMediaPosition="right"
                        media={
                            <Image
                                src="https://picsum.photos/seed/1/800/450"
                                aspectRatio="16:9"
                                alt="Featured: Stranger Things"
                                noBorderRadius
                            />
                        }
                        title={FEATURED.title}
                        description={FEATURED.description}
                        button={<ButtonPrimary onPress={() => {}}>Play</ButtonPrimary>}
                        buttonLink={<ButtonLink onPress={() => {}}>More Info</ButtonLink>}
                    />
                    <Box paddingY={8}>
                        {CONTENT_ROWS.map((row) => (
                            <ContentCarouselRow key={row.heading} row={row} />
                        ))}
                    </Box>
                </>
            )}

            {isMyList && (
                <>
                    {!myListEnabled ? (
                        <Box paddingY={64}>
                            <ResponsiveLayout>
                                <EmptyState
                                    title="Your list is empty"
                                    description="Save movies and series here so you can find them easily later."
                                    imageUrl="https://picsum.photos/seed/999/200/200"
                                    button={
                                        <ButtonPrimary onPress={() => setMyListEnabled(true)}>
                                            Add titles to My List
                                        </ButtonPrimary>
                                    }
                                />
                            </ResponsiveLayout>
                        </Box>
                    ) : (
                        <Box paddingY={24}>
                            <ContentCarouselRow row={{heading: 'My List', items: MY_LIST_SEED_ITEMS}} />
                        </Box>
                    )}
                </>
            )}
        </div>
    );
};

export default StreamingHomePage;
