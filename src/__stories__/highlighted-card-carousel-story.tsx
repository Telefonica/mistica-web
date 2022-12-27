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
                            imageUrl="https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                        />,
                        <HighlightedCard
                            title="Title2"
                            description="This is the best offer for you. Please check it out!"
                            imageUrl="https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
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
