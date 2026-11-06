import * as React from 'react';
import {ButtonPrimary, Form, CreditCardFields} from '..';

export const Payment = (): JSX.Element => {
    const [errors, setErrors] = React.useState<Array<unknown>>([]);
    const [submissions, setSubmissions] = React.useState<Array<unknown>>([]);
    return (
        <>
            <Form
                onValidationErrors={(error) => setErrors((errors) => [...errors, error])}
                onSubmit={(values, rawValues) =>
                    setSubmissions((submissions) => [...submissions, [values, rawValues]])
                }
            >
                <CreditCardFields />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
            <input type="hidden" data-testid="errors" value={JSON.stringify(errors)} />
            <input type="hidden" data-testid="submissions" value={JSON.stringify(submissions)} />
        </>
    );
};
