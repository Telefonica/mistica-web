/*
This file is named "switch-component.tsx" instead of "switch.tsx" to workaround
this storybook bug:
https://github.com/storybookjs/storybook/issues/11980
*/
import * as React from 'react';
import {createUseStyles} from './jss';
import {getPlatform} from './utils/platform';
import {applyAlpha} from './utils/color';
import debounce from 'lodash/debounce';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';
import classNames from 'classnames';

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
            width: isIos ? 51 : 34,
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
                height: isIos ? 31 : 14,
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
            top: isIos ? 6 : 1,
            bottom: 0,
            right: ({isChecked}) => {
                if (isChecked) {
                    return isIos ? 6 : 1;
                }
                return isIos ? 26 : 21;
            },
            display: 'block',
            width: isIos ? 27 : 20,
            height: isIos ? 27 : 20,
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
        disabled: {
            opacity: 0.5,
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
    disabled?: boolean;
};

const Switch: React.FC<Props> = (props) => {
    const {defaultValue, value, onChange, focusableRef, disabled} = useControlProps({
        name: props.name,
        value: props.checked,
        defaultValue: props.defaultChecked,
        onChange: props.onChange,
        disabled: props.disabled,
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
        // When the switch is disabled, it shouldn't be focusable
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <span
            role="switch"
            aria-checked={value ?? checkedState}
            onClick={disabled ? undefined : handleChange}
            onKeyDown={disabled ? undefined : handleKeyDown}
            tabIndex={disabled ? undefined : 0}
            ref={focusableRef}
            className={classNames(classes.container, {[classes.disabled]: disabled})}
            aria-disabled={disabled}
        >
            {props.render ? <>{props.render(switchEl)}</> : switchEl}
        </span>
    );
};

export default Switch;
