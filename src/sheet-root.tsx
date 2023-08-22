import * as React from 'react';
import {ActionsSheet, ActionsListSheet, InfoSheet, RadioListSheet} from './sheet';
import Image from './image';
import {useTheme} from './hooks';

import type {ExclusifyUnion, Id} from './utils/utility-types';

type InfoIcon = ExclusifyUnion<
    | {
          type: 'small' | 'regular';
          url: string;
          urlDark?: string;
      }
    | {type: 'bullet'}
>;

type SheetProps<T> = Id<
    {
        title?: string;
        subtitle?: string;
        description?: string;
    } & T
>;

type SheetPropsByType = {
    RADIO_LIST: SheetProps<{
        selectedId?: string;
        items: Array<{
            id: string;
            title?: string;
            description?: string;
            icon?: {
                size?: 'small' | 'large';
                url: string;
                urlDark?: string;
            };
        }>;
    }>;
    ACTIONS_LIST: SheetProps<{
        items: Array<{
            id: string;
            title: string;
            style?: 'normal' | 'destructive';
            icon?: {
                url: string;
                urlDark?: string;
            };
        }>;
    }>;
    INFO: SheetProps<{
        items: Array<{
            id: string;
            title: string;
            description?: string;
            icon: InfoIcon;
        }>;
    }>;
    ACTIONS: SheetProps<{
        button: {
            text: string;
        };
        secondaryButton?: {
            text: string;
        };
        link?: {
            text: string;
            withChevron?: boolean;
        };
    }>;
};

type SheetResultByType = {
    RADIO_LIST: {action: 'SUBMIT'; selectedId: string} | {action: 'DISMISS'};
    ACTIONS_LIST: {action: 'SUBMIT'; selectedId: string} | {action: 'DISMISS'};
    INFO: void;
    ACTIONS: {action: 'PRIMARY' | 'SECONDARY' | 'LINK' | 'DISMISS'};
};

type SheetType = keyof SheetPropsByType;

type SheetTypeWithProps<T extends SheetType> = Id<{type: T; props: SheetPropsByType[T]}>;

type SheetTypeWithPropsUnion = {
    [T in SheetType]: SheetTypeWithProps<T>;
}[SheetType];

export type NativeSheetImplementation = {
    [T in SheetType]: (props: SheetPropsByType[T]) => Promise<SheetResultByType[T]>;
};

type SheetPropsListener = (sheetProps: SheetTypeWithPropsUnion) => void;
type SheetPromiseResolve = <T>(
    value: T extends SheetType ? SheetResultByType[T] : 'You must provide a type parameter'
) => void;

let listener: SheetPropsListener | null = null;
let sheetPromiseResolve: SheetPromiseResolve | null = null;
let nativeImplementation: NativeSheetImplementation | null = null;

let isSheetOpen = false;
export const showSheet = <T extends SheetType>(
    sheetProps: SheetTypeWithProps<T>
): Promise<SheetResultByType[T]> => {
    if (nativeImplementation) {
        return nativeImplementation[sheetProps.type](sheetProps.props);
    }

    if (!listener) {
        return Promise.reject(new Error('Tried to show a Sheet but the SheetRoot component was not mounted'));
    }

    if (isSheetOpen) {
        return Promise.reject(new Error('Tried to show a Sheet but there is already one open'));
    }

    isSheetOpen = true;
    listener(sheetProps as SheetTypeWithPropsUnion);

    const sheetPromise = new Promise((resolve) => {
        sheetPromiseResolve = resolve;
    });

    sheetPromise.then(() => {
        isSheetOpen = false;
    });

    return sheetPromise as Promise<SheetResultByType[T]>;
};

// This is the subset of methods needed in @tef-novum/webview-bridge to implement all the sheet types
type WebviewBridge = {
    isWebViewBridgeAvailable: () => boolean;
    bottomSheetInfo: (props: SheetPropsByType['INFO']) => Promise<void>;
    bottomSheetActionSelector: (
        props: SheetPropsByType['ACTIONS_LIST']
    ) => Promise<SheetResultByType['ACTIONS_LIST']>;
    bottomSheetSingleSelector: (
        props: SheetPropsByType['RADIO_LIST']
    ) => Promise<SheetResultByType['RADIO_LIST']>;
    bottomSheetActions: (props: SheetPropsByType['ACTIONS']) => Promise<SheetResultByType['ACTIONS']>;
};

/**
 * Example usage:
 * ```
 * import * as webviewBridge from '@tef-novum/webview-bridge';
 *
 * const nativeImplementation = createNativeSheetImplementationFromWebviewBridge(webviewBridge);
 *
 * <SheetRoot nativeImplementation={nativeImplementation} />
 * ```
 */
export const createNativeSheetImplementationFromWebviewBridge = (
    webviewBridge: WebviewBridge
): NativeSheetImplementation | undefined => {
    if (webviewBridge.isWebViewBridgeAvailable()) {
        return {
            INFO: webviewBridge.bottomSheetInfo,
            ACTIONS_LIST: webviewBridge.bottomSheetActionSelector,
            RADIO_LIST: webviewBridge.bottomSheetSingleSelector,
            ACTIONS: webviewBridge.bottomSheetActions,
        };
    }
    return undefined;
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
            nativeImplementation = props.nativeImplementation;
            return () => {
                nativeImplementation = null;
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

    if (!sheetProps || props.nativeImplementation) {
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

    switch (sheetProps.type) {
        case 'INFO':
            return <InfoSheet {...sheetProps.props} onClose={handleClose} />;
        case 'ACTIONS_LIST':
            return <ActionsListSheet {...sheetProps.props} onClose={handleClose} onSelect={handleSelect} />;
        case 'RADIO_LIST':
            return (
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
        case 'ACTIONS':
            return (
                <ActionsSheet
                    {...sheetProps.props}
                    buttonLink={sheetProps.props.link}
                    onClose={handleClose}
                    onPressButton={handleSelect}
                />
            );
        default:
            // @ts-expect-error sheetProps is never. This switch is exhaustive.
            throw new Error(`Unknown sheet type: ${sheetProps.type}`);
    }
};

export default SheetRoot;
