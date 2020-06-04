// @flow
import * as React from 'react';
import {StorySection, fruitEntries} from './helpers';
import {TextField, Select, DoubleField, Stack} from '..';

export default {
    title: 'Components|DoubleField',
    component: DoubleField,
};

export const Examples = (): React.Node => {
    const [selectValue, setSelectValue] = React.useState('');
    return (
        <>
            <StorySection title="Credit Card Form">
                <Stack space={32}>
                    <TextField type="credit-card-number" label="Credit Card Number" />
                    <DoubleField>
                        <TextField type="credit-card-expiration" label="Expiration" />
                        <TextField type="credit-card-cvv" label="CVV" />
                    </DoubleField>
                </Stack>
            </StorySection>

            <StorySection title="Compositions">
                <Stack space={32}>
                    <TextField label="Label" />
                    <Select
                        helperText="Helper text"
                        label="Select fruit"
                        value={selectValue}
                        onChangeValue={setSelectValue}
                        options={fruitEntries.map(([text, value]) => ({text, value}))}
                    />
                    <DoubleField>
                        <TextField label="Label" />
                        <Select
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                    </DoubleField>
                    <TextField label="Label" helperText="Helper text" />
                    <DoubleField>
                        <Select
                            helperText="Helper text"
                            label="Select fruit"
                            value={selectValue}
                            onChangeValue={setSelectValue}
                            options={fruitEntries.map(([text, value]) => ({text, value}))}
                        />
                        <TextField label="Label" />
                    </DoubleField>
                    <TextField label="Label" />
                    <DoubleField>
                        <TextField label="Label" helperText="Single child" />
                    </DoubleField>
                    <DoubleField>
                        <TextField label="Label" />
                        <TextField label="Label" helperText="Helper text" />
                    </DoubleField>
                </Stack>
            </StorySection>
        </>
    );
};
