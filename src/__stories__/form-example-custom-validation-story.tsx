import * as React from 'react';
import {Stack, Touchable, Form, TextField, useForm, ButtonPrimary, Text7} from '..';

export default {
    title: 'Components/Forms/Example Custom Validator',
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
    const {formErrors} = useForm();

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
            <ButtonPrimary submit>Send</ButtonPrimary>

            <pre>ERRORS: {JSON.stringify(formErrors, null, 2)}</pre>
        </Stack>
    );
};

export const CustomValidationForm: StoryComponent = () => {
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

    const getCardIndexByFieldName = (name: string) => Number(name.split('-')[0]);

    return (
        <Stack space={16}>
            <Text7 regular>This story shows a Form with a custom handler for validation errors</Text7>

            <Form
                onValidationErrors={(errors) => {
                    const firstErrorFieldName = Object.keys(errors)[0];
                    setActiveCard(getCardIndexByFieldName(firstErrorFieldName));
                }}
                initialValues={formData}
                onSubmit={handleSubmit}
            >
                <Cards activeCard={activeCard} setActiveCard={setActiveCard} />
            </Form>

            <pre>DATA: {JSON.stringify(formData, null, 2)}</pre>
        </Stack>
    );
};
