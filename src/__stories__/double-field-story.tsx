import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {
    DoubleField,
    CreditCardExpirationField,
    CvvField,
    Select,
    TextField,
    Stack,
    CreditCardFields,
    Title1,
} from '..';

export default {
    title: 'Layout/Double field',
    component: DoubleField,
    parameters: {fullScreen: false},
};

type Args = {
    fullWidth: boolean;
};
export const Default: StoryComponent<Args> = ({fullWidth}) => {
    const [selectValue, setSelectValue] = React.useState('');
    return (
        <>
            <StorySection title="Layouts">
                <Title1 as="h2">50/50</Title1>
                <DoubleField fullWidth={fullWidth} layout="50/50">
                    <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                    <CvvField name="credit-card-cvv" label="CVV" />
                </DoubleField>
                <Title1 as="h2">60/40</Title1>
                <DoubleField fullWidth={fullWidth} layout="60/40">
                    <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                    <CvvField name="credit-card-cvv" label="CVV" />
                </DoubleField>
                <Title1 as="h2">40/60</Title1>
                <DoubleField fullWidth={fullWidth} layout="40/60">
                    <CvvField name="credit-card-cvv" label="CVV" />
                    <CreditCardExpirationField name="credit-card-expiration" label="Expiration" />
                </DoubleField>
            </StorySection>

            <StorySection title="Compositions">
                <Stack space={16}>
                    <TextField fullWidth={fullWidth} name="text" label="Label" />
                    <Select
                        name="fruit1"
                        helperText="Helper text"
                        label="Select fruit"
                        value={selectValue}
                        fullWidth={fullWidth}
                        onChangeValue={setSelectValue}
                        options={fruitEntries.map(([text, value]) => ({text, value}))}
                    />
                    <DoubleField fullWidth={fullWidth}>
                        <TextField name="text1" label="Label" />
                        <Select
                            name="fruit2"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                    </DoubleField>
                    <TextField fullWidth={fullWidth} name="text2" label="Label" helperText="Helper text" />
                    <DoubleField fullWidth={fullWidth}>
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
                    <TextField fullWidth={fullWidth} name="text4" label="Label" />
                    <DoubleField fullWidth={fullWidth}>
                        <TextField
                            fullWidth={fullWidth}
                            name="text5"
                            label="Label"
                            helperText="Single child"
                        />
                    </DoubleField>
                    <DoubleField fullWidth={fullWidth}>
                        <TextField fullWidth={fullWidth} name="text6" label="Label" />
                        <TextField
                            fullWidth={fullWidth}
                            name="text7"
                            label="Label"
                            helperText="Helper text"
                        />
                    </DoubleField>
                    <CreditCardFields />
                </Stack>
            </StorySection>
        </>
    );
};

Default.storyName = 'Double field';
Default.args = {
    fullWidth: false,
};
