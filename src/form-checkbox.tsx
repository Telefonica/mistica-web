import * as React from 'react';
import {useTheme} from './hooks';
import {SPACE} from './utils/key-codes';
import {useControlProps} from './form-context';

const IconCheckbox = ({checked}: {checked: boolean}) => {
    const theme = useTheme();
    return (
        <div style={{display: 'inline-flex'}}>
            {checked ? (
                <svg role="presentation" width={24} height={24} viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                        <circle cx="11" cy="11" r="11" fill={theme.colors.controlActive} />
                        <path
                            fill="#FFF"
                            fillRule="nonzero"
                            d="M8.854 14.686c.303.348.843.35 1.15.005l5.387-6.086c.28-.316.25-.8-.066-1.08s-.8-.25-1.08.066l-4.799 5.445-1.688-1.94c-.277-.318-.76-.352-1.079-.074-.318.277-.352.76-.074 1.079l2.249 2.585z"
                        />
                    </g>
                </svg>
            ) : (
                <svg role="presentation" width={24} height={24} viewBox="0 0 24 24">
                    <circle
                        cx="11"
                        cy="11"
                        r="10.5"
                        fill="none"
                        fillRule="evenodd"
                        stroke="#DDD"
                        transform="translate(1 1)"
                    />
                </svg>
            )}
        </div>
    );
};

type Props = {
    name: string;
    render?: (checkboxElement: React.ReactElement) => React.ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    id: string;
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
