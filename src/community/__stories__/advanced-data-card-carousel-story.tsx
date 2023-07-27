import * as React from 'react';
import AdvancedDataCard from '../advanced-data-card';
import {Placeholder} from '../../placeholder';
import {Carousel} from '../../carousel';

export default {
    title: 'Community/AdvancedDataCards in Carousel',
};

type Args = {onPress: boolean};

export const Default: StoryComponent<Args> = ({onPress}) => {
    const onPressHandler = onPress
        ? () => {
              console.log('click');
          }
        : undefined;
    return (
        <Carousel
            itemsPerPage={4}
            items={[
                <AdvancedDataCard
                    title="Title"
                    footerText="Footer"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
                <AdvancedDataCard
                    title="Title"
                    extra={[<Placeholder height={48} />]}
                    footerText="Footer"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
                <AdvancedDataCard
                    title="Title"
                    extra={[<Placeholder height={48} />, <Placeholder height={48} />]}
                    footerText="Footer"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
                <AdvancedDataCard
                    title="Title"
                    extra={[
                        <Placeholder height={48} />,
                        <Placeholder height={48} />,
                        <Placeholder height={48} />,
                    ]}
                    footerText="Footer"
                    onClose={() => {}}
                    onPress={onPressHandler}
                />,
            ]}
        ></Carousel>
    );
};

Default.storyName = 'AdvancedDataCards in Carousel';
Default.args = {
    onPress: true,
};
