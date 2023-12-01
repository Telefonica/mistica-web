'use client';
import * as React from 'react';

type TooltipState = {
    openTooltipId: string | null;
};

type TooltipSetter = {
    openTooltip: (tooltipId: string) => void;
    closeTooltip: (tooltipId: string) => void;
};

const TooltipStateContext = React.createContext<TooltipState>({openTooltipId: null});
const TooltipStateSetterContext = React.createContext<TooltipSetter>({
    openTooltip: () => {},
    closeTooltip: () => {},
});

const TooltipContextProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    /**
     * We have to use a state and a ref to save the open tooltip id. If two targets (let's call them A and B) are next
     * to each other (without space between them), the mouseOver/mouseLeave events will be triggered almost at the same time.
     * Both tooltips will update their states, and it can happen that React decides to re-render B before A (i.e. it may first
     * set the openTooltipId to B, and then to null because of mouse leaving A, causing both tooltips to be hidden).
     *
     * Setting the value inside the ref allows us to update the active tooltip id without triggering any re-renders, so this
     * race condition won't happen. We also need the state with the active id because we want changes in this value to be
     * reactive (i.e. trigger a re-render in each tooltip instance so that they can be opened/hidden accordingly).
     */
    const [openTooltipId, setOpenTooltipId] = React.useState<string | null>(null);
    const openRef = React.useRef<string | null>(null);

    const openTooltip = React.useCallback((tooltipId: string) => {
        openRef.current = tooltipId;
        setOpenTooltipId(tooltipId);
    }, []);

    const closeTooltip = React.useCallback((tooltipId: string) => {
        if (openRef.current === tooltipId) {
            openRef.current = null;
            setOpenTooltipId(null);
        }
    }, []);

    return (
        <TooltipStateContext.Provider value={{openTooltipId}}>
            <TooltipStateSetterContext.Provider value={{openTooltip, closeTooltip}}>
                {children}
            </TooltipStateSetterContext.Provider>
        </TooltipStateContext.Provider>
    );
};

export const useTooltipState = (): TooltipState => React.useContext(TooltipStateContext);
export const useSetTooltipState = (): TooltipSetter => React.useContext(TooltipStateSetterContext);

export default TooltipContextProvider;
