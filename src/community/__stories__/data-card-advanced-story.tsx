import * as React from 'react';
import ResponsiveLayout from '../../responsive-layout';
import Box from '../../box';
import {ButtonLink, ButtonPrimary} from '../../button';
import Tag from '../../tag';
import DataCardAdvanced from '../../data-card-advanced';
import imgExample from '../../__stories__/images/avatar.jpg';
import Image from '../../image';
import StackingGroup from '../../stacking-group';

import type {TagType} from '../../tag';

export default {
    title: 'Community/DataCardAdvanced',
};

type Args = {
    headline: string;
    headlineType: TagType;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    footerText: string;
    actions: string;
    bottomActions: string;
};

export const Default: StoryComponent<Args> = ({
    headline,
    headlineType,
    pretitle,
    title,
    subtitle,
    description,
    footerText,
    actions,
    bottomActions,
}) => {
    const button = bottomActions.includes('button') ? (
        <ButtonPrimary
            small
            onPress={() => {
                window.alert('close!');
            }}
        >
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = bottomActions.includes('link') ? (
        <ButtonLink
            onPress={() => {
                window.alert('close!');
            }}
        >
            Link
        </ButtonLink>
    ) : undefined;

    const footerImage = bottomActions.includes('footerImage') ? (
        <Image height={40} src={imgExample} />
    ) : undefined;

    const stackingGroup = actions.includes('stackingGroup') ? (
        <StackingGroup maxItems={4} moreItemsStyle={{type: 'square', size: 40}}>
            <Image height={40} src={imgExample} />
            <Image height={40} src={imgExample} />
            <Image height={40} src={imgExample} />
            <Image height={40} src={imgExample} />
            <Image height={40} src={imgExample} />
        </StackingGroup>
    ) : undefined;

    const onClose = actions.includes('onClose')
        ? () => {
              window.alert('closed!');
          }
        : undefined;

    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'data-card-advanced'}}>
                <DataCardAdvanced
                    smallSlotSpace
                    stackingGroup={stackingGroup}
                    headline={headline ? <Tag type={headlineType}>{headline}</Tag> : ''}
                    pretitle={pretitle}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    aria-label="aria label"
                    button={button}
                    buttonLink={buttonLink}
                    footerImage={footerImage}
                    footerText={footerText}
                    onClose={onClose}
                    onPress={() => window.alert('press!')}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Data Card Advanced';
Default.args = {
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'pretitle',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    footerText: '',
    actions: 'stackingGroup',
    bottomActions: 'button and link',
};
Default.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    actions: {
        options: ['none', 'stackingGroup', 'onClose', 'stackingGroup and onClose'],
        control: {type: 'select'},
    },
    bottomActions: {
        options: [
            'none',
            'button',
            'link',
            'button and link',
            'footerImage',
            'button and footerImage',
            'link and footerImage',
            'button link and footerImage',
        ],
        control: {type: 'select'},
    },
};
