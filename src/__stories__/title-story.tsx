import * as React from 'react';
import {Title1, Title2, Stack, ButtonLink} from '..';

export default {
    title: 'Components/Title',
};

type Args = {title: string; linkText: string};

export const Default: StoryComponent<Args> = ({title, linkText}) => (
    <Stack space={32}>
        <Title1
            as="h3"
            right={
                linkText ? (
                    <ButtonLink href="https://google.com" bleedRight bleedY>
                        {linkText}
                    </ButtonLink>
                ) : undefined
            }
        >
            {title || 'Title1'}
        </Title1>
        <Title2
            as="h2"
            right={
                linkText ? (
                    <ButtonLink href="https://google.com" bleedRight bleedY>
                        {linkText}
                    </ButtonLink>
                ) : undefined
            }
        >
            {title || 'Title2'}
        </Title2>
    </Stack>
);

Default.storyName = 'Title';
Default.args = {
    title: '',
    linkText: 'Link',
};
