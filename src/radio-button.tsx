import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import {getPlatform} from './utils/platform';
import {SPACE, LEFT, UP, DOWN, RIGHT} from './utils/key-codes';
import {useControlProps} from './form-context';
import {combineRefs} from './utils/common';
import {Inline} from '.';

const useRadioButtonStyles = createUseStyles((theme) => ({
    outerCircle: {
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: ({checked, isIos}) =>
            checked && isIos ? theme.colors.controlActive : theme.colors.background,
        border: ({checked, isIos}) =>
            checked
                ? isIos
                    ? 'initial'
                    : `2px solid ${theme.colors.controlActive}`
                : `1px solid ${theme.colors.border}`,
        width: 24,
        height: 24,
        opacity: ({disabled}) => (disabled ? 0.5 : 1),
    },
    innerCircle: {
        borderRadius: '50%',
        width: 12,
        height: 12,
        background: ({checked, isIos}) =>
            checked && !isIos ? theme.colors.controlActive : theme.colors.background,
    },
    radioButton: {
        cursor: 'default',
        opacity: ({disabled}) => (disabled ? 0.5 : 1),
    },
}));

type RadioContextType = {
    disabled?: boolean;
    selectedValue: string | null;
    focusableValue: string | null;
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
    render?: (radioElement: React.ReactElement<any>, disabled?: boolean) => React.ReactNode;
    children?: undefined;
};

type PropsChildren = {
    value: string;
    id?: string;
    children?: React.ReactNode;
    render?: undefined;
};

const RadioButton: React.FC<PropsRender | PropsChildren> = ({value, id, ...rest}) => {
    const {disabled, selectedValue, focusableValue, select, selectNext, selectPrev} = useRadioContext();
    const ref = React.useRef<HTMLDivElement>(null);
    const checked = value === selectedValue;
    const tabIndex = focusableValue === value ? 0 : -1;
    const theme = useTheme();
    const isIos = getPlatform(theme.platformOverrides) === 'ios';
    const classes = useRadioButtonStyles({disabled, checked, isIos});

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
        <div className={classes.outerCircle}>
            <div className={classes.innerCircle} />
        </div>
    );

    const renderContent = (): React.ReactNode => {
        if (rest.render) {
            return rest.render(radio, disabled);
        }
        if (rest.children) {
            return (
                <Inline space={16} alignItems="center">
                    {radio}
                    {rest.children}
                </Inline>
            );
        }
        return radio;
    };

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
            onClick={disabled ? undefined : () => select(value)}
            onKeyDown={disabled ? undefined : handleKeyDown}
            className={classes.radioButton}
        >
            {renderContent()}
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
};

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const {value, defaultValue, onChange, focusableRef, disabled} = useControlProps({
        name: props.name,
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        disabled: props.disabled,
    });
    const [selectedValue, select] = React.useState<string | null>(() => value ?? defaultValue ?? null);
    const [firstRadioValue, setFirstRadioValue] = React.useState<string | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    const handleSelect = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }
        select(newValue);
    };

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
                handleSelect(value);
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
                handleSelect(value);
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

    const focusableValue = selectedValue ?? firstRadioValue ?? null;

    return (
        <div
            ref={combineRefs(ref, focusableRef)}
            role="radiogroup"
            aria-labelledby={props['aria-labelledby']}
        >
            <RadioContext.Provider
                value={{
                    disabled,
                    selectedValue,
                    focusableValue,
                    select: handleSelect,
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
