import * as React from 'react';
import {Box, DateField, DateTimeField, Form} from '..';
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

    return (
        <Form onSubmit={() => alert({message: 'Success!'})}>
            <SectionTitle>Date Field with range</SectionTitle>
            <DateField
                name="date"
                label="Date with limits"
                min={min}
                max={max}
                helperText={`min: ${getLocalDateString(min)} / max: ${getLocalDateString(max)}`}
            />

            <SectionTitle>DateTime Field with range</SectionTitle>
            <DateTimeField
                name="datetime"
                label="DateTime with limits"
                min={min}
                max={max}
                helperText={`min: ${getLocalDateTimeString(min)} / max: ${getLocalDateTimeString(max)}`}
            />

            <Box paddingTop={32}>
                <ButtonPrimary submit>Validate</ButtonPrimary>
            </Box>
        </Form>
    );
};
