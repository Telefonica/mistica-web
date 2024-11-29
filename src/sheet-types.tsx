export type NativeSheetImplementation = (typeof import('@tef-novum/webview-bridge'))['bottomSheet'];

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

export type SheetPropsByType = {
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
        button?: {
            text: string;
        };
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

export type SheetType = keyof SheetPropsByType;

export type SheetResultByType = {
    RADIO_LIST: {action: 'SUBMIT'; selectedId: string} | {action: 'DISMISS'};
    ACTIONS_LIST: {action: 'SUBMIT'; selectedId: string} | {action: 'DISMISS'};
    INFO: {action: 'DISMISS'};
    ACTIONS: {action: 'PRIMARY' | 'SECONDARY' | 'LINK' | 'DISMISS'};
};

export type SheetTypeWithProps<T extends SheetType> = Id<{type: T; props: SheetPropsByType[T]}>;

export type SheetTypeWithPropsUnion = {
    [T in SheetType]: SheetTypeWithProps<T>;
}[SheetType];

export type SheetPromiseResolve = <T>(
    value: T extends SheetType ? SheetResultByType[T] : 'You must provide a type parameter'
) => void;
