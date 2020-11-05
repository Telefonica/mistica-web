import * as React from 'react';
import {PromoTag, Stack} from '..';
import {useTextField} from './helpers';

export default {
    title: 'Components/Others/PromoTag',
};

export const Default: StoryComponent = () => {
    const [text, textField] = useTextField('Text', 'promo');

    return (
        <Stack space={16}>
            <div data-testid="promo-tag">
                <PromoTag>{text}</PromoTag>
            </div>
            {textField}
        </Stack>
    );
};

Default.storyName = 'PromoTag';
