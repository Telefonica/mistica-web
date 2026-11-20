import * as React from 'react';
import Overlay from '../overlay';

export const ClickPropagation = (): JSX.Element => {
    const [parentCalls, setParentCalls] = React.useState(0);
    const [overlayCalls, setOverlayCalls] = React.useState(0);
    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onClick={() => setParentCalls((count) => count + 1)}>
                <Overlay
                    onPress={() => setOverlayCalls((count) => count + 1)}
                    dataAttributes={{testid: 'overlay'}}
                />
            </div>
            <input type="hidden" data-testid="parent-calls" value={parentCalls} />
            <input type="hidden" data-testid="overlay-calls" value={overlayCalls} />
        </>
    );
};
