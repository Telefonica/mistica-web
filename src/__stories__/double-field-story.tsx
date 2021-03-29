import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {DoubleField, CreditCardExpirationField, CvvField, Select, TextField, Stack} from '..';
import SectionTitle from '../section-title';

export default {
    title: 'Components/Forms/DoubleField',
    component: DoubleField,
};
export const Default: StoryComponent = () => {
    const [selectValue, setSelectValue] = React.useState('');
    return (
        <>
            <StorySection title="Layouts">
                <SectionTitle>50/50</SectionTitle>
                <DoubleField layout="50/50">
                    <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                    <CvvField name="credit-card-cvv" label="CVV" />
                </DoubleField>
                <SectionTitle>60/40</SectionTitle>
                <DoubleField layout="60/40">
                    <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                    <CvvField name="credit-card-cvv" label="CVV" />
                </DoubleField>
                <SectionTitle>40/60</SectionTitle>
                <DoubleField layout="40/60">
                    <CvvField name="credit-card-cvv" label="CVV" />
                    <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                </DoubleField>
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

Default.storyName = 'Default';
