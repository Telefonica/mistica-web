import * as React from 'react';
import {Form, DecimalField, ButtonPrimary} from '..';

export const DecimalForm = ({maxDecimals}: {maxDecimals?: number}): JSX.Element => {
    const [submission, setSubmission] = React.useState<unknown>();
    return (
        <>
            <Form onSubmit={(values, rawValues) => setSubmission([values, rawValues])}>
                <DecimalField label="Decimal" name="decimal" maxDecimals={maxDecimals} />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
            <input type="hidden" data-testid="submission" value={JSON.stringify(submission) ?? ''} />
        </>
    );
};
