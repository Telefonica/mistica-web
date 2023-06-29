import * as React from 'react';
import ResponsiveLayout from '../../responsive-layout';
import Box from '../../box';
import {ButtonLink, ButtonPrimary} from '../../button';
import Tag from '../../tag';
import AdvancedDataCard from '../advanced-data-card';
import imgExample from '../../__stories__/images/avatar.jpg';
import Image from '../../image';
import StackingGroup from '../../stacking-group';

import type {TagType} from '../../tag';

export default {
    title: 'Community/AdvancedDataCard',
};

type Args = {
    headlineType: TagType;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    stackingGroup: boolean;
    footerImage: boolean;
    footerText: string;
    actions: string;
    onClose: boolean;
};

export const Default: StoryComponent<Args> = ({
    headlineType,
    pretitle,
    title,
    subtitle,
    description,
    stackingGroup,
    footerImage,
    footerText,
    actions,
    onClose,
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

    const onPress = actions.includes('onPress')
        ? () => {
              window.alert('press!');
          }
        : undefined;

    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'advanced-data-card'}}>
                <AdvancedDataCard
                    smallSlotSpace
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
                    headline={<Tag type={headlineType}>{headlineType}</Tag>}
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
                    onPress={onPress}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Advanced Data Card';
Default.args = {
    headlineType: 'promo',
    pretitle: 'pretitle',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    stackingGroup: true,
    footerImage: false,
    footerText: '',
    actions: 'button and link',
    onClose: true,
};
Default.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', undefined],
        control: {type: 'select'},
    },
    actions: {
        options: [
            'none',
            'button',
            'link',
            'button and link',
            'onPress',
            'button and onPress',
            'link and onPress',
            'button link and onPress',
        ],
        control: {type: 'select'},
    },
};
