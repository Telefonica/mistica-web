import * as React from 'react';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';
import IconCheckbox from './icons/icon-checkbox';
import {createUseStyles} from './jss';
import {Text6, Inline} from '.';
import {useAriaId} from './hooks';

type RenderProps = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id?: string;
    render?: (checkboxElement: React.ReactElement) => React.ReactElement<any, any>; // Seems like this is the type returned by React.FC
    children?: undefined;
};

type ChildrenProps = {
    name: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id?: string;
    render?: undefined;
    children: React.ReactNode;
};

const useStyles = createUseStyles(() => ({
    checkboxContainer: {
        cursor: 'default',
        display: 'inline',
    },
}));

const Checkbox: React.FC<RenderProps | ChildrenProps> = (props) => {
    const classes = useStyles();
    const labelId = useAriaId();
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
            aria-labelledby={labelId}
        >
            {props.render ? (
                props.render(iconCheckbox)
            ) : (
                <Inline space={16} alignItems="center">
                    {iconCheckbox}
                    {props.children && (
                        <Text6 regular as="div">
                            <span id={labelId}>{props.children}</span>
                        </Text6>
                    )}
                </Inline>
            )}
        </div>
    );
};

export default Checkbox;
