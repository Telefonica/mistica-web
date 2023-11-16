import * as React from 'react';
import {ButtonLink, ButtonPrimary} from '../../button';
import Tag from '../../tag';
import AdvancedDataCard from '../advanced-data-card';
import imgExample from '../../__stories__/images/avatar.jpg';
import Image from '../../image';
import StackingGroup from '../../stacking-group';
import {Placeholder} from '../../placeholder';

import type {TagType} from '../../tag';

export default {
    title: 'Community/AdvancedDataCard',
};

type Args = {
    headlineType: TagType;
    headline: string;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    stackingGroup: boolean;
    footerImage: boolean;
    footerText: string;
    actions: string;
    onClose: boolean;
    extra: number;
};

export const Default: StoryComponent<Args> = ({
    headlineType,
    headline,
    pretitle,
    title,
    subtitle,
    description,
    stackingGroup,
    footerImage,
    footerText,
    actions,
    onClose,
    extra,
}) => {
    const button = actions.includes('button') ? (
        <ButtonPrimary
            small
            onPress={() => {
                window.alert('click!');
            }}
        >
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = actions.includes('link') ? (
        <ButtonLink
            onPress={() => {
                window.alert('click!');
            }}
        >
            Link
        </ButtonLink>
    ) : undefined;

    const href = actions.includes('href')
        ? 'https://mistica-web.vercel.app/?path=/story/welcome--welcome'
        : undefined;

    return (
        <AdvancedDataCard
            dataAttributes={{testid: 'advanced-data-card'}}
            stackingGroup={
                stackingGroup ? (
                    <StackingGroup maxItems={4} moreItemsStyle={{type: 'square', size: 40}}>
                        <Image height={40} src={imgExample} />
                        <Image height={40} src={imgExample} />
                        <Image height={40} src={imgExample} />
                        <Image height={40} src={imgExample} />
                        <Image height={40} src={imgExample} />
                    </StackingGroup>
                ) : undefined
            }
            headline={headline ? <Tag type={headlineType}>{headline}</Tag> : undefined}
            pretitle={pretitle}
            title={title}
            subtitle={subtitle}
            description={description}
            aria-label="aria label"
            button={button}
            buttonLink={buttonLink}
            footerImage={footerImage ? <Image height={40} src={imgExample} /> : undefined}
            footerText={footerText}
            onClose={onClose ? () => window.alert('closed!') : undefined}
            href={href}
            extra={Array.from({length: extra}, (_, i) => (
                <Placeholder key={i} height={56} />
            ))}
        />
    );
};

Default.storyName = 'Advanced Data Card';
Default.args = {
    headlineType: 'promo',
    headline: 'headline',
    pretitle: 'pretitle',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    stackingGroup: true,
    footerImage: false,
    footerText: '',
    actions: 'button and link',
    onClose: true,
    extra: 0,
};
Default.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: [
            'none',
            'button',
            'link',
            'button and link',
            'href',
            'button and href',
            'link and href',
            'button link and href',
        ],
        control: {type: 'select'},
    },
};
