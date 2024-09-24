'use client';
import * as React from 'react';
import Image from './image';
import {useTheme} from './hooks';

import type {
    NativeSheetImplementation,
    SheetResultByType,
    SheetType,
    SheetTypeWithProps,
    SheetTypeWithPropsUnion,
} from './sheet-types';

let nativeSheetImplementation: NativeSheetImplementation | null = null;

const ActionsSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-actions" */
            './sheet-actions'
        )
);

const InfoSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-info" */
            './sheet-info'
        )
);
const ActionsListSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-action-list" */
            './sheet-action-list'
        )
);

const RadioListSheet = React.lazy(
    () =>
        import(
            /* webpackChunkName: "sheet-radio-list" */
            './sheet-radio-list'
        )
);

type SheetPropsListener = (sheetProps: SheetTypeWithPropsUnion) => void;
type SheetPromiseResolve = <T>(
    value: T extends SheetType ? SheetResultByType[T] : 'You must provide a type parameter'
) => void;

let listener: SheetPropsListener | null = null;
let sheetPromiseResolve: SheetPromiseResolve | null = null;

let isSheetOpen = false;
export const showSheet = <T extends SheetType>(
    sheetProps: SheetTypeWithProps<T>
): Promise<SheetResultByType[T]> => {
    const webImplementation = () => {
        if (!listener) {
            return Promise.reject(
                new Error('Tried to show a Sheet but the SheetRoot component was not mounted')
            );
        }

        if (isSheetOpen) {
            return Promise.reject(new Error('Tried to show a Sheet but there is already one open'));
        }

        isSheetOpen = true;
        listener(sheetProps as SheetTypeWithPropsUnion);

        const sheetPromise = new Promise((resolve) => {
            sheetPromiseResolve = resolve;
        });

        sheetPromise.finally(() => {
            isSheetOpen = false;
        });

        return sheetPromise as Promise<SheetResultByType[T]>;
    };

    if (nativeSheetImplementation) {
        const impl = nativeSheetImplementation;
        return import(/* webpackChunkName: "sheet-native" */ './sheet-native')
            .then(({showNativeSheet}) => {
                return showNativeSheet(impl, sheetProps);
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
};

export const SheetRoot = (props: Props): React.ReactElement | null => {
    const {isDarkMode} = useTheme();
    const [sheetProps, setSheetProps] = React.useState<SheetTypeWithPropsUnion | null>(null);
    const selectionRef = React.useRef<string | null>(null);

    React.useEffect(() => {
        if (props.nativeImplementation) {
            nativeSheetImplementation = props.nativeImplementation;
            return () => {
                nativeSheetImplementation = null;
            };
        }
    }, [props.nativeImplementation]);

    React.useEffect(() => {
        listener = <T extends SheetType>(newSheetProps: SheetTypeWithProps<T>) => {
            selectionRef.current = null;
            setSheetProps(newSheetProps as SheetTypeWithPropsUnion);
        };
        return () => {
            listener = null;
        };
    }, []);

    if (!sheetProps) {
        return null;
    }

    const handleClose = () => {
        setSheetProps(null);
        switch (sheetProps.type) {
            case 'INFO':
                sheetPromiseResolve?.<'INFO'>(undefined);
                break;
            case 'ACTIONS_LIST':
                if (selectionRef.current) {
                    sheetPromiseResolve?.<'ACTIONS_LIST'>({
                        action: 'SUBMIT',
                        selectedId: selectionRef.current,
                    });
                } else {
                    sheetPromiseResolve?.<'ACTIONS_LIST'>({action: 'DISMISS'});
                }
                break;
            case 'RADIO_LIST':
                if (selectionRef.current) {
                    sheetPromiseResolve?.<'RADIO_LIST'>({action: 'SUBMIT', selectedId: selectionRef.current});
                } else {
                    sheetPromiseResolve?.<'RADIO_LIST'>({action: 'DISMISS'});
                }
                break;
            case 'ACTIONS':
                if (
                    selectionRef.current === 'PRIMARY' ||
                    selectionRef.current === 'SECONDARY' ||
                    selectionRef.current === 'LINK'
                ) {
                    sheetPromiseResolve?.<'ACTIONS'>({action: selectionRef.current});
                } else {
                    sheetPromiseResolve?.<'ACTIONS'>({action: 'DISMISS'});
                }
                break;
            default:
                // @ts-expect-error sheetProps is never
                throw new Error(`Unknown sheet type: ${sheetProps.type}`);
        }
    };

    const handleSelect = (id: string) => {
        selectionRef.current = id;
    };

    let element = <></>;

    switch (sheetProps.type) {
        case 'INFO':
            element = <InfoSheet {...sheetProps.props} onClose={handleClose} />;
            break;
        case 'ACTIONS_LIST':
            element = (
                <ActionsListSheet {...sheetProps.props} onClose={handleClose} onSelect={handleSelect} />
            );
            break;
        case 'RADIO_LIST':
            element = (
                <RadioListSheet
                    {...sheetProps.props}
                    items={sheetProps.props.items.map((item) => ({
                        ...item,
                        asset: item.icon && (
                            <Image
                                circular
                                src={isDarkMode && item.icon.urlDark ? item.icon.urlDark : item.icon.url}
                                width={item.icon.size === 'small' ? 24 : 40}
                            />
                        ),
                    }))}
                    onClose={handleClose}
                    onSelect={handleSelect}
                />
            );
            break;
        case 'ACTIONS':
            element = (
                <ActionsSheet
                    {...sheetProps.props}
                    buttonLink={sheetProps.props.link}
                    onClose={handleClose}
                    onPressButton={handleSelect}
                />
            );
            break;
        default:
            // @ts-expect-error sheetProps is never. This switch is exhaustive.
            throw new Error(`Unknown sheet type: ${sheetProps.type}`);
    }

    return <React.Suspense fallback={null}>{element}</React.Suspense>;
};

export default SheetRoot;
