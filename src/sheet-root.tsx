'use client';
import * as React from 'react';

import type {
    NativeSheetImplementation,
    SheetPromiseResolve,
    SheetResultByType,
    SheetType,
    SheetTypeWithProps,
    SheetTypeWithPropsUnion,
} from './sheet-types';

const SheetWeb = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-web" */
            './sheet-web'
        )
);

let nativeSheetImplementation: NativeSheetImplementation | null = null;

let configureSheet: ((sheetProps: SheetTypeWithPropsUnion) => void) | null = null;
let resolveSheetPromise: SheetPromiseResolve | null = null;

let isSheetOpen = false;
export const showSheet = <T extends SheetType>(
    sheetProps: SheetTypeWithProps<T>
): Promise<SheetResultByType[T]> => {
    const activeElement = document.activeElement as HTMLElement;

    const focusTriggerElement = () => {
        activeElement?.focus();
    };

    const webImplementation = () => {
        if (!configureSheet) {
            return Promise.reject(
                new Error('Tried to show a Sheet but the SheetRoot component was not mounted')
            );
        }

        if (isSheetOpen) {
            return Promise.reject(new Error('Tried to show a Sheet but there is already one open'));
        }

        isSheetOpen = true;
        configureSheet(sheetProps as SheetTypeWithPropsUnion);

        const sheetPromise = new Promise((resolve) => {
            resolveSheetPromise = resolve;
        });

        sheetPromise.finally(() => {
            isSheetOpen = false;
            focusTriggerElement();
        });

        return sheetPromise as Promise<SheetResultByType[T]>;
    };

    if (nativeSheetImplementation) {
        const impl = nativeSheetImplementation;
        return import(/* webpackChunkName: "sheet-native" */ './sheet-native')
            .then(({showNativeSheet}) => {
                return showNativeSheet(impl, sheetProps).finally(() => {
                    focusTriggerElement();
                });
            })
            .catch((error) => {
                if (error.code === '400') {
                    // fallback to web implementation if native implementation doesn't support the sheet type
                    return webImplementation();
                } else {
                    throw error;
                }
            });
    } else {
        return webImplementation();
    }
};

type Props = {
    nativeImplementation?: NativeSheetImplementation;
    children?: React.ReactNode;
};

export const SheetRoot = (props: Props): JSX.Element => {
    const [sheetProps, setSheetProps] = React.useState<SheetTypeWithPropsUnion | null>(null);

    React.useEffect(() => {
        if (props.nativeImplementation) {
            nativeSheetImplementation = props.nativeImplementation;
            return () => {
                nativeSheetImplementation = null;
            };
        }
    }, [props.nativeImplementation]);

    React.useEffect(() => {
        configureSheet = <T extends SheetType>(newSheetProps: SheetTypeWithProps<T>) => {
            setSheetProps(newSheetProps as SheetTypeWithPropsUnion);
        };
        return () => {
            configureSheet = null;
        };
    }, []);

    return (
        <>
            {props.children}
            {sheetProps && (
                <React.Suspense fallback={null}>
                    <SheetWeb
                        sheetProps={sheetProps}
                        onResolve={(result) => {
                            setSheetProps(null);
                            resolveSheetPromise?.(result);
                        }}
                    />
                </React.Suspense>
            )}
        </>
    );
};

export default SheetRoot;
