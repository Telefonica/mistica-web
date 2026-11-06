import * as React from 'react';
import Hero from '../hero';
import Tag from '../tag';

export const ReadingOrder = (
    props: Pick<React.ComponentProps<typeof Hero>, 'titleAs' | 'pretitleAs'>
): JSX.Element => (
    <Hero
        media={<></>}
        headline={<Tag>Headline</Tag>}
        pretitle="Pretitle"
        title="Title"
        description="Description"
        dataAttributes={{testid: 'hero'}}
        {...props}
    />
);
