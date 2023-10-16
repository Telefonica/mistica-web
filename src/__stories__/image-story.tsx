import * as React from 'react';
import {Image} from '..';
import usingVrImg from './images/using-vr.jpg';

import type {AspectRatio} from '../image';

const typeOptions = ['width and height', 'width and aspect ratio', 'full width'];

export default {
    title: 'Components/Primitives/Image',
    argTypes: {
        type: {
            options: typeOptions,
            control: {type: 'select'},
        },
        width: {
            control: {type: 'range', min: 200, max: 800, step: 10},
            if: {arg: 'type', neq: 'full width'},
        },
        height: {
            control: {type: 'range', min: 200, max: 800, step: 10},
            if: {arg: 'type', eq: 'width and height'},
        },
        aspectRatio: {
            options: ['1 1', '16 9', '7 10', '4 3', '0'],
            control: {
                type: 'select',
                labels: {
                    '1 1': '1:1',
                    '16 9': '16:9',
                    '7 10': '7:10',
                    '4 3': '4:3',
                },
            },
            if: {arg: 'type', neq: 'width and height'},
        },
    },
};

type Args = {
    type: 'width and height' | 'width and aspect ratio' | 'full width';
    width: number;
    height: number;
    aspectRatio: string;
    borderRadius: boolean;
    isEmptySource: boolean;
};

export const Default: StoryComponent<Args> = ({
    type,
    width,
    height,
    aspectRatio,
    borderRadius,
    isEmptySource,
}) => {
    const props = {
        width: type !== 'full width' ? width : undefined,
        height: type === 'width and height' ? height : undefined,
        aspectRatio:
            type !== 'width and height'
                ? aspectRatio === '0'
                    ? 0
                    : (aspectRatio.replace(' ', ':') as AspectRatio)
                : undefined,
        noBorderRadius: borderRadius === false,
        dataAttributes: {testid: 'image'},
    };

    const image = <Image src={usingVrImg} {...props} />;
    const emptySourceImage = <Image src="" {...props} />;

    /**
     * For some reason, if we write this logic with a conditional (isEmptySource ? error : image),
     * the image element triggers an error when switching the isEmptySource control from true to false
     */
    return (
        <>
            {!isEmptySource && image}
            {isEmptySource && emptySourceImage}
        </>
    );
};

Default.storyName = 'Image';
Default.args = {
    type: 'width and height',
    width: 320,
    height: 240,
    aspectRatio: '1 1',
    borderRadius: true,
    isEmptySource: false,
};
