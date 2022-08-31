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
                            title="Title"
                            description="This is the best offer for you. Please check it out!"
                            imageUrl="https://imrl.movistar-es-dev.svc.dev.mad.tuenti.io/2YMvRiZT9QdEAAAuUAAAAFw0oaVgG"
                        />,
                        <HighlightedCard
                            title="Title"
                            description="This is the best offer for you. Please check it out!"
                            imageUrl="https://imrl.movistar-es-dev.svc.dev.mad.tuenti.io/2YMvRiZT9QdEAAAuUAAAAFw0oaVgG"
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
