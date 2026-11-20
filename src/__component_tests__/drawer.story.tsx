import * as React from 'react';
import Drawer from '../drawer';

export const Actions = (): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [calls, setCalls] = React.useState<Array<string>>([]);
    const record = (action: string) => setCalls((calls) => [...calls, action]);
    return (
        <>
            <button onClick={() => setOpen(true)}>open</button>
            {open && (
                <Drawer
                    dismissLabel="CustomDismissLabel"
                    onDismiss={() => record('dismiss')}
                    onClose={() => setOpen(false)}
                    button={{text: 'Primary', onPress: () => record('primary')}}
                    secondaryButton={{text: 'Secondary', onPress: () => record('secondary')}}
                    buttonLink={{text: 'Link', onPress: () => record('link')}}
                />
            )}
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
        </>
    );
};
