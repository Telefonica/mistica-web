import * as React from 'react';

type TooltipState = {
    openTooltipId: string | null;
};

type TooltipSetter = {
    open: (tooltipId: string) => void;
    close: (tooltipId: string) => void;
};

const TooltipStateContext = React.createContext<TooltipState>({openTooltipId: null});
const TooltipStateSetterContext = React.createContext<TooltipSetter>({open: () => {}, close: () => {}});

const TooltipContextProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [openTooltipId, setOpenTooltipId] = React.useState<string | null>(null);
    const openRef = React.useRef<string | null>(null);

    const open = React.useCallback((tooltipId: string) => {
        openRef.current = tooltipId;
        setOpenTooltipId(tooltipId);
    }, []);

    const close = React.useCallback((tooltipId: string) => {
        if (openRef.current === tooltipId) {
            openRef.current = null;
            setOpenTooltipId(null);
        }
    }, []);

    return (
        <TooltipStateContext.Provider value={{openTooltipId}}>
            <TooltipStateSetterContext.Provider value={{open, close}}>
                {children}
            </TooltipStateSetterContext.Provider>
        </TooltipStateContext.Provider>
    );
};

export const useTooltipState = (): TooltipState => React.useContext(TooltipStateContext);
export const useSetTooltipState = (): TooltipSetter => React.useContext(TooltipStateSetterContext);

export default TooltipContextProvider;
