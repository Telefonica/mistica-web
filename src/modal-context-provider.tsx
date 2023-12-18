'use client';
import * as React from 'react';

type ModalState = {
    isModalOpen: boolean;
};

const ModalStateContext = React.createContext<ModalState>({isModalOpen: false});
const ModalStateSetterContext = React.createContext<(newState: Partial<ModalState>) => void>(() => {});

const ModalContextProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [modalState, setModalState] = React.useState<ModalState>({isModalOpen: false});

    const updateModalState = React.useCallback((newState: Partial<ModalState>) => {
        setModalState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    }, []);

    return (
        <ModalStateContext.Provider value={modalState}>
            <ModalStateSetterContext.Provider value={updateModalState}>
                {children}
            </ModalStateSetterContext.Provider>
        </ModalStateContext.Provider>
    );
};

export const useSetModalState = (): ((newModalState: Partial<ModalState>) => void) =>
    React.useContext(ModalStateSetterContext);

export const useSetModalStateEffect = (): void => {
    const setModalState = useSetModalState();
    React.useEffect(() => {
        setModalState({isModalOpen: true});
        return () => {
            setModalState({isModalOpen: false});
        };
    }, [setModalState]);
};

export const useModalState = (): ModalState => React.useContext(ModalStateContext);

export default ModalContextProvider;
