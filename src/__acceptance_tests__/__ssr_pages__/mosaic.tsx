import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {HorizontalMosaic, SnapCard, Stack, VerticalMosaic} from '../../..';

const MosaicTest = (): JSX.Element => (
    <Stack space={16}>
        <HorizontalMosaic
            items={Array.from({length: 6}, (_, index) => (
                <SnapCard key={index} title={`Card ${index + 1}`} />
            ))}
        />
        <VerticalMosaic
            items={Array.from({length: 6}, (_, index) => (
                <SnapCard key={index} title={`Card ${index + 1}`} />
            ))}
        />
    </Stack>
);

export default MosaicTest;
