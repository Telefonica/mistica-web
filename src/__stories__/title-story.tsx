import * as React from 'react';
import {Title1, Title2, Title3, ButtonLink} from '..';

import type {TitleProps} from '../title';

export default {
    title: 'Components/Titles',
    args: {
        title: '',
        linkText: 'Link',
    },
};

type renderTitleComponentProps = {
    title: string;
    linkText: string;
    defaultTitle: string;
    as: 'h1' | 'h2' | 'h3';
    TitleComponent: React.ComponentType<TitleProps>;
};

const TitleComponent = ({
    title,
    linkText,
    defaultTitle,
    as,
    TitleComponent,
}: renderTitleComponentProps): JSX.Element => (
    <TitleComponent
        as={as}
        dataAttributes={{testid: defaultTitle}}
        right={
            linkText ? (
                <ButtonLink href="https://google.com" bleedRight bleedY>
                    {linkText}
                </ButtonLink>
            ) : undefined
        }
    >
        {title || defaultTitle}
    </TitleComponent>
);

type Args = {title: string; linkText: string};

export const Title1Story: StoryComponent<Args> = ({title, linkText}) => (
    <TitleComponent as="h1" title={title} linkText={linkText} defaultTitle="Title1" TitleComponent={Title1} />
);

export const Title2Story: StoryComponent<Args> = ({title, linkText}) => (
    <TitleComponent as="h2" title={title} linkText={linkText} defaultTitle="Title2" TitleComponent={Title2} />
);

export const Title3Story: StoryComponent<Args> = ({title, linkText}) => (
    <TitleComponent as="h3" title={title} linkText={linkText} defaultTitle="Title3" TitleComponent={Title3} />
);

Title1Story.storyName = 'Title1';
Title2Story.storyName = 'Title2';
Title3Story.storyName = 'Title3';
