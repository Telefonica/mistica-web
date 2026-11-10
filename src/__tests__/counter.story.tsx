import * as React from 'react';
import Counter from '../counter';

export const Quantity = ({
    defaultValue,
    controlled = false,
    removable = false,
}: {
    defaultValue?: number;
    controlled?: boolean;
    removable?: boolean;
}): JSX.Element => {
    const [value, setValue] = React.useState(3);
    const [removals, setRemovals] = React.useState(0);
    return (
        <>
            <Counter
                min={3}
                max={5}
                defaultValue={defaultValue}
                value={controlled ? value : undefined}
                onChangeValue={controlled ? setValue : undefined}
                onRemove={removable ? () => setRemovals((count) => count + 1) : undefined}
            />
            <input type="hidden" data-testid="removals" value={removals} />
        </>
    );
};
