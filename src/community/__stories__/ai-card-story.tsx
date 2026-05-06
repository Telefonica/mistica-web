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
    deleteChars: number;
    lineBreakAtChars: number;
};

const parseWords = (raw: string): Array<string> =>
    raw
        .split(',')
        .map((word) => word.trim())
        .filter(Boolean);

export const Default: StoryComponent<Args> = ({text, words, deleteChars, lineBreakAtChars}) => (
    <ResponsiveLayout>
        <Box paddingY={24}>
            <AiCard
                text={text}
                words={parseWords(words)}
                deleteChars={deleteChars > 0 ? deleteChars : undefined}
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
    deleteChars: 0,
    lineBreakAtChars: 0,
};
Default.argTypes = {
    deleteChars: {control: {type: 'number', min: 0, step: 1}},
    lineBreakAtChars: {control: {type: 'number', min: 0, step: 1}},
};
