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
    stackingGroup: boolean;
    footerImage: boolean;
    footerText: string;
    Actions: string;
    onClose: boolean;
};

export const Default: StoryComponent<Args> = ({
    headline,
    headlineType,
    pretitle,
    title,
    subtitle,
    description,
    stackingGroup,
    footerImage,
    footerText,
    Actions,
    onClose,
}) => {
    const button = Actions.includes('button') ? (
        <ButtonPrimary
            small
            onPress={() => {
                window.alert('close!');
            }}
        >
            Action
        </ButtonPrimary>
    ) : undefined;

    const buttonLink = Actions.includes('link') ? (
        <ButtonLink
            onPress={() => {
                window.alert('close!');
            }}
        >
            Link
        </ButtonLink>
    ) : undefined;

    const onPress = Actions.includes('onPress')
        ? () => {
              window.alert('closed!');
          }
        : undefined;

    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'data-card-advanced'}}>
                <DataCardAdvanced
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
                    headline={headline ? <Tag type={headlineType}>{headline}</Tag> : ''}
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

Default.storyName = 'Data Card Advanced';
Default.args = {
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'pretitle',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    stackingGroup: true,
    footerImage: false,
    footerText: '',
    Actions: 'button and link',
    onClose: true,
};
Default.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
    Actions: {
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
