import * as React from 'react';
import {Image, Stack, Text1, Text3} from '..';
import beachImg from '../__stories__/images/beach.jpg';

export default {
    title: 'Private/Image/Image sizes',
};

const cases = [
    {width: undefined, height: undefined, aspectRatio: undefined},
    {width: 200, height: undefined, aspectRatio: '7:10'},
    {width: undefined, height: 200, aspectRatio: '7:10'},
    {width: 200, height: undefined, aspectRatio: 0},
    {width: undefined, height: 200, aspectRatio: 0},
    {width: 200, height: 50, aspectRatio: 0}, // aspectRatio is ignored
    {width: 200, height: 50, aspectRatio: '7:10'}, // aspectRatio is ignored
    {width: '50%', height: undefined, aspectRatio: 1},
] as const;

const casesWithFixedHeightParent = [
    {width: '100%', height: '100%', aspectRatio: undefined},
    {width: '50%', height: '50%', aspectRatio: undefined},
    {width: '100%', height: undefined, aspectRatio: 2},
    {width: '50%', height: undefined, aspectRatio: 2},
    {width: undefined, height: '100%', aspectRatio: 0.5},
    {width: undefined, height: '50%', aspectRatio: 0.5},
];

type Args = {
    forceNonCssAspectRatio: boolean;
};

export const Default: StoryComponent<Args> = ({forceNonCssAspectRatio}) => {
    const getLabel = ({width, height, aspectRatio}: any) => {
        return `w:${width}, h:${height}, ar:${aspectRatio}`.replace(/%/g, 'percent');
    };

    const renderValue = (value: any, name: string) => (
        <>
            <Text1 medium>{name}: </Text1>
            <Text1 regular color="gray">
                {String(value)}
            </Text1>
            <Text1 medium>, </Text1>
        </>
    );

    const renderCase = ({width, height, aspectRatio}: any, index: number) => (
        <div key={index} aria-label={getLabel({width, height, aspectRatio})}>
            <>
                {renderValue(width, 'width')}
                {renderValue(height, 'height')}
                {renderValue(aspectRatio, 'aspectRatio')}
            </>
            <Image src={beachImg} {...{width, height, aspectRatio, forceNonCssAspectRatio}} />
        </div>
    );

    const renderFixedHeightCase = ({width, height, aspectRatio}: any, index: number) => (
        <div key={index} style={{width: 'fit-content'}} aria-label={getLabel({width, height, aspectRatio})}>
            <>
                {renderValue(width, 'width')}
                {renderValue(height, 'height')}
                {renderValue(aspectRatio, 'aspectRatio')}
            </>
            <div style={{width: 400, height: 400, border: '2px solid pink'}}>
                {forceNonCssAspectRatio && String(height).endsWith('%') && width === undefined ? (
                    <Text3 regular>Not supported</Text3>
                ) : (
                    <Image src={beachImg} {...{width, height, aspectRatio, forceNonCssAspectRatio}} />
                )}
            </div>
        </div>
    );

    return (
        <Stack space={16} dataAttributes={{testid: 'story'}}>
            <div style={{width: 400, border: '2px solid pink'}}>
                <Stack space={16}>{cases.map((props, index) => renderCase(props, index))}</Stack>
            </div>
            <Stack space={16}>
                {casesWithFixedHeightParent.map((props, index) => renderFixedHeightCase(props, index))}
            </Stack>
        </Stack>
    );
};

Default.args = {
    forceNonCssAspectRatio: false,
};

Default.storyName = 'Image sizes';
