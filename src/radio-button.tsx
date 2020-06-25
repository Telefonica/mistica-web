import * as React from 'react';
import {createUseStyles} from './jss';
import {useTheme} from './hooks';
import {getPlatform} from './utils/platform';

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

type RadioRegistration = {value: string; element: HTMLDivElement | null};
type RadioContextType = {
    selectedValue: string | null;
    focusableValue: string | null;
    select: (value: string) => void;
};
const RadioContext = React.createContext<RadioContextType>({
    selectedValue: null,
    focusableValue: null,
    select: () => {},
});
export const useRadioContext = (): RadioContextType => React.useContext(RadioContext);

type Props = {
    value: string;
    id?: string;
    render?: (radioElement: React.ReactElement<any>) => React.ReactNode;
};

const RadioButton: React.FC<Props> = ({value, id, render}) => {
    const {selectedValue, focusableValue, select} = useRadioContext();
    const checked = value === selectedValue;
    const isFocusable = focusableValue === value;
    const theme = useTheme();
    const isIos = getPlatform(theme.platformOverrides) === 'ios';
    const classes = useStyles({checked, isIos});

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
            onKeyDown={() => {}}
        >
            {render ? <>{render(radio)}</> : radio}
        </div>
    );
};

type RadioGroupProps = {
    id?: string;
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({children, id, value, defaultValue, onChange}) => {
    const [selectedValue, select] = React.useState<string | null>(() => value ?? defaultValue ?? null);
    const [fistRadioValue, setFirstRadioValue] = React.useState<string | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    const handleSelect = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }
        select(newValue);
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
        <div ref={ref} role="radiogroup" id={id}>
            <RadioContext.Provider value={{selectedValue, focusableValue, select: handleSelect}}>
                {children}
            </RadioContext.Provider>
        </div>
    );
};

export default RadioButton;
