import type {
    NativeSheetImplementation,
    SheetPropsByType,
    SheetResultByType,
    SheetType,
    SheetTypeWithProps,
    SheetTypeWithPropsUnion,
} from './sheet-types';

const normalizeDescriptionForNative = (description?: string | Array<string>): string | undefined => {
    if (Array.isArray(description)) {
        if (description.length) {
            return description.join('\n\n');
        } else {
            return undefined;
        }
    }
    return description;
};

const showRadioListNativeSheet = (
    nativeSheetImplementation: NativeSheetImplementation,
    {title, subtitle, description, selectedId, items}: SheetPropsByType['RADIO_LIST']
): Promise<SheetResultByType['RADIO_LIST']> => {
    return (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: normalizeDescriptionForNative(description),
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
};

const showActionsListNativeSheet = (
    nativeSheetImplementation: NativeSheetImplementation,
    {title, subtitle, description, items}: SheetPropsByType['ACTIONS_LIST']
): Promise<SheetResultByType['ACTIONS_LIST']> => {
    return (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: normalizeDescriptionForNative(description),
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
};

const showInfoNativeSheet = async (
    nativeSheetImplementation: NativeSheetImplementation,
    {title, subtitle, description, items, button}: SheetPropsByType['INFO']
): Promise<SheetResultByType['INFO']> => {
    const infoSheetContent = {
        type: 'LIST' as const,
        id: 'list-0',
        listType: 'INFORMATIVE' as const,
        autoSubmit: false,
        selectedIds: [],
        items,
    };

    return await (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: normalizeDescriptionForNative(description),
        content: button
            ? [
                  infoSheetContent,
                  {
                      type: 'BOTTOM_ACTIONS',
                      id: 'bottom-actions-0',
                      button,
                  },
              ]
            : [infoSheetContent],
    }).then(() => ({
        // this is an informative sheet, it can only be dismissed
        action: 'DISMISS',
    }));
};

const showActionsNativeSheet = (
    nativeSheetImplementation: NativeSheetImplementation,
    {title, subtitle, description, button, secondaryButton, link}: SheetPropsByType['ACTIONS']
): Promise<SheetResultByType['ACTIONS']> => {
    return (nativeSheetImplementation as NativeSheetImplementation)({
        title,
        subtitle,
        // TODO: add multiline support to native sheet
        description: normalizeDescriptionForNative(description),
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

export const showNativeSheet = <T extends SheetType>(
    nativeSheetImplementation: NativeSheetImplementation,
    sheetProps: SheetTypeWithProps<T>
): Promise<SheetResultByType[T]> => {
    let nativeResponse: Promise<SheetResultByType[T]>;
    const {type, props} = sheetProps as SheetTypeWithPropsUnion;
    switch (type) {
        case 'INFO':
            nativeResponse = showInfoNativeSheet(nativeSheetImplementation, props) as Promise<
                SheetResultByType[T]
            >;
            break;
        case 'ACTIONS_LIST':
            nativeResponse = showActionsListNativeSheet(nativeSheetImplementation, props) as Promise<
                SheetResultByType[T]
            >;
            break;
        case 'RADIO_LIST':
            nativeResponse = showRadioListNativeSheet(nativeSheetImplementation, props) as Promise<
                SheetResultByType[T]
            >;
            break;
        case 'ACTIONS':
            nativeResponse = showActionsNativeSheet(nativeSheetImplementation, props) as Promise<
                SheetResultByType[T]
            >;
            break;
        default:
            const unknownType: never = type;
            throw new Error(`Unknown sheet type: ${unknownType}`);
    }
    return nativeResponse;
};
