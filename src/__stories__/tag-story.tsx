import * as React from 'react';
import {Stack, Tag, useTheme, Text1} from '..';
import {useTextField} from './helpers';

export default {
    title: 'Components/Others/Tag',
};

export const Default: StoryComponent = () => {
    const [text, textField] = useTextField('Text', 'tag label');
    const {colors} = useTheme();

    return (
        <Stack space={56}>
            <Stack space={16}>
                <Text1 medium>Examples</Text1>
                <div data-testid="tag">
                    <Tag color={colors.promo}>Promo</Tag>
                </div>
                <Tag color={colors.brand}>In progress</Tag>
                <Tag color={colors.success}>Completed</Tag>
                <Tag color={colors.warning}>Pending</Tag>
                <Tag color={colors.error}>Overdue</Tag>
                <Tag color={colors.neutralMedium}>Removed</Tag>
                <Tag color={colors.inverse}>Priority</Tag>
            </Stack>
            <Stack space={16}>
                <Text1 medium>Try yourself</Text1>
                <Tag color={colors.promo}>{text}</Tag>
                <Tag color={colors.brand}>{text}</Tag>
                <Tag color={colors.success}>{text}</Tag>
                <Tag color={colors.warning}>{text}</Tag>
                <Tag color={colors.error}>{text}</Tag>
                <Tag color={colors.neutralMedium}>{text}</Tag>
                <Tag color={colors.inverse}>{text}</Tag>
                {textField}
            </Stack>
        </Stack>
    );
};

Default.storyName = 'Tag';
