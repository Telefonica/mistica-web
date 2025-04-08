import * as React from 'react';
import {Avatar, Image, Box, ResponsiveLayout, StackingGroup, Tag, Stack} from '../..';
import {
    HighlightedValueBlock,
    InformationBlock,
    ProgressBlock,
    RowBlock,
    SimpleBlock,
    ValueBlock,
} from '../blocks';
import imgExample from '../../__stories__/images/avatar.jpg';
import {vars} from '../../skins/skin-contract.css';

import type {TagType} from '../..';

export default {
    title: 'Community/Blocks',
    parameters: {
        fullScreen: true,
    },
};

type RowBlockArgs = {
    title: string;
    description: string;
    stackingGroup: boolean;
};

export const BlockRow: StoryComponent<RowBlockArgs> = ({title, description, stackingGroup}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Stack space={24} dataAttributes={{testid: 'row-block'}}>
                    <RowBlock
                        title={title}
                        stackingGroup={
                            stackingGroup ? (
                                <StackingGroup
                                    stacked
                                    maxItems={3}
                                    moreItemsStyle={{type: 'circle', size: 40}}
                                >
                                    <Avatar size={40} src={imgExample} />
                                    <Avatar size={40} src={imgExample} />
                                    <Avatar size={40} src={imgExample} />
                                    <Avatar size={40} src={imgExample} />
                                    <Avatar size={40} src={imgExample} />
                                    <Avatar size={40} src={imgExample} />
                                </StackingGroup>
                            ) : undefined
                        }
                    />
                    <RowBlock title={title} description={description} />
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

BlockRow.storyName = 'RowBlock';
BlockRow.args = {
    title: 'title',
    description: 'description',
    stackingGroup: true,
};

type SimpleBlockArgs = {
    description: string;
    rightText: string;
};

export const BlockSimple: StoryComponent<SimpleBlockArgs> = ({description, rightText}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'simple-block'}}>
                <SimpleBlock
                    description={description}
                    rightText={rightText}
                    image={<Image height={40} src={imgExample} />}
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockSimple.storyName = 'SimpleBlock';
BlockSimple.args = {
    description: 'description',
    rightText: 'label',
};

type InformationBlockArgs = {
    title: string;
    description: string;
    value: string;
    secondaryValue: string;
};

export const BlockInformation: StoryComponent<InformationBlockArgs> = ({
    title,
    description,
    value,
    secondaryValue,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'information-block'}}>
                <InformationBlock
                    title={title}
                    description={description}
                    value={value}
                    secondaryValue={secondaryValue}
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockInformation.storyName = 'InformationBlock';
BlockInformation.args = {
    title: 'title',
    description: 'description',
    value: '20',
    secondaryValue: '20',
};

type HighlightedValueBlockArgs = {
    headline: string;
    headlineType: TagType;

    value: string;
    text: string;

    secondaryValue: string;

    pretitle: string;
    title: string;
    description: string;
    strikedValue: string;
};

export const BlockHighlightedValue: StoryComponent<HighlightedValueBlockArgs> = ({
    headline,
    headlineType,
    value,
    text,
    secondaryValue,
    pretitle,
    title,
    description,
    strikedValue,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'highlighted-value-block'}}>
                <HighlightedValueBlock
                    headline={<Tag type={headlineType}>{headline}</Tag>}
                    pretitle={pretitle}
                    title={title}
                    description={description}
                    strikedValue={strikedValue}
                    headings={[
                        {value, text},
                        {value: secondaryValue, valueColor: vars.colors.textSecondary},
                    ]}
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockHighlightedValue.storyName = 'HighlightedValueBlock';
BlockHighlightedValue.args = {
    headline: 'Priority',
    headlineType: 'promo',
    pretitle: 'Pretitle',
    strikedValue: 'striked Value',
    value: '20',
    text: 'text',
    secondaryValue: '20',
    title: 'title',
    description: 'description',
};
BlockHighlightedValue.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
    },
};

type ValueBlockArgs = {
    title: string;
    value: string;
    description: string;
};

export const BlockValue: StoryComponent<ValueBlockArgs> = ({title, value, description}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'value-block'}}>
                <ValueBlock title={title} description={description} value={value} />
            </Box>
        </ResponsiveLayout>
    );
};

BlockValue.storyName = 'ValueBlock';
BlockValue.args = {
    title: 'title',
    description: 'description',
    value: '20',
};

type ProgressBlockArgs = {
    title: string;

    stackingGroup: boolean;

    progressPercent: number;
    reverse: boolean;

    value: string;
    text: string;
    description: string;
};

export const BlockProgress: StoryComponent<ProgressBlockArgs> = ({
    title,
    stackingGroup,
    progressPercent,
    reverse,
    value,
    text,
    description,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} dataAttributes={{testid: 'progress-block'}}>
                <ProgressBlock
                    title={title}
                    stackingGroup={
                        stackingGroup ? (
                            <StackingGroup stacked maxItems={3} moreItemsStyle={{type: 'circle', size: 40}}>
                                <Avatar size={40} src={imgExample} />
                                <Avatar size={40} src={imgExample} />
                                <Avatar size={40} src={imgExample} />
                                <Avatar size={40} src={imgExample} />
                                <Avatar size={40} src={imgExample} />
                                <Avatar size={40} src={imgExample} />
                            </StackingGroup>
                        ) : null
                    }
                    progressPercent={progressPercent}
                    reverse={reverse}
                    heading={{value, text}}
                    description={description}
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockProgress.storyName = 'ProgressBlock';
BlockProgress.args = {
    title: 'title',
    stackingGroup: false,
    progressPercent: 20,
    reverse: false,
    value: '20',
    text: 'text',
    description: 'description',
};
