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
    showStackingGroup: boolean;
    showFooterImage: boolean;
    showHeadline: boolean;
    showButtonPrimary: boolean;
    showButtonLink: boolean;
};

export const Default: StoryComponent<Args> = ({
    headline,
    headlineType,
    pretitle,
    title,
    subtitle,
    description,
    showFooterImage,
    footerText,
    showStackingGroup,
    showHeadline,
    showButtonPrimary,
    showButtonLink,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'data-card-advanced'}}>
                <DataCardAdvanced
                    stackingGroup={
                        showStackingGroup ? (
                            <StackingGroup maxItems={4} moreItemsStyle={{type: 'square', size: 40}}>
                                <Image height={40} src={imgExample} />
                                <Image height={40} src={imgExample} />
                                <Image height={40} src={imgExample} />
                                <Image height={40} src={imgExample} />
                                <Image height={40} src={imgExample} />
                            </StackingGroup>
                        ) : null
                    }
                    headline={
                        showHeadline ? headline ? <Tag type={headlineType}>{headline}</Tag> : undefined : ''
                    }
                    pretitle={pretitle}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    aria-label="aria label"
                    button={
                        showButtonPrimary ? (
                            <ButtonPrimary
                                onPress={() => {
                                    window.alert('pressed!');
                                }}
                            >
                                Action
                            </ButtonPrimary>
                        ) : null
                    }
                    buttonLink={
                        showButtonLink ? (
                            <ButtonLink
                                onPress={() => {
                                    window.alert('pressed!');
                                }}
                            >
                                Action
                            </ButtonLink>
                        ) : null
                    }
                    footerImage={showFooterImage ? <Image height={40} src={imgExample} /> : undefined}
                    footerText={footerText}
                    onClose={() => window.alert('close!')}
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
    showStackingGroup: true,
    showFooterImage: false,
    showHeadline: true,
    showButtonPrimary: true,
    showButtonLink: true,
};
Default.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error'],
        control: {type: 'select'},
    },
};
