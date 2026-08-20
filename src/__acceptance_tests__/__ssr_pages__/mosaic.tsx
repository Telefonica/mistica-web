import * as React from 'react';
import {DataCard, HorizontalMosaic, Stack, VerticalMosaic} from '../../..';

const MosaicTest = (): JSX.Element => (
    <Stack space={16}>
        <HorizontalMosaic
            items={Array.from({length: 6}, (_, index) => (
                <DataCard size="snap" key={index} title={`Card ${index + 1}`} />
            ))}
        />
        <VerticalMosaic
            items={Array.from({length: 6}, (_, index) => (
                <DataCard size="snap" key={index} title={`Card ${index + 1}`} />
            ))}
        />
    </Stack>
);

export default MosaicTest;
