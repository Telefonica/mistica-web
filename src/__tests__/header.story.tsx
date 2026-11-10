import * as React from 'react';
import {Header} from '../header';

export const ReadingOrder = (
    props: Pick<React.ComponentProps<typeof Header>, 'titleAs' | 'pretitleAs'>
): JSX.Element => (
    <Header
        headline="Headline"
        pretitle="Pretitle"
        title="Title"
        description="Description"
        dataAttributes={{testid: 'header'}}
        {...props}
    />
);
