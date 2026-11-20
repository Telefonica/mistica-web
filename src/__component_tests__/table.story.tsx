import * as React from 'react';
import {Table, IconLightningRegular} from '..';

export const RowActions = (): JSX.Element => {
    const [calls, setCalls] = React.useState([0, 0]);
    return (
        <>
            <Table
                responsive="collapse-rows"
                content={[
                    {
                        cells: ['Slice of pizza'],
                        actions: calls.map((_, index) => ({
                            Icon: IconLightningRegular,
                            label: `action ${index + 1}`,
                            onPress: () =>
                                setCalls((calls) => calls.map((count, i) => count + Number(i === index))),
                        })),
                    },
                ]}
            />
            <input type="hidden" data-testid="action-calls" value={JSON.stringify(calls)} />
        </>
    );
};
