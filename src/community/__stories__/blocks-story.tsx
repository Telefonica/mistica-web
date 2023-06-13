import * as React from 'react';
import {Avatar, Image, Box, ResponsiveLayout, StackingGroup, Tag} from '../..';
import {
    HighlightedValueBlock,
    InformationBlock,
    ProgressBlock,
    RowBlock,
    SimpleBlock,
    ValueBlock,
} from '../../blocks';
import imgExample from '../../__stories__/images/avatar.jpg';

import type {TagType} from '../..';

export default {
    title: 'Community/Blocks',
    parameters: {
        fullScreen: true,
    },
};

type RowBlockArgs = {
    title?: string;
    description?: string;
    showStackingGroup?: boolean;
};

export const BlockRow: StoryComponent<RowBlockArgs> = ({title, description, showStackingGroup}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <RowBlock
                    title={title}
                    description={description}
                    stackingGroup={
                        showStackingGroup ? (
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
                    aria-label="aria-label"
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockRow.storyName = 'Row Block';
BlockRow.args = {
    title: 'title',
    description: 'description',
    showStackingGroup: false,
};

type SimpleBlockArgs = {
    description?: string;
};

export const BlockSimple: StoryComponent<SimpleBlockArgs> = ({description}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <SimpleBlock
                    description={description}
                    image={<Image height={40} src={imgExample} />}
                    aria-label="aria-label"
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockSimple.storyName = 'Simple Block';
BlockSimple.args = {
    description: 'description',
};

type InformationBlockArgs = {
    title?: string;
    description?: string;
    value: string;
    secondaryValue?: string;
};

export const BlockInformation: StoryComponent<InformationBlockArgs> = ({
    title,
    description,
    secondaryValue,
    value,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <InformationBlock
                    title={title}
                    description={description}
                    value={value}
                    secondaryValue={secondaryValue}
                    aria-label="aria-label"
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockInformation.storyName = 'Information Block';
BlockInformation.args = {
    title: 'title',
    description: 'description',
    value: '20',
    secondaryValue: '20',
};

type HighlightedValueBlockArgs = {
    value: string | Array<string>;
    text: string | Array<string>;
    tag?: TagType;
    icon?: string;

    secondaryValue?: string;

    title?: string;
    description?: string | Array<string>;
};

export const BlockHighlightedValue: StoryComponent<HighlightedValueBlockArgs> = ({
    tag,
    value,
    text,
    secondaryValue,
    title,
    description,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <HighlightedValueBlock
                    tag={<Tag type={tag}>{`${tag}`}</Tag>}
                    title={title}
                    description={description}
                    value={value}
                    secondaryValue={secondaryValue}
                    text={text}
                    aria-label="aria-label"
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockHighlightedValue.storyName = 'Highlighted Value';
BlockHighlightedValue.args = {
    tag: 'promo',
    title: 'title',
    description: 'description',
    value: '20',
    secondaryValue: '20',
    text: 'text',
};
BlockHighlightedValue.argTypes = {
    tag: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', ''],
        control: {type: 'select'},
    },
};

type ValueBlockArgs = {
    title?: string;
    value?: string;
    description?: string | Array<string>;
};

export const BlockValue: StoryComponent<ValueBlockArgs> = ({title, value, description}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <ValueBlock title={title} description={description} value={value} aria-label="aria-label" />
            </Box>
        </ResponsiveLayout>
    );
};

BlockValue.storyName = 'Value Block';
BlockValue.args = {
    title: 'title',
    description: 'description',
    value: '20',
};

type ProgressBlockArgs = {
    title?: string;

    showStackingGroup?: boolean;

    progressPercent?: number;
    reverse?: boolean;

    value: string;
    text: string;
    description?: string;
};

export const BlockProgress: StoryComponent<ProgressBlockArgs> = ({
    title,
    showStackingGroup,
    progressPercent,
    reverse,
    value,
    text,
    description,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <ProgressBlock
                    title={title}
                    stackingGroup={
                        showStackingGroup ? (
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
                    value={value}
                    text={text}
                    description={description}
                    aria-label="aria-label"
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockProgress.storyName = 'Progress Block';
BlockProgress.args = {
    title: 'title',
    showStackingGroup: false,
    progressPercent: 20,
    reverse: false,
    value: '20',
    text: 'text',
    description: 'description',
};
