import * as React from 'react';
import {Stack, Touchable, Form, TextField, useForm, ButtonPrimary} from '..';

export default {
    title: 'Components/Forms/Form',
};

type CardProps = {show: boolean; children: React.ReactNode; onPress: any};

const Card: React.FC<CardProps> = ({show, children, onPress}) => {
    return (
        <>
            <Touchable onPress={onPress} style={{background: 'lightgray', padding: 8}}>
                Card{!show && ' - click to open'}
            </Touchable>
            <div style={{height: show ? 'auto' : 0, overflow: 'hidden'}}>{children}</div>
        </>
    );
};

const Cards: React.FC<any> = ({activeCard, setActiveCard}) => {
    const {validate, submit, formErrors, formStatus} = useForm();

    const getCardIndexByFieldName = (name: string) => Number(name.split('-')[0]);

    return (
        <Stack space={16}>
            <Card show={activeCard === 0} onPress={() => setActiveCard(0)}>
                <TextField name="0-foo" label="foo" />
            </Card>

            <Card show={activeCard === 1} onPress={() => setActiveCard(1)}>
                <TextField name="1-bar" label="bar" />
            </Card>

            <Card show={activeCard === 2} onPress={() => setActiveCard(2)}>
                <TextField name="2-baz" label="baz" />
            </Card>
            <ButtonPrimary
                onPress={() => {
                    const errors = validate();

                    const fieldNamesWithErrors = Object.keys(errors);
                    if (fieldNamesWithErrors.length > 0) {
                        // open first card containing a field with error
                        setActiveCard(getCardIndexByFieldName(fieldNamesWithErrors[0]));
                    } else {
                        submit();
                    }
                }}
                showSpinner={formStatus === 'sending'}
            >
                Send
            </ButtonPrimary>

            <pre>ERRORS: {JSON.stringify(formErrors, null, 2)}</pre>
        </Stack>
    );
};

export const ManualValidationAndSubmit: StoryComponent = () => {
    const [activeCard, setActiveCard] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});

    const handleSubmit = (data: any): Promise<void> =>
        // just a little delay to simulate a network call so you can see the
        // form disabled state and spinner
        new Promise((resolve) =>
            setTimeout(() => {
                setFormData(data);
                resolve();
            }, 1000)
        );

    return (
        <>
            <p>This story shows a Form with manual validation and submit</p>
            <style>{'ul, li{padding-bottom: 8px}'}</style>
            <ul>
                <li>
                    Instead of a <code>Button</code> with <code>submit</code> prop, the form uses a regular{' '}
                    <code>Button</code> with an <code>onPress</code> handler where the Form is validated and
                    submitted
                </li>
                <li>
                    See <code>onPress</code> handler of <code>Send</code> Button
                </li>
                <li>
                    <code>formStatus</code> is used to set the spinner
                </li>
            </ul>

            <Form initialValues={formData} onSubmit={handleSubmit}>
                <Cards activeCard={activeCard} setActiveCard={setActiveCard} />
            </Form>

            <pre>DATA: {JSON.stringify(formData, null, 2)}</pre>
        </>
    );
};
