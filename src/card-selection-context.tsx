'use client';
import * as React from 'react';

export type CardSelectionControl = {
    checked: boolean;
    surface?: boolean;
    role?: 'checkbox' | 'switch' | 'radio';
    disabled?: boolean;
    tabIndex?: number;
    value?: string;
    onPress?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type Controls = Record<string, CardSelectionControl>;

type SelectionContext = {
    setControls: React.Dispatch<React.SetStateAction<Controls>>;
    surfaceRef?: React.RefObject<HTMLDivElement | null>;
    promoteControl?: boolean;
    isFooter?: boolean;
};

export const CardSelectionContext = React.createContext<SelectionContext | undefined>(undefined);

type CardSelection = {
    context: SelectionContext & {surfaceRef: React.RefObject<HTMLDivElement | null>};
    control?: CardSelectionControl;
    isSelected?: boolean;
    isSelectionMode: boolean;
};

export const useSelectableCard = (selected?: boolean): CardSelection => {
    const [controls, setControls] = React.useState<Controls>({});
    const surfaceRef = React.useRef<HTMLDivElement>(null);
    const values = Object.values(controls);
    const control = values.length === 1 && values[0].surface ? values[0] : undefined;
    const isSelected = selected ?? (values.length ? values.some((control) => control.checked) : undefined);
    const promoteControl = !!control;
    const context = React.useMemo(() => ({setControls, surfaceRef, promoteControl}), [promoteControl]);
    return {context, control, isSelected, isSelectionMode: isSelected !== undefined};
};

export const useCardSelection = (
    checked: boolean,
    interaction?: Omit<CardSelectionControl, 'checked'>
): SelectionContext | undefined => {
    const context = React.useContext(CardSelectionContext);
    const setControls = context?.setControls;
    const id = React.useId();
    const interactionRef = React.useRef(interaction);
    interactionRef.current = interaction;
    const surface = !!context?.surfaceRef;
    const {role, disabled, tabIndex, value} = interaction || {};

    React.useEffect(() => {
        if (!setControls) {
            return;
        }
        setControls((controls) => ({
            ...controls,
            [id]: {
                checked,
                surface,
                role,
                disabled,
                tabIndex,
                value,
                onPress: () => interactionRef.current?.onPress?.(),
                onKeyDown: (event) => interactionRef.current?.onKeyDown?.(event),
            },
        }));
        return () => {
            setControls((controls) => {
                const nextControls = {...controls};
                delete nextControls[id];
                return nextControls;
            });
        };
    }, [checked, id, setControls, role, disabled, tabIndex, value, surface]);
    return context;
};
