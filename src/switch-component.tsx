/*
This file is named "switch-component.tsx" instead of "switch.tsx" to workaround
this storybook bug:
https://github.com/storybookjs/storybook/issues/11980
*/
import * as React from 'react';
import {createUseStyles} from './jss';
import {getPlatform} from './utils/platform';
import debounce from 'lodash/debounce';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';
import classNames from 'classnames';
import {Inline, Text3} from '.';

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
                    ? theme.colors.controlActivated
                    : theme.colors.toggleAndroidBackgroundActive,
            },
            '&:after': {
                content: '""',
                backgroundColor: theme.colors.control,
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
                    return isIos ? theme.colors.toggleIosInactive : theme.colors.controlActivated;
                }
                return isIos ? theme.colors.toggleIosInactive : theme.colors.toggleAndroidInactive;
            },
            borderRadius: '50%',
            transition: `all ${SWITCH_ANIMATION}`,
            boxShadow: isIos ? '1px 2px 4px rgba(0, 0, 0, 0.3)' : '1px 1px 2px rgba(0, 0, 0, 0.3)',
        },
        container: {
            cursor: 'default',
        },
        disabled: {
            opacity: 0.5,
            pointerEvents: 'none',
        },
    };
});

type RenderSwitch = (switchElement: React.ReactElement<any>) => React.ReactNode;

type PropsRender = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    render: RenderSwitch;
    children?: undefined;
};

type PropsChildren = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    render?: undefined;
};

const Switch: React.FC<PropsRender | PropsChildren> = (props) => {
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
            {props.render ? (
                <>{props.render(switchEl)}</>
            ) : (
                <Inline space={16} alignItems="center">
                    {switchEl}
                    <Text3 regular as="div">
                        {props.children}
                    </Text3>
                </Inline>
            )}
        </span>
    );
};

export default Switch;
