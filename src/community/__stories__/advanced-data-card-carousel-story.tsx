import * as React from 'react';
import AdvancedDataCard from '../advanced-data-card';
import {Placeholder} from '../../placeholder';
import {Carousel} from '../../carousel';
import Tag from '../../tag';

export default {
    title: 'Community/AdvancedDataCards in Carousel',
};

type Args = {href: boolean};

export const Default: StoryComponent<Args> = ({href}) => {
    const hasHref = href ? 'https://mistica-web.vercel.app/?path=/story/welcome--welcome' : undefined;
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
                    href={hasHref}
                    aria-label="aria-label 1"
                />,
                <AdvancedDataCard
                    title="Title 2"
                    headline={<Tag>Headline 2</Tag>}
                    extra={[<Placeholder height={48} />]}
                    footerText="Footer 2"
                    onClose={() => {}}
                    href={hasHref}
                    aria-label="aria-label 2"
                />,
                <AdvancedDataCard
                    title="Title 3"
                    description="Description 3"
                    extra={[<Placeholder height={48} />, <Placeholder height={48} />]}
                    footerText="Footer 3"
                    onClose={() => {}}
                    href={hasHref}
                    aria-label="aria-label 3"
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
                    href={hasHref}
                    aria-label="aria-label 4"
                />,
            ]}
        />
    );
};

Default.storyName = 'AdvancedDataCards in Carousel';
Default.args = {
    href: true,
};
