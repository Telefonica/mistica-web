import * as React from 'react';
import {ButtonPrimary, Form, Checkbox, TextLink} from '..';

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
            <Checkbox
                name="checkbox"
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
    return <Checkbox name="checkbox" checked={checked} onChange={setChecked} />;
};
export const FormToggle = ({controlled = false}: {controlled?: boolean}): JSX.Element => {
    const [submission, setSubmission] = React.useState<unknown>();
    return (
        <>
            <Form
                initialValues={controlled ? {switch: true} : {checkbox: true}}
                onSubmit={(values, rawValues) => setSubmission([values, rawValues])}
            >
                {controlled ? <ControlledToggle /> : <Checkbox name="checkbox" />}
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
                <Checkbox name="checkbox" defaultChecked={false} />
            </button>
            <input type="hidden" data-testid="parent-calls" value={calls} />
        </>
    );
};
export const WithLink = (): JSX.Element => (
    <Checkbox name="checkbox">
        Accept <TextLink href="#terms-and-conditions">terms and conditions</TextLink>
    </Checkbox>
);
