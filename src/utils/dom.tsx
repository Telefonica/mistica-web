import {isServerSide} from './environment';

/**
 * Returns true if provided type is supported <input> type
 */
export const isInputTypeSupported = (type: string): boolean => {
    if (isServerSide()) {
        return false;
    }
    const input = document.createElement('input');
    input.setAttribute('type', type);
    return input.type === type;
};

export const cancelEvent = (event: Event | React.SyntheticEvent): void => {
    event.stopPropagation();
    event.preventDefault();
};

export const createChangeEvent = (
    target: HTMLInputElement,
    value: string
): React.ChangeEvent<HTMLInputElement> => {
    const event = new Event('change') as any;
    target.value = value;
    return {...event, target, currentTarget: target};
};
