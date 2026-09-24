'use client';
import * as React from 'react';
import {useRadioContext} from './radio-button';

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

type CardSelection = {
    checkbox?: ControlProps;
    switch?: ControlProps;
    radioValue?: string;
    hasSelector: boolean;
    isSelected: boolean;
    isSelectionMode: boolean;
    onChange: () => void;
};

export const useSelectableCard = (
    selected: boolean | undefined,
    {
        checkbox,
        switch: switchProps,
        radioValue,
    }: {
        checkbox?: ControlProps;
        switch?: ControlProps;
        radioValue?: string;
    }
): CardSelection => {
    const config = checkbox || switchProps;
    const [checked, setChecked] = React.useState(!!config?.defaultValue);
    const radioContext = useRadioContext();
    const hasSelector = !!config || radioValue !== undefined;
    const isSelected =
        selected ??
        (radioValue !== undefined ? radioContext.selectedValue === radioValue : config?.value ?? checked);
    const onChange = () => {
        const value = !(config?.value ?? checked);
        if (config?.value === undefined) {
            setChecked(value);
        }
        config?.onChange?.(value);
    };

    return {
        checkbox,
        switch: switchProps,
        radioValue,
        hasSelector,
        isSelected,
        isSelectionMode: hasSelector || selected !== undefined,
        onChange,
    };
};
