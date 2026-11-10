import * as React from 'react';
import {Form, IbanField, ButtonPrimary, ThemeContextProvider} from '..';
import {makeTheme} from '../test-utils/theme';

export const IbanForm = (): JSX.Element => {
    const [errors, setErrors] = React.useState<Array<unknown>>([]);
    const [submissions, setSubmissions] = React.useState<Array<unknown>>([]);
    return (
        <ThemeContextProvider theme={makeTheme({texts: {formIbanError: 'invalid iban'}})}>
            <Form
                onSubmit={(values, rawValues) => setSubmissions((calls) => [...calls, [values, rawValues]])}
                onValidationErrors={(error) => setErrors((calls) => [...calls, error])}
            >
                <IbanField label="IBAN" name="iban" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
            <input type="hidden" data-testid="errors" value={JSON.stringify(errors)} />
            <input type="hidden" data-testid="submissions" value={JSON.stringify(submissions)} />
        </ThemeContextProvider>
    );
};
