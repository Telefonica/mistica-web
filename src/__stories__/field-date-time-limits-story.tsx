import * as React from 'react';
import {Box, DateField, DateTimeField, Form, Stack, Text8} from '..';
import {ButtonPrimary} from '../button';
import {alert} from '../dialog';

import SectionTitle from '../section-title';
import {getLocalDateString, getLocalDateTimeString} from '../utils/time';

export default {
    title: 'Components/Forms/Fields',
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const DateTimeLimits: StoryComponent = () => {
    const min = new Date(Date.now() - 7 * ONE_DAY_IN_MS);
    const max = new Date(Date.now() + 7 * ONE_DAY_IN_MS);
    const [dateValue, setDateValue] = React.useState('');
    const [dateTimeValue, setDateTimeValue] = React.useState('');

    return (
        <Form onSubmit={() => alert({message: 'Success!'})}>
            <SectionTitle>Date Field with range</SectionTitle>
            <Stack space={16}>
                <DateField
                    name="date"
                    label="Date with limits"
                    min={min}
                    max={max}
                    helperText={`min: ${getLocalDateString(min)} / max: ${getLocalDateString(max)}`}
                    onChangeValue={setDateValue}
                />
                <Text8 regular>Selected value: {dateValue}</Text8>
            </Stack>

            <SectionTitle>DateTime Field with range</SectionTitle>
            <Stack space={16}>
                <DateTimeField
                    name="datetime"
                    label="DateTime with limits"
                    min={min}
                    max={max}
                    helperText={`min: ${getLocalDateTimeString(min)} / max: ${getLocalDateTimeString(max)}`}
                    onChangeValue={setDateTimeValue}
                />
                <Text8 regular>Selected value: {dateTimeValue}</Text8>
            </Stack>

            <Box paddingTop={32}>
                <ButtonPrimary submit>Validate</ButtonPrimary>
            </Box>
        </Form>
    );
};
