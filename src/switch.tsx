import * as React from 'react';
import {createUseStyles} from './jss';
import {getPlatform} from './utils/platform';
import {applyAlpha} from './utils/color';
import debounce from 'lodash/debounce';
import {SPACE} from './utils/key-codes';
import {render} from 'react-dom';

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
            border: isIos ? `1px solid ${applyAlpha(theme.colors.borderDark, 0.3)}` : undefined,
            '& > *': {pointerEvents: 'none'},
            borderColor: ({isChecked}) =>
                isChecked && isIos ? 'transparent' : applyAlpha(theme.colors.borderDark, 0.3),
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
            top: isIos ? 6 : 0,
            bottom: 0,
            right: ({isChecked}) => {
                if (isChecked) {
                    return isIos ? 6 : 0;
                }
                return isIos ? 20 : 21;
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
    };
});

type RenderSwitch = (switchElement: React.ReactElement<any>) => React.ReactNode;

type UncontrolledProps = {
    render?: RenderSwitch;
    defaultChecked?: boolean;
    checked?: undefined;
    onChange?: (checked: boolean) => void;
};

type ControlledProps = {
    render?: RenderSwitch;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

type Props = ControlledProps | UncontrolledProps;

const Switch: React.FC<Props> = (props) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(() =>
        props.checked !== undefined ? props.checked : !!props.defaultChecked
    );

    if (props.checked !== undefined && props.checked !== isChecked) {
        setIsChecked(props.checked);
    }

    const classes = useStyles({isChecked});

    const notifyChange = debounce(() => {
        if (props.onChange) {
            props.onChange(isChecked);
        }
    }, 300);

    const handleChange = () => {
        setIsChecked((prevValue) => {
            const newValue = !prevValue;
            if (props.onChange) {
                if (props.checked !== undefined) {
                    props.onChange(newValue);
                } else {
                    notifyChange();
                }
            }
            return newValue;
        });
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
        <div
            role="checkbox"
            aria-checked={isChecked}
            onClick={handleChange}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {props.render ? <>{props.render(switchEl)}</> : switchEl}
        </div>
    );
};

export default Switch;
