import * as React from 'react';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';
import IconCheckbox from './icons/icon-checkbox';

type Props = {
    name: string;
    render?: (checkboxElement: React.ReactElement) => React.ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id?: string;
};

const FormCheckbox: React.FC<Props> = (props) => {
    const {defaultChecked, checked, onChange, focusableRef} = useControlProps({
        name: props.name,
        checked: props.checked,
        defaultChecked: props.defaultChecked,
        onChange: props.onChange,
    });

    const [checkedState, setCheckedState] = React.useState(!!defaultChecked);

    const handleChange = () => {
        if (checked === undefined) {
            setCheckedState(!checkedState);
            onChange(!checkedState);
        } else {
            onChange(!checked);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === SPACE) {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    return (
        <div
            id={props.id}
            role="checkbox"
            aria-checked={checked ?? checkedState}
            onKeyDown={handleKeyDown}
            onClick={handleChange}
            tabIndex={0}
            ref={focusableRef}
        >
            {props.render ? (
                props.render(<IconCheckbox checked={checked ?? checkedState} />)
            ) : (
                <IconCheckbox checked={checked ?? checkedState} />
            )}
        </div>
    );
};

export default FormCheckbox;
