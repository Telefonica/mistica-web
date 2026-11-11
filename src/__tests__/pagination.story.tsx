import * as React from 'react';
import Pagination from '../pagination';

export const Pages = (props: React.ComponentProps<typeof Pagination>): JSX.Element => (
    <Pagination {...props} />
);
export const Changes = (props: React.ComponentProps<typeof Pagination>): JSX.Element => {
    const [calls, setCalls] = React.useState<Array<number>>([]);
    return (
        <>
            <Pagination {...props} onChange={(value) => setCalls((calls) => [...calls, value])} />
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
        </>
    );
};
