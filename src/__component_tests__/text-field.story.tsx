import * as React from 'react';
import TextField from '../text-field';
import {ButtonPrimary} from '../button';
import Form from '../form';

export const Uncontrolled = (): JSX.Element => <TextField label="Username" name="username" />;
export const Controlled = (): JSX.Element => {
    const [value, setValue] = React.useState('');
    return <TextField label="Username" name="username" value={value} onChangeValue={setValue} />;
};
export const Optional = (): JSX.Element => <TextField label="Email" name="email" optional />;
export const MaxLength = (): JSX.Element => {
    const [value, setValue] = React.useState('');
    const [submission, setSubmission] = React.useState<unknown>();
    return (
        <>
            <Form onSubmit={(values, rawValues) => setSubmission([values, rawValues])}>
                <TextField
                    label="Sort string"
                    name="sortstr"
                    value={value}
                    onChangeValue={setValue}
                    maxLength={5}
                />
                <ButtonPrimary onPress={() => setValue('1234567890')}>Write long string</ButtonPrimary>
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
            <input type="hidden" data-testid="submission" value={JSON.stringify(submission) ?? ''} />
        </>
    );
};
