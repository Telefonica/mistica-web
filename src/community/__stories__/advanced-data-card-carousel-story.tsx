import * as React from 'react';
import AdvancedDataCard from '../advanced-data-card';
import {Placeholder} from '../../placeholder';
import {Carousel} from '../../carousel';
import Tag from '../../tag';

export default {
    title: 'Community/AdvancedDataCards in Carousel',
};

type Args = {onPress: boolean};

export const Default: StoryComponent<Args> = ({onPress}) => {
    const onPressHandler = onPress ? () => {} : undefined;
    return (
        <Carousel
            dataAttributes={{testid: 'advanced-data-card-carousel'}}
            itemsPerPage={4}
            items={[
                <AdvancedDataCard
                    title="Title 1"
                    description="Description 1"
                    footerText="Footer 1"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
                <AdvancedDataCard
                    title="Title 2"
                    headline={<Tag>Headline 2</Tag>}
                    extra={[<Placeholder height={48} />]}
                    footerText="Footer 2"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
                <AdvancedDataCard
                    title="Title 3"
                    description="Description 3"
                    extra={[<Placeholder height={48} />, <Placeholder height={48} />]}
                    footerText="Footer 3"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
                <AdvancedDataCard
                    title="Title 4"
                    extra={[
                        <Placeholder height={48} />,
                        <Placeholder height={48} />,
                        <Placeholder height={48} />,
                    ]}
                    footerText="Footer 4"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
            ]}
        />
    );
};

Default.storyName = 'AdvancedDataCards in Carousel';
Default.args = {
    onPress: true,
};
