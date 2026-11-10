import * as React from 'react';
import {debounce} from '../utils/helpers';

export const Debounced = ({
    wait = 5000,
    leading,
    trailing,
    maxWait,
}: {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
}): JSX.Element => {
    const [calls, setCalls] = React.useState<Array<Array<number>>>([]);
    const callback = React.useMemo(
        () =>
            debounce(
                (value: number) => {
                    setCalls((calls) => [...calls, [value]]);
                    return value;
                },
                wait,
                {leading, trailing, maxWait}
            ),
        [wait, leading, trailing, maxWait]
    );
    React.useEffect(() => () => callback.cancel(), [callback]);
    return (
        <>
            {[1, 2, 3, 4].map((value) => (
                <button key={value} onClick={() => callback(value)}>
                    {value}
                </button>
            ))}
            <button onClick={() => callback.cancel()}>cancel</button>
            <button onClick={() => callback.flush()}>flush</button>
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
        </>
    );
};
