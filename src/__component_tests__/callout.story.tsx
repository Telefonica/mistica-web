import * as React from 'react';
import Callout from '../callout';

export const Closable = ({customLabel = false}: {customLabel?: boolean}): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    return (
        <>
            <Callout
                aria-label="some label"
                title={
                    customLabel ? 'some title' : {text: 'some title', 'aria-label': 'some title aria label'}
                }
                description="some description"
                onClose={() => setCalls((count) => count + 1)}
                closeButtonLabel={customLabel ? 'custom close label' : undefined}
            />
            <input type="hidden" data-testid="calls" value={calls} />
        </>
    );
};
export const Small = (): JSX.Element => (
    <Callout aria-label="some label" title="some title" description="some description" small />
);
