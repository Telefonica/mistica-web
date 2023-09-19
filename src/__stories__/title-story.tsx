import * as React from 'react';
import {Title1, Title2, Title3, ButtonLink, IconInformationRegular, skinVars} from '..';

import type {TitleProps} from '../title';

export default {
    title: 'Components/Titles',
    args: {
        title: '',
        right: 'link',
        linkText: 'Link',
    },
    argTypes: {
        right: {
            options: ['link', 'icon', 'undefined'],
            control: {type: 'select'},
        },
        linkText: {if: {arg: 'right', eq: 'link'}},
    },
};

type renderTitleComponentProps = {
    title: string;
    linkText: string;
    right: 'link' | 'icon' | 'undefined';
    defaultTitle: string;
    as: 'h1' | 'h2' | 'h3';
    TitleComponent: React.ComponentType<TitleProps>;
};

const TitleComponent = ({
    title,
    right,
    linkText,
    defaultTitle,
    as,
    TitleComponent,
}: renderTitleComponentProps): JSX.Element => (
    <TitleComponent
        as={as}
        dataAttributes={{testid: defaultTitle}}
        right={
            right === 'link' ? (
                <ButtonLink href="https://google.com" bleedRight bleedY>
                    {linkText || 'link'}
                </ButtonLink>
            ) : right === 'icon' ? (
                <IconInformationRegular size={16} color={skinVars.colors.neutralMedium} />
            ) : undefined
        }
    >
        {title || defaultTitle}
    </TitleComponent>
);

type Args = {title: string; right: 'link' | 'icon' | 'undefined'; linkText: string};

export const Title1Story: StoryComponent<Args> = ({title, right, linkText}) => (
    <TitleComponent
        as="h1"
        title={title}
        right={right}
        linkText={linkText}
        defaultTitle="Title1"
        TitleComponent={Title1}
    />
);

export const Title2Story: StoryComponent<Args> = ({title, right, linkText}) => (
    <TitleComponent
        as="h2"
        title={title}
        right={right}
        linkText={linkText}
        defaultTitle="Title2"
        TitleComponent={Title2}
    />
);

export const Title3Story: StoryComponent<Args> = ({title, right, linkText}) => (
    <TitleComponent
        as="h3"
        title={title}
        right={right}
        linkText={linkText}
        defaultTitle="Title3"
        TitleComponent={Title3}
    />
);

Title1Story.storyName = 'Title1';
Title2Story.storyName = 'Title2';
Title3Story.storyName = 'Title3';
