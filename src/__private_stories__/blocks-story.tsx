import * as React from 'react';
import {Avatar, Image, Box, ResponsiveLayout, StackingGroup} from '..';
import { BlockContent, InformationBlock, RowBlock, SimpleBlock } from '../blocks';
import imgExample from '../__stories__/images/avatar.jpg';

export default {
    title: 'Private/Blocks',
    parameters: {
        fullScreen: true,
    },
};

type BlockArgs = {
    title?: string;
    description?: string | Array<string>;
};

export const Default: StoryComponent<BlockArgs> = ({
    title,
    description
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24} width="max-content">
                <BlockContent title={title} description={description} />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Progress Block';
Default.args = {
    title: 'title',
    description: 'description'
};

type RowBlockArgs = {
    title?: string;
    description?: string;
    showStackingGroup?: boolean;
};

export const BlockRowBlock: StoryComponent<RowBlockArgs> = ({
    title,
    description,
    showStackingGroup,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <RowBlock
                    title={title}
                    description={description}
                    stackingGroup={
                        showStackingGroup ?
                        <StackingGroup stacked maxItems={3} moreItemsStyle={{ type: "circle", size: 40 }}>
                            <Avatar size={40} />
                            <Avatar size={40} />
                            <Avatar size={40} />
                            <Avatar size={40} />
                            <Avatar size={40} />
                            <Avatar size={40} />
                        </StackingGroup> : null
                    }
                    aria-label='aria-label'
                />
            </Box>
        </ResponsiveLayout>
    );
};

BlockRowBlock.storyName = 'RowBlock';
BlockRowBlock.args = {
    title: 'title',
    description: 'description',
    showStackingGroup: false,
};

type SimpleBlockArgs = {
    description?: string;
};

export const BlockSimple: StoryComponent<SimpleBlockArgs> = ({
    description,
}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <SimpleBlock
                    description={description}
                    image={<Image height={40} src={imgExample} />}
                    aria-label='aria-label'
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
                    aria-label='aria-label'
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