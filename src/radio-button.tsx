import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import {getPlatform} from './utils/platform';
import {SPACE, LEFT, UP, RIGHT} from './utils/key-codes';
import {DOWN} from '../dist/utils/key-codes';

const useStyles = createUseStyles((theme) => ({
    outerCircle: {
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: ({checked, isIos}) => (checked && isIos ? theme.colors.controlActive : '#fff'),
        border: ({checked, isIos}) =>
            checked
                ? isIos
                    ? 'initial'
                    : `2px solid ${theme.colors.controlActive}`
                : `1px solid ${theme.colors.border}`,
        width: 24,
        height: 24,
    },
    innerCircle: {
        borderRadius: '50%',
        width: 12,
        height: 12,
        background: ({checked, isIos}) => (checked && !isIos ? theme.colors.controlActive : '#fff'),
    },
}));

type RadioContextType = {
    selectedValue: string | null;
    focusableValue: string | null;
    select: (value: string) => void;
    selectNext: () => void;
    selectPrev: () => void;
};
const RadioContext = React.createContext<RadioContextType>({
    selectedValue: null,
    focusableValue: null,
    select: () => {},
    selectNext: () => {},
    selectPrev: () => {},
});
export const useRadioContext = (): RadioContextType => React.useContext(RadioContext);

type Props = {
    value: string;
    id?: string;
    render?: (radioElement: React.ReactElement<any>) => React.ReactNode;
};

const RadioButton: React.FC<Props> = ({value, id, render}) => {
    const {selectedValue, focusableValue, select, selectNext, selectPrev} = useRadioContext();
    const checked = value === selectedValue;
    const isFocusable = focusableValue === value;
    const theme = useTheme();
    const isIos = getPlatform(theme.platformOverrides) === 'ios';
    const classes = useStyles({checked, isIos});

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

    return (
        <div
            id={id}
            tabIndex={isFocusable ? 0 : -1}
            role="radio"
            data-value={value}
            aria-checked={checked}
            onClick={() => select(value)}
            onKeyDown={handleKeyDown}
        >
            {render ? <>{render(radio)}</> : radio}
        </div>
    );
};

type RadioGroupProps = {
    'aria-labelledby'?: string;
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const {children, value, defaultValue, onChange} = props;
    const [selectedValue, select] = React.useState<string | null>(() => value ?? defaultValue ?? null);
    const [fistRadioValue, setFirstRadioValue] = React.useState<string | null>(null);
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
            const prevIndex = (index - 1) % allRadios.length;
            const prevRadio = allRadios[prevIndex];
            const value = prevRadio.dataset.value;
            if (value) {
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

    const focusableValue = selectedValue ?? fistRadioValue ?? null;

    return (
        <div ref={ref} role="radiogroup" aria-labelledby={props['aria-labelledby']}>
            <RadioContext.Provider
                value={{selectedValue, focusableValue, select: handleSelect, selectNext, selectPrev}}
            >
                {children}
            </RadioContext.Provider>
        </div>
    );
};

export default RadioButton;
