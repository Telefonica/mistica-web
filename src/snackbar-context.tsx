'use client';
import * as React from 'react';
import {isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';
import {showNativeSnackbar} from './snackbar-native';

import type {ImperativeHandle, Props as SnackbarProps, SnackbarCloseHandler} from './snackbar';

type SnackbarEntry = SnackbarProps & {
    id: string;
};

const SnackbarContext = React.createContext<{
    snackbars: Array<SnackbarEntry>;
    setSnackbars: React.Dispatch<React.SetStateAction<Array<SnackbarEntry>>>;
}>({
    snackbars: [],
    setSnackbars: () => {},
});

const Snackbar = React.lazy(() => import(/* webpackChunkName: "snackbar" */ './snackbar'));

export const SnackbarRoot = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [snackbars, setSnackbars] = React.useState<Array<SnackbarEntry>>([]);
    const snackbarRef = React.useRef<ImperativeHandle & HTMLDivElement>(null);
    const isClosingRef = React.useRef(false);

    React.useEffect(() => {
        // multiple snackbars, close the current one
        if (snackbars.length > 1 && !isClosingRef.current) {
            isClosingRef.current = true;
            snackbarRef.current?.close({action: 'CONSECUTIVE'});
        }
    }, [snackbars]);

    const handleClose: SnackbarCloseHandler = ({action}) => {
        isClosingRef.current = false;
        setSnackbars((snackbars) => snackbars.slice(1));
        snackbars[0].onClose?.({action});
    };

    const value = React.useMemo(() => {
        return {
            snackbars,
            setSnackbars,
        };
    }, [snackbars]);

    const currentSnackbar = snackbars[0];

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            {!!currentSnackbar && (
                <React.Suspense fallback={null}>
                    <Snackbar
                        // remount when the snackbar changes. In native, this will make a new bridge call
                        key={currentSnackbar.id}
                        ref={snackbarRef}
                        message={currentSnackbar.message}
                        buttonText={currentSnackbar.buttonText}
                        buttonAccessibilityLabel={currentSnackbar.buttonAccessibilityLabel}
                        duration={currentSnackbar.duration}
                        type={currentSnackbar.type}
                        withDismiss={currentSnackbar.withDismiss}
                        dataAttributes={currentSnackbar.dataAttributes}
                        onClose={handleClose}
                    />
                </React.Suspense>
            )}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): {
    openSnackbar: (params: SnackbarProps) => void;
    snackbars: ReadonlyArray<Readonly<SnackbarEntry>>;
} => {
    const {snackbars, setSnackbars} = React.useContext(SnackbarContext);

    const openSnackbar = React.useCallback(
        (params: SnackbarProps) => {
            if (isWebViewBridgeAvailable()) {
                showNativeSnackbar(params).then(({action}) => {
                    params.onClose?.({action});
                });
            } else {
                const uniqueIdentifier = Date.now() + '-' + Math.random();
                setSnackbars((snackbars) => [...snackbars, {...params, id: uniqueIdentifier}]);
            }
        },
        [setSnackbars]
    );

    return {
        openSnackbar,
        snackbars,
    };
};
