import * as React from 'react';
import {Stack, Touchable, Form, FormTextField, useForm, ButtonPrimary} from '..';

export default {
    title: 'Components|Forms/FormMulti',
};

type CardProps = {show: boolean; children: React.ReactNode; onPress: any};

const Card: React.FC<CardProps> = ({show, children, onPress}) => {
    return (
        <>
            <Touchable onPress={onPress} style={{background: 'lightgray'}}>
                Card
            </Touchable>
            <div style={{height: show ? 'auto' : 0, overflow: 'hidden'}}>{children}</div>
        </>
    );
};

const Cards: React.FC<any> = ({activeCard, setActiveCard}) => {
    const {validate, submit, formErrors} = useForm();

    const updateActiveCard = (cardIndex: number) => {
        setActiveCard(cardIndex);
    };

    return (
        <Stack space={16}>
            <Card show={activeCard === 0} onPress={() => updateActiveCard(0)}>
                <FormTextField name="0-foo" label="foo" />
            </Card>

            <Card show={activeCard === 1} onPress={() => updateActiveCard(1)}>
                <FormTextField name="1-bar" label="bar" />
            </Card>

            <Card show={activeCard === 2} onPress={() => updateActiveCard(2)}>
                <FormTextField name="2-baz" label="baz" />
            </Card>
            <ButtonPrimary
                onPress={() => {
                    const errors = validate();
                    const fieldNamesWithErrors = Object.keys(errors);
                    if (!fieldNamesWithErrors.length) {
                        submit();
                    } else {
                        setActiveCard(+fieldNamesWithErrors[0].split('-')[0]);
                    }
                }}
            >
                Guardar
            </ButtonPrimary>

            <pre>ERRORS: {JSON.stringify(formErrors, null, 2)}</pre>
        </Stack>
    );
};

export const FormMulti: StoryComponent = () => {
    const [activeCard, setActiveCard] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});

    return (
        <>
            <Form initialValues={formData} onSubmit={setFormData}>
                <Cards activeCard={activeCard} setActiveCard={setActiveCard} />
            </Form>

            <pre>DATA: {JSON.stringify(formData, null, 2)}</pre>
        </>
    );
};
