'use client';
import * as React from 'react';
import {SPACE, LEFT, UP, DOWN, RIGHT} from './utils/key-codes';
import {useControlProps} from './form-context';
import {combineRefs} from './utils/common';
import {Text3} from './text';
import Inline from './inline';
import classnames from 'classnames';
import {useAriaId, useTheme} from './hooks';
import {getPrefixedDataAttributes} from './utils/dom';
import * as styles from './radio-button.css';

import type {DataAttributes} from './utils/types';

type RadioContextType = {
    disabled?: boolean;
    selectedValue?: string | null;
    focusableValue?: string | null;
    select: (value: string) => void;
    selectNext: () => void;
    selectPrev: () => void;
};
const RadioContext = React.createContext<RadioContextType>({
    disabled: false,
    selectedValue: null,
    focusableValue: null,
    select: () => {},
    selectNext: () => {},
    selectPrev: () => {},
});
export const useRadioContext = (): RadioContextType => React.useContext(RadioContext);

type PropsRender = {
    value: string;
    id?: string;
    render: (renderProps: {
        controlElement: React.ReactElement;
        labelId: string;
        disabled: boolean;
        checked: boolean;
    }) => React.ReactNode;
    children?: undefined;
    dataAttributes?: DataAttributes;
    'aria-labelledby'?: string;
};

type PropsChildren = {
    value: string;
    id?: string;
    children?: React.ReactNode;
    render?: undefined;
    dataAttributes?: DataAttributes;
    'aria-labelledby'?: string;
};

const RadioButton: React.FC<PropsRender | PropsChildren> = ({
    value,
    id,
    dataAttributes,
    'aria-labelledby': ariaLabelledby,
    ...rest
}) => {
    const {disabled, selectedValue, focusableValue, select, selectNext, selectPrev} = useRadioContext();
    const labelId = useAriaId(ariaLabelledby);
    const ref = React.useRef<HTMLDivElement>(null);
    const checked = value === selectedValue;
    const tabIndex = focusableValue === value ? 0 : -1;
    const {isIos} = useTheme();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.keyCode) {
            case SPACE:
                select(value);
                event.preventDefault();
                event.stopPropagation();
                break;
            case RIGHT:
            case DOWN:
                selectNext();
                event.preventDefault();
                event.stopPropagation();
                break;
            case LEFT:
            case UP:
                selectPrev();
                event.preventDefault();
                event.stopPropagation();
                break;
            default:
            // do nothing
        }
    };

    const radio = (
        <div
            className={classnames(
                isIos ? styles.outerCircleVariants.ios : styles.outerCircleVariants.default,
                {
                    [styles.outerCircleCheckedVariants[isIos ? 'ios' : 'default']]: checked,
                    [styles.disabled]: disabled,
                }
            )}
        >
            {!isIos && (
                <div className={classnames(styles.innerCircle, {[styles.innerCircleChecked]: checked})} />
            )}
        </div>
    );

    return (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <span
            ref={ref}
            id={id}
            tabIndex={disabled ? undefined : tabIndex}
            role="radio"
            data-value={value}
            aria-checked={checked}
            aria-disabled={disabled}
            aria-labelledby={labelId}
            onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                    select(value);
                }
            }}
            onKeyDown={disabled ? undefined : handleKeyDown}
            className={disabled ? styles.radioButtonContainerDisabled : styles.radioButton}
            {...getPrefixedDataAttributes(dataAttributes, 'RadioButton')}
        >
            {rest.render ? (
                rest.render({controlElement: radio, disabled: !!disabled, checked, labelId})
            ) : (
                <Inline space={16}>
                    {/* Text3 wrapper added to have the same line-height and center checkbox with text and -2px to perfect pixel center icon  */}
                    <Text3 regular as="div">
                        <div style={{position: 'relative', top: -2}}>{radio}</div>
                    </Text3>
                    <Text3 regular as="div" id={labelId}>
                        <span className={disabled ? styles.disabled : ''}>{rest.children}</span>
                    </Text3>
                </Inline>
            )}
        </span>
    );
};

type RadioGroupProps = {
    name: string;
    disabled?: boolean;
    'aria-labelledby'?: string;
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    dataAttributes?: DataAttributes;
};

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const {
        value: valueContext,
        defaultValue,
        onChange: onChangeContext,
        focusableRef,
        disabled,
    } = useControlProps({
        name: props.name,
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        disabled: props.disabled,
    });

    const isControlledByParent = typeof valueContext !== 'undefined';

    // This state is needed because the component should be able to work outside a Form context
    const [value, setValue] = React.useState<string>(valueContext ?? defaultValue ?? '');

    // Propagate context value to inner state
    React.useEffect(() => {
        if (valueContext !== undefined) {
            setValue(valueContext);
        }
    }, [valueContext]);

    const onChange = (value: string) => {
        if (!isControlledByParent) {
            setValue(value);
        }
        onChangeContext(value);
    };

    const [firstRadioValue, setFirstRadioValue] = React.useState<string | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    const selectNext = () => {
        if (ref.current) {
            const checkedRadio: null | HTMLElement = ref.current.querySelector(
                '[role=radio][aria-checked=true]'
            );
            const allRadios: Array<HTMLElement> = Array.from(ref.current.querySelectorAll('[role=radio]'));
            if (allRadios.length === 0) {
                return;
            }
            const index = checkedRadio ? allRadios.indexOf(checkedRadio) : 0;
            const nextIndex = (index + 1) % allRadios.length;
            const nextRadio = allRadios[nextIndex];
            const value = nextRadio.dataset.value;
            if (value) {
                nextRadio.focus();
                onChange(value);
            }
        }
    };

    const selectPrev = () => {
        if (ref.current) {
            const checkedRadio: null | HTMLElement = ref.current.querySelector(
                '[role=radio][aria-checked=true]'
            );
            const allRadios: Array<HTMLElement> = Array.from(ref.current.querySelectorAll('[role=radio]'));
            if (allRadios.length === 0) {
                return;
            }
            const index = checkedRadio ? allRadios.indexOf(checkedRadio) : 0;
            const prevIndex = (allRadios.length + index - 1) % allRadios.length;
            const prevRadio = allRadios[prevIndex];
            const value = prevRadio.dataset.value;
            if (value) {
                prevRadio.focus();
                onChange(value);
            }
        }
    };

    React.useEffect(() => {
        if (ref.current) {
            const radio: null | HTMLElement = ref.current.querySelector('[role=radio]');
            if (radio) {
                setFirstRadioValue(radio.dataset.value ?? null);
            }
        }
    }, []);

    const focusableValue = value ?? firstRadioValue ?? null;

    return (
        <div
            ref={combineRefs(ref, focusableRef)}
            role="radiogroup"
            aria-labelledby={props['aria-labelledby']}
            {...getPrefixedDataAttributes(props.dataAttributes, 'RadioGroup')}
        >
            <RadioContext.Provider
                value={{
                    disabled,
                    selectedValue: value ?? defaultValue,
                    focusableValue,
                    select: onChange,
                    selectNext,
                    selectPrev,
                }}
            >
                {props.children}
            </RadioContext.Provider>
        </div>
    );
};

export default RadioButton;
