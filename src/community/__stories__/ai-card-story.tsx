import * as React from 'react';
import AiCard from '../ai-card';
import Box from '../../box';
import ResponsiveLayout from '../../responsive-layout';
import IconArtificialIntelligenceFilled from '../../generated/mistica-icons/icon-artificial-intelligence-filled';
import {vars} from '../../skins/skin-contract.css';

export default {
    title: 'Community/Vivo/AiCard',
    parameters: {fullScreen: true},
};

const assetOptions: Record<string, React.ReactElement> = {
    'AI Icon (gradient)': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M6.53957 16.0123C6.71957 15.6223 7.26973 15.6223 7.44973 16.0123L8.23977 17.7623L9.99953 18.5523C10.3894 18.7324 10.3895 19.2825 9.99953 19.4625L8.24953 20.2525L7.45949 22.0123C7.27949 22.4022 6.71964 22.4021 6.53957 22.0123L5.74953 20.2623L3.99953 19.4722C3.60953 19.2922 3.60953 18.7421 3.99953 18.5621L5.74953 17.772L6.53957 16.0123ZM15.0073 5.99861C15.3574 5.21869 16.4767 5.21864 16.8267 5.99861L18.4165 9.49861L21.9165 11.0885C22.6965 11.4485 22.6965 12.5588 21.9165 12.9088L18.4165 14.4986L16.8267 17.9986C16.4666 18.7783 15.3575 18.7783 15.0073 17.9986L13.4165 14.4986L9.91652 12.9088C9.13679 12.5487 9.13685 11.4386 9.91652 11.0885L13.4165 9.49861L15.0073 5.99861ZM4.33254 1.97322C4.5126 1.58347 5.06166 1.58347 5.24172 1.97322L6.03176 3.72322L7.7925 4.51326C8.18211 4.69337 8.18215 5.24334 7.7925 5.42342L6.0425 6.21345L5.25246 7.97322C5.07248 8.36318 4.5126 8.3631 4.33254 7.97322L3.5425 6.22322L1.7925 5.43318C1.4025 5.25318 1.4025 4.70302 1.7925 4.52302L3.5425 3.73299L4.33254 1.97322Z"
                fill="url(#ai-icon-gradient)"
            />
            <defs>
                <linearGradient
                    id="ai-icon-gradient"
                    x1="18.84"
                    y1="5.30652"
                    x2="5.4224"
                    y2="18.9388"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#AE42E4" />
                    <stop offset="0.32" stopColor="#BD4AFF" />
                    <stop offset="1" stopColor="#EF7E9C" />
                </linearGradient>
            </defs>
        </svg>
    ),
    'AI Icon (brand)': <IconArtificialIntelligenceFilled color={vars.colors.textBrand} />,
};

type Args = {
    text: string;
    words: string | Array<string>;
    deleteChars: number;
    lineBreakAtChars: number;
    borderColor: string;
    asset: string;
};

const parseWords = (raw: string | Array<string>): Array<string> =>
    Array.isArray(raw)
        ? raw.map((w) => String(w).trim()).filter(Boolean)
        : String(raw)
              .split(',')
              .map((word) => word.trim())
              .filter(Boolean);

export const Default: StoryComponent<Args> = ({
    text,
    words,
    deleteChars,
    lineBreakAtChars,
    borderColor,
    asset,
}) => (
    <ResponsiveLayout>
        <Box paddingY={24}>
            <AiCard
                text={text}
                words={parseWords(words)}
                deleteChars={deleteChars > 0 ? deleteChars : undefined}
                lineBreakAtChars={lineBreakAtChars > 0 ? lineBreakAtChars : undefined}
                borderColor={borderColor || undefined}
                asset={assetOptions[asset]}
                onPress={() => {}}
                dataAttributes={{testid: 'ai-card'}}
            />
        </Box>
    </ResponsiveLayout>
);

Default.storyName = 'AiCard';
Default.args = {
    text: 'Lorem ipsum dolor sit amet, ',
    words: ['consectetur', 'praesent', 'tempor', 'aliquam'],
    deleteChars: 0,
    lineBreakAtChars: 0,
    borderColor: 'linear-gradient(200deg, #AE42E459 17.51%, #BD4AFF59 38.3%, #EB3C7D59 82.5%)',
    asset: 'AI Icon (gradient)',
};
Default.argTypes = {
    deleteChars: {control: {type: 'number', min: 0, step: 1}},
    lineBreakAtChars: {control: {type: 'number', min: 0, step: 1}},
    borderColor: {control: {type: 'text'}},
    words: {
        control: {type: 'array'},
        description: 'List of words for the AiCard animation.',
    },
    asset: {
        options: Object.keys(assetOptions),
        control: {type: 'select'},
    },
};
