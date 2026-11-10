import * as React from 'react';
import CoverHero from '../cover-hero';
import Tag from '../tag';

export const ReadingOrder = (
    props: Pick<React.ComponentProps<typeof CoverHero>, 'titleAs' | 'pretitleAs'>
): JSX.Element => (
    <CoverHero
        background="white"
        headline={<Tag>Headline</Tag>}
        pretitle="Pretitle"
        title="Title"
        description="Description"
        dataAttributes={{testid: 'cover-hero'}}
        {...props}
    />
);
