import * as React from 'react';
import {Stack, Tag, useTheme} from '..';
import {useTextField} from './helpers';

export default {
    title: 'Components/Others/Tag',
};

export const Default: StoryComponent = () => {
    const [text, textField] = useTextField('Text', 'promo');
    const {colors} = useTheme();

    return (
        <Stack space={16}>
            <div data-testid="tag">
                <Tag color={colors.promo}>{text}</Tag>
            </div>
            {textField}
        </Stack>
    );
};

Default.storyName = 'Tag';
