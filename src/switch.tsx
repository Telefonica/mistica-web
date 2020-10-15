import * as React from 'react';
import {createUseStyles} from './jss';
import {getPlatform} from './utils/platform';
import {applyAlpha} from './utils/color';
import debounce from 'lodash/debounce';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';

const SWITCH_ANIMATION = '0.2s ease-in 0s';

const useStyles = createUseStyles((theme) => {
    const isIos = getPlatform(theme.platformOverrides) === 'ios';
    return {
        checkbox: {
            display: 'inline-block',
            padding: isIos ? 0 : 4,
        },
        switchCheckboxContainer: {
            position: 'relative',
            width: isIos ? 40 : 34,
            userSelect: 'none',
        },
        switchCheckboxLabel: {
            display: 'block',
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: 40,
            '& > *': {pointerEvents: 'none'},
        },
        bar: {
            display: 'block',
            width: '200%',
            marginLeft: ({isChecked}) => (isChecked ? 0 : '-100%'),
            transition: `margin ${SWITCH_ANIMATION}`,

            '&:before, &:after': {
                display: 'block',
                float: 'left',
                width: '50%',
                height: isIos ? 24 : 14,
                boxSizing: 'border-box',
            },
            '&:before': {
                content: '""',
                backgroundColor: isIos
                    ? theme.colors.toggleIosBackgroundActive
                    : theme.colors.toggleAndroidBackgroundActive,
            },
            '&:after': {
                content: '""',
                backgroundColor: isIos
                    ? theme.colors.toggleIosBackgroundInactive
                    : theme.colors.toggleAndroidBackgroundInactive,
            },
        },
        ball: {
            position: 'absolute',
            top: isIos ? 5 : 1,
            bottom: 0,
            right: ({isChecked}) => {
                if (isChecked) {
                    return isIos ? 5 : 1;
                }
                return 21;
            },
            display: 'block',
            width: isIos ? 22 : 20,
            height: isIos ? 22 : 20,
            margin: -4,
            backgroundColor: ({isChecked}) => {
                if (isChecked) {
                    return isIos ? theme.colors.toggleIosInactive : theme.colors.toggleAndroidActive;
                }
                return isIos ? theme.colors.toggleIosInactive : theme.colors.toggleAndroidInactive;
            },
            borderRadius: '50%',
            transition: `all ${SWITCH_ANIMATION}`,
            boxShadow: isIos
                ? `1px 2px 4px ${applyAlpha(theme.colors.layerDecorations, 0.3)}`
                : `1px 1px 2px ${applyAlpha(theme.colors.layerDecorations, 0.3)}`,
        },
        container: {
            cursor: 'default',
        },
    };
});

type RenderSwitch = (switchElement: React.ReactElement<any>) => React.ReactNode;

type Props = {
    name: string;
    render?: RenderSwitch;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
};

const Switch: React.FC<Props> = (props) => {
    const {defaultValue, value, onChange, focusableRef} = useControlProps({
        name: props.name,
        value: props.checked,
        defaultValue: props.defaultChecked,
        onChange: props.onChange,
    });

    const [checkedState, setCheckedState] = React.useState(!!defaultValue);

    const classes = useStyles({isChecked: value ?? checkedState});

    const notifyChange = React.useMemo(() => {
        if (process.env.NODE_ENV === 'test') {
            return (value: boolean) => onChange?.(value);
        } else {
            return debounce((value: boolean) => {
                onChange?.(value);
            }, 300);
        }
    }, [onChange]);

    const handleChange = () => {
        if (value !== undefined) {
            onChange?.(!value);
        } else {
            setCheckedState(!checkedState);
            notifyChange(!checkedState);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const switchEl = (
        <div className={classes.checkbox}>
            <div className={classes.switchCheckboxContainer}>
                <div className={classes.switchCheckboxLabel}>
                    <span className={classes.bar} />
                    <span className={classes.ball} />
                </div>
            </div>
        </div>
    );

    return (
        <span
            role="checkbox"
            aria-checked={value ?? checkedState}
            onClick={handleChange}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={focusableRef}
            className={classes.container}
        >
            {props.render ? <>{props.render(switchEl)}</> : switchEl}
        </span>
    );
};

export default Switch;
