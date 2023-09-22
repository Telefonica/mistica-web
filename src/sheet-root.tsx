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
        description?: string | Array<string>;
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

export type NativeSheetImplementation = typeof import('@tef-novum/webview-bridge')['bottomSheet'];

type SheetPropsListener = (sheetProps: SheetTypeWithPropsUnion) => void;
type SheetPromiseResolve = <T>(
    value: T extends SheetType ? SheetResultByType[T] : 'You must provide a type parameter'
) => void;

let listener: SheetPropsListener | null = null;
let sheetPromiseResolve: SheetPromiseResolve | null = null;
let nativeSheetImplementation: NativeSheetImplementation | null = null;

const showRadioListNativeSheet = ({
    title,
    subtitle,
    description,
    selectedId,
    items,
}: SheetPropsByType['RADIO_LIST']) =>
    (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: Array.isArray(description) ? description.join('\n') : description,
        content: [
            {
                type: 'LIST',
                id: 'list-0',
                listType: 'SINGLE_SELECTION',
                autoSubmit: true,
                selectedIds: typeof selectedId === 'string' ? [selectedId] : [],
                items,
            },
        ],
    }).then(({action, result}) => {
        if (action === 'SUBMIT') {
            return {
                action,
                selectedId: result[0].selectedIds[0],
            };
        } else {
            return {
                action,
                selectedId: null,
            };
        }
    });

const showActionsListNativeSheet = ({
    title,
    subtitle,
    description,
    items,
}: SheetPropsByType['ACTIONS_LIST']) =>
    (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: Array.isArray(description) ? description.join('\n') : description,
        content: [
            {
                type: 'LIST',
                id: 'list-0',
                listType: 'ACTIONS',
                autoSubmit: true,
                selectedIds: [],
                items,
            },
        ],
    }).then(({action, result}) => {
        if (action === 'SUBMIT') {
            return {
                action,
                selectedId: result[0].selectedIds[0],
            };
        } else {
            return {
                action,
                selectedId: null,
            };
        }
    });

const showInfoNativeSheet = async ({title, subtitle, description, items}: SheetPropsByType['INFO']) => {
    await (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: Array.isArray(description) ? description.join('\n') : description,
        content: [
            {
                type: 'LIST',
                id: 'list-0',
                listType: 'INFORMATIVE',
                autoSubmit: false,
                selectedIds: [],
                items,
            },
        ],
    });
};

const showActionsNativeSheet = async ({
    title,
    subtitle,
    description,
    button,
    secondaryButton,
    link,
}: SheetPropsByType['ACTIONS']) => {
    return (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: Array.isArray(description) ? description.join('\n') : description,
        content: [
            {
                type: 'BOTTOM_ACTIONS',
                id: 'bottom-actions-0',
                button,
                secondaryButton,
                link,
            },
        ],
    }).then(({action, result}) => {
        if (action === 'SUBMIT') {
            const bottomActionsResult = result.find(({id}) => id === 'bottom-actions-0');
            const pressedAction = bottomActionsResult?.selectedIds[0];
            if (pressedAction === 'PRIMARY' || pressedAction === 'SECONDARY' || pressedAction === 'LINK') {
                return {
                    action: pressedAction,
                };
            }
        }
        return {
            action: 'DISMISS',
        };
    });
};

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
        let nativeResponse: Promise<SheetResultByType[T]>;
        const {type, props} = sheetProps as SheetTypeWithPropsUnion;
        switch (type) {
            case 'INFO':
                nativeResponse = showInfoNativeSheet(props) as Promise<SheetResultByType[T]>;
                break;
            case 'ACTIONS_LIST':
                nativeResponse = showActionsListNativeSheet(props) as Promise<SheetResultByType[T]>;
                break;
            case 'RADIO_LIST':
                nativeResponse = showRadioListNativeSheet(props) as Promise<SheetResultByType[T]>;
                break;
            case 'ACTIONS':
                nativeResponse = showActionsNativeSheet(props) as Promise<SheetResultByType[T]>;
                break;
            default:
                const unknownType: never = type;
                throw new Error(`Unknown sheet type: ${unknownType}`);
        }
        return nativeResponse.catch((error) => {
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
