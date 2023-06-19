import * as React from 'react';
import {Box, Image, skinVars} from '..';
import usingVrImg from './images/using-vr.jpg';

import type {AspectRatio} from '../image';

const aspectRatioOptions = ['0', '1:1', '4:3', '7:10', '16:9'];

export default {
    title: 'Components/Primitives/Image',
    argTypes: {
        aspectRatio: {
            options: aspectRatioOptions,
            control: {type: 'select'},
        },
    },
};

type Args = {
    aspectRatio: string;
    width: string;
    height: string;
    borderRadius: boolean;
    isValidSource: boolean;
};

export const Default: StoryComponent<Args> = ({aspectRatio, width, height, borderRadius, isValidSource}) => {
    return (
        <Box padding={16} dataAttributes={{testid: 'image-story'}}>
            <div
                style={{
                    resize: 'both',
                    overflow: 'auto',
                    width: 320,
                    border: `1px solid ${skinVars.colors.border}`,
                    padding: 16,
                }}
            >
                <Image
                    src={isValidSource ? usingVrImg : 'broken-image'}
                    aspectRatio={aspectRatio === '0' ? 0 : (aspectRatio as AspectRatio)}
                    width={width || 'auto'}
                    height={height || 'auto'}
                    noBorderRadius={!borderRadius}
                />
            </div>
        </Box>
    );
};

Default.storyName = 'Image';

Default.args = {
    aspectRatio: '0',
    width: 'auto',
    height: 'auto',
    borderRadius: true,
    isValidSource: true,
};
