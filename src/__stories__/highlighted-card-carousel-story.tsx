import * as React from 'react';
import {Box, ResponsiveLayout, HighlightedCard, Carousel, ButtonPrimary} from '..';

export default {
    title: 'Components/Carousels/Highlighted card carousel',
};

type Args = {numItems: number};

export const Default: StoryComponent<Args> = () => {
    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Carousel
                    itemStyle={{display: 'flex'}}
                    itemsPerPage={1}
                    items={[
                        <HighlightedCard
                            title="Title1"
                            description="This is the best offer for you. Please check it out!"
                            imageUrl="https://i.imgur.com/4mwxBL4.jpg"
                        />,
                        <HighlightedCard
                            title="Title2"
                            description="This is the best offer for you. Please check it out!"
                            imageUrl="https://i.imgur.com/4mwxBL4.jpg"
                            button={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
                            onClose={() => {}}
                        />,
                    ]}
                />
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'Highlighted card carousel';
Default.parameters = {fullScreen: true};
