import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {
    DoubleField,
    CreditCardExpirationField,
    CreditCardNumberField,
    CvvField,
    Select,
    TextField,
    Stack,
} from '..';

export default {
    title: 'Components|Forms/DoubleField',
    component: DoubleField,
};
export const Default: StoryComponent = () => {
    const [selectValue, setSelectValue] = React.useState('');
    return (
        <>
            <StorySection title="Credit Card Form">
                <Stack space={16}>
                    <CreditCardNumberField name="credit-card-number" label="Credit Card Number" />
                    <DoubleField>
                        <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                        <CvvField name="credit-card-cvv" label="CVV" />
                    </DoubleField>
                </Stack>
            </StorySection>

            <StorySection title="Compositions">
                <Stack space={16}>
                    <TextField name="text" label="Label" />
                    <Select
                        name="fruit1"
                        helperText="Helper text"
                        label="Select fruit"
                        value={selectValue}
                        onChangeValue={setSelectValue}
                        options={fruitEntries.map(([text, value]) => ({text, value}))}
                    />
                    <DoubleField>
                        <TextField name="text1" label="Label" />
                        <Select
                            name="fruit2"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                    </DoubleField>
                    <TextField name="text2" label="Label" helperText="Helper text" />
                    <DoubleField>
                        <Select
                            name="fruit3"
                            helperText="Helper text"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                        <TextField name="text3" label="Label" />
                    </DoubleField>
                    <TextField name="text4" label="Label" />
                    <DoubleField>
                        <TextField name="text5" label="Label" helperText="Single child" />
                    </DoubleField>
                    <DoubleField>
                        <TextField name="text6" label="Label" />
                        <TextField name="text7" label="Label" helperText="Helper text" />
                    </DoubleField>
                </Stack>
            </StorySection>
        </>
    );
};

Default.story = {name: 'Default'};
