import * as React from 'react';
import {Stack, Touchable, Form, TextField, useForm, ButtonPrimary, Text2} from '..';

export default {
    title: 'Patterns/Forms/Form with error handler',
};

type CardProps = {show: boolean; children: React.ReactNode; onPress: any};

const Card: React.FC<CardProps> = ({show, children, onPress}) => {
    return (
        <>
            <Touchable onPress={onPress} style={{background: 'lightgray', padding: 8}}>
                Card{!show && ' - click to open'}
            </Touchable>
            <div style={{display: show ? 'block' : 'none'}}>{children}</div>
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

            <Text2 as="pre" regular>
                ERRORS: {JSON.stringify(formErrors, null, 2)}
            </Text2>
        </Stack>
    );
};

export const Default: StoryComponent = () => {
    const [activeCard, setActiveCard] = React.useState(0);
    const [formData, setFormData] = React.useState<any>({});

    const handleSubmit = (data: any): Promise<void> =>
        // just a little delay to simulate a network call so you can see the
        // form disabled state and spinner
        new Promise((resolve) => {
            setTimeout(() => {
                setFormData(data);
                resolve();
            }, 1000);
        });

    const getCardIndexByFieldName = (name: string) => Number(name.split('-')[0]);

    return (
        <Stack space={16}>
            <Text2 regular>This story shows a Form with a custom handler for validation errors</Text2>

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

            <Text2 as="pre" regular>
                DATA: {JSON.stringify(formData, null, 2)}
            </Text2>
        </Stack>
    );
};

Default.storyName = 'Form with error handler';
