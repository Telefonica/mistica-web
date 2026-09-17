'use client';
import * as React from 'react';

export const CardSelectionContext = React.createContext<
    React.Dispatch<React.SetStateAction<Record<string, boolean>>> | undefined
>(undefined);

export const useCardSelection = (checked: boolean): void => {
    const setControls = React.useContext(CardSelectionContext);
    const id = React.useId();

    React.useEffect(() => {
        if (!setControls) {
            return;
        }
        setControls((controls) => ({...controls, [id]: checked}));
        return () => {
            setControls((controls) => {
                const nextControls = {...controls};
                delete nextControls[id];
                return nextControls;
            });
        };
    }, [checked, id, setControls]);
};
