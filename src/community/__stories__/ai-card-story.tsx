import * as React from 'react';
import AiCard from '../ai-card';
import Box from '../../box';
import ResponsiveLayout from '../../responsive-layout';

export default {
    title: 'Community/AiCard',
    parameters: {fullScreen: true},
};

type Args = {
    text: string;
    words: string;
    deleteUntil: number;
    lineBreakAtChars: number;
};

const parseWords = (raw: string): Array<string> =>
    raw
        .split(',')
        .map((word) => word.trim())
        .filter(Boolean);

export const Default: StoryComponent<Args> = ({text, words, deleteUntil, lineBreakAtChars}) => (
    <ResponsiveLayout>
        <Box paddingY={24}>
            <AiCard
                text={text}
                words={parseWords(words)}
                deleteUntil={deleteUntil > 0 ? deleteUntil : undefined}
                lineBreakAtChars={lineBreakAtChars > 0 ? lineBreakAtChars : undefined}
                onPress={() => {}}
                dataAttributes={{testid: 'ai-card'}}
            />
        </Box>
    </ResponsiveLayout>
);

Default.storyName = 'AiCard';
Default.args = {
    text: 'Lorem ipsum dolor sit amet, ',
    words: 'consectetur, praesent, tempor, aliquam',
    deleteUntil: 0,
    lineBreakAtChars: 0,
};
Default.argTypes = {
    deleteUntil: {control: {type: 'number', min: 0, step: 1}},
    lineBreakAtChars: {control: {type: 'number', min: 0, step: 1}},
};
