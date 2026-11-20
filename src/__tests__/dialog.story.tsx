import * as React from 'react';
import {ThemeContextProvider, useDialog, Switch, Checkbox, RadioButton, RadioGroup} from '..';
import {makeTheme} from '../test-utils/theme';

export const withTheme = false;
const DialogButtons = ({
    onAccept = () => {},
    onCancel = () => {},
}: {
    onAccept?: () => void;
    onCancel?: () => void;
}) => {
    const {alert, confirm, dialog} = useDialog();
    const [error, setError] = React.useState('');
    const alertProps = {title: 'Title', message: 'Message', acceptText: 'Yay!', onAccept};
    const confirmProps = {
        ...alertProps,
        cancelText: 'Nope!',
        onCancel,
        closeButtonLabel: 'custom close label',
    };
    React.useEffect(() => {
        const probe = () => {
            try {
                alert(alertProps);
            } catch (error) {
                setError((error as Error).message);
            }
        };
        window.addEventListener('test-open-dialog', probe);
        return () => window.removeEventListener('test-open-dialog', probe);
    });
    return (
        <>
            <button onClick={() => alert(alertProps)}>Alert</button>
            <button onClick={() => confirm(confirmProps)}>Confirm</button>
            <button onClick={() => confirm({...confirmProps, onCancel: undefined})}>
                Confirm without onCancel
            </button>
            <button onClick={() => dialog(confirmProps)}>Dialog</button>
            <input type="hidden" data-testid="dialog-error" value={error} />
        </>
    );
};
export const Example = ({
    nested = false,
    missingTheme = false,
    ...props
}: {
    nested?: boolean;
    missingTheme?: boolean;
    onAccept?: () => void;
    onCancel?: () => void;
}): JSX.Element => {
    const content = <DialogButtons {...props} />;
    return missingTheme ? (
        content
    ) : (
        <ThemeContextProvider theme={makeTheme()}>
            {nested ? <ThemeContextProvider theme={makeTheme()}>{content}</ThemeContextProvider> : content}
        </ThemeContextProvider>
    );
};
export const Empty = (): JSX.Element => <ThemeContextProvider theme={makeTheme()} />;
const TriggerControl = ({kind}: {kind: 'switch' | 'checkbox' | 'radio'}) => {
    const {dialog} = useDialog();
    const open = () => dialog({message: 'Message'});
    return kind === 'switch' ? (
        <Switch name="notifications" aria-label="notifications" onChange={open} />
    ) : kind === 'checkbox' ? (
        <Checkbox name="terms" aria-label="terms" onChange={open} />
    ) : (
        <RadioGroup name="options" aria-label="options" onChange={open}>
            <RadioButton value="option" aria-label="option" />
        </RadioGroup>
    );
};
export const Trigger = ({kind}: {kind: 'switch' | 'checkbox' | 'radio'}): JSX.Element => (
    <ThemeContextProvider theme={makeTheme()}>
        <TriggerControl kind={kind} />
    </ThemeContextProvider>
);
