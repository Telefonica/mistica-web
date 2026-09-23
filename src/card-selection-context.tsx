'use client';
import * as React from 'react';

import type {ExclusifyUnion} from './utils/utility-types';

type ControlProps = {
    name?: string;
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
};

export type CardSelectionProps = ExclusifyUnion<
    {checkbox: ControlProps} | {switch: ControlProps} | {radioValue: string}
>;

export type CardSelectionControl = {
    checked: boolean;
    role?: 'checkbox' | 'switch' | 'radio';
    disabled?: boolean;
    tabIndex?: number;
    value?: string;
    onPress?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type SelectionContext = {
    setControl: React.Dispatch<React.SetStateAction<CardSelectionControl | undefined>>;
    surfaceRef?: React.RefObject<HTMLDivElement | null>;
    promoteControl?: boolean;
};

export const CardSelectionContext = React.createContext<SelectionContext | undefined>(undefined);

type CardSelection = {
    context: SelectionContext & {surfaceRef: React.RefObject<HTMLDivElement | null>};
    control?: CardSelectionControl;
    isSelected?: boolean;
    isSelectionMode: boolean;
};

export const useSelectableCard = (selected?: boolean, hasSelector = false): CardSelection => {
    const [control, setControl] = React.useState<CardSelectionControl>();
    const surfaceRef = React.useRef<HTMLDivElement>(null);
    const isSelected = selected ?? (hasSelector ? control?.checked ?? false : undefined);
    const promoteControl = !!control;
    const context = React.useMemo(() => ({setControl, surfaceRef, promoteControl}), [promoteControl]);
    return {
        context,
        control: hasSelector ? control : undefined,
        isSelected,
        isSelectionMode: isSelected !== undefined,
    };
};

export const useCardSelection = (
    checked: boolean,
    interaction?: Omit<CardSelectionControl, 'checked'>
): SelectionContext | undefined => {
    const context = React.useContext(CardSelectionContext);
    const setControl = context?.setControl;
    const interactionRef = React.useRef(interaction);
    interactionRef.current = interaction;
    const {role, disabled, tabIndex, value} = interaction || {};

    React.useEffect(() => {
        if (!setControl) {
            return;
        }
        setControl({
            checked,
            role,
            disabled,
            tabIndex,
            value,
            onPress: () => interactionRef.current?.onPress?.(),
            onKeyDown: (event) => interactionRef.current?.onKeyDown?.(event),
        });
        return () => setControl(undefined);
    }, [checked, setControl, role, disabled, tabIndex, value]);
    return context;
};
