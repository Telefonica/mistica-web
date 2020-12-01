import * as React from 'react';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';
import IconCheckbox from './icons/icon-checkbox';
import {createUseStyles} from './jss';

type Props = {
    name: string;
    render?: (checkboxElement: React.ReactElement) => React.ReactElement<any, any>; // Seems like this is the type returned by React.FC
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id?: string;
};

const useStyles = createUseStyles(() => ({
    checkboxContainer: {
        cursor: 'default',
        display: 'inline',
    },
}));

const Checkbox: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {defaultValue, value, onChange, focusableRef} = useControlProps({
        name: props.name,
        value: props.checked,
        defaultValue: props.defaultChecked,
        onChange: props.onChange,
    });

    const [checkedState, setCheckedState] = React.useState(!!defaultValue);

    const handleChange = () => {
        if (value === undefined) {
            setCheckedState(!checkedState);
            onChange(!checkedState);
        } else {
            onChange(!value);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const iconCheckbox = <IconCheckbox checked={value ?? checkedState} />;

    return (
        <div
            id={props.id}
            role="checkbox"
            aria-checked={value ?? checkedState}
            onKeyDown={handleKeyDown}
            onClick={handleChange}
            tabIndex={0}
            ref={focusableRef}
            className={classes.checkboxContainer}
        >
            {props.render ? props.render(iconCheckbox) : iconCheckbox}
        </div>
    );
};

export default Checkbox;
