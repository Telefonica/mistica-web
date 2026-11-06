import * as React from 'react';
import {useForm} from '../form-context';
const FormValue = () => {
    const {values} = useForm();
    return <input type="hidden" data-testid="form-value" value={String(values.switch)} />;
};
import {ButtonPrimary, Form, Switch} from '..';

export const Toggle = ({
    controlled = false,
    defaultChecked = false,
    handler = false,
}: {
    controlled?: boolean;
    defaultChecked?: boolean;
    handler?: boolean;
}): JSX.Element => {
    const [checked, setChecked] = React.useState(false);
    const [calls, setCalls] = React.useState<Array<boolean>>([]);
    return (
        <>
            <Switch
                name="switch"
                checked={controlled ? checked : undefined}
                defaultChecked={defaultChecked}
                onChange={
                    controlled || handler
                        ? (value) => {
                              setChecked(value);
                              setCalls((calls) => [...calls, value]);
                          }
                        : undefined
                }
            />
            <input type="hidden" data-testid="calls" value={JSON.stringify(calls)} />
        </>
    );
};
const ControlledToggle = () => {
    const [checked, setChecked] = React.useState(false);
    return <Switch name="switch" checked={checked} onChange={setChecked} />;
};
export const FormToggle = ({controlled = false}: {controlled?: boolean}): JSX.Element => {
    const [submission, setSubmission] = React.useState<unknown>();
    return (
        <>
            <Form
                initialValues={{switch: true}}
                onSubmit={(values, rawValues) => setSubmission([values, rawValues])}
            >
                {controlled ? <ControlledToggle /> : <Switch name="switch" />}
                <FormValue />
                <ButtonPrimary submit>done!</ButtonPrimary>
            </Form>
            <input type="hidden" data-testid="submission" value={JSON.stringify(submission) ?? ''} />
        </>
    );
};
export const Propagation = (): JSX.Element => {
    const [calls, setCalls] = React.useState(0);
    return (
        <>
            <button onClick={() => setCalls((count) => count + 1)}>
                <Switch name="switch" defaultChecked={false} />
            </button>
            <input type="hidden" data-testid="parent-calls" value={calls} />
        </>
    );
};
