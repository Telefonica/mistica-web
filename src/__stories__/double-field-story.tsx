import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {TextField, Select, DoubleField, Stack, FormTextField} from '..';
import {FormCreditCardNumberField} from '../form-credit-card-number-field';
import {FormCreditCardExpirationField, FormCvvField, FormSelect} from '../../playroom/components';

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
                    <FormCreditCardNumberField name="credit-card-number" label="Credit Card Number" />
                    <DoubleField>
                        <FormCreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                        <FormCvvField name="credit-card-cvv" label="CVV" />
                    </DoubleField>
                </Stack>
            </StorySection>

            <StorySection title="Compositions">
                <Stack space={16}>
                    <TextField label="Label" />
                    <FormSelect
                        name="fruit1"
                        helperText="Helper text"
                        label="Select fruit"
                        value={selectValue}
                        onChangeValue={setSelectValue}
                        options={fruitEntries.map(([text, value]) => ({text, value}))}
                    />
                    <DoubleField>
                        <FormTextField name="text" label="Label" />
                        <FormSelect
                            name="fruit2"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                    </DoubleField>
                    <FormTextField name="text1" label="Label" helperText="Helper text" />
                    <DoubleField>
                        <FormSelect
                            name="fruit3"
                            helperText="Helper text"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                        <FormTextField name="text2" label="Label" />
                    </DoubleField>
                    <FormTextField name="text3" label="Label" />
                    <DoubleField>
                        <FormTextField name="text4" label="Label" helperText="Single child" />
                    </DoubleField>
                    <DoubleField>
                        <FormTextField name="text5" label="Label" />
                        <FormTextField name="text6" label="Label" helperText="Helper text" />
                    </DoubleField>
                </Stack>
            </StorySection>
        </>
    );
};

Default.story = {name: 'Default'};

export const UsingTextFields: StoryComponent = () => {
    const [selectValue, setSelectValue] = React.useState('');
    return (
        <>
            <StorySection title="Credit Card Form">
                <Stack space={16}>
                    <TextField required type="credit-card-number" label="Credit Card Number" />
                    <DoubleField>
                        <TextField required type="credit-card-expiration" label="Expiration" />
                        <TextField required type="credit-card-cvv" label="CVV" />
                    </DoubleField>
                </Stack>
            </StorySection>

            <StorySection title="Compositions">
                <Stack space={16}>
                    <TextField required label="Label" />
                    <Select
                        required
                        helperText="Helper text"
                        label="Select fruit"
                        value={selectValue}
                        onChangeValue={setSelectValue}
                        options={fruitEntries.map(([text, value]) => ({text, value}))}
                    />
                    <DoubleField>
                        <TextField required label="Label" />
                        <Select
                            required
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                    </DoubleField>
                    <TextField required label="Label" helperText="Helper text" />
                    <DoubleField>
                        <Select
                            required
                            helperText="Helper text"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                        <TextField required label="Label" />
                    </DoubleField>
                    <TextField required label="Label" />
                    <DoubleField>
                        <TextField required label="Label" helperText="Single child" />
                    </DoubleField>
                    <DoubleField>
                        <TextField required label="Label" />
                        <TextField required label="Label" helperText="Helper text" />
                    </DoubleField>
                </Stack>
            </StorySection>
        </>
    );
};

UsingTextFields.story = {name: 'Using TextFields (deprecated)'};
