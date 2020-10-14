import * as React from 'react';
import {Stack, SectionTitle, FormRadioGroup, FormRadioButton} from '..';

export default {
    title: 'Components|Forms/FormRadioButton',
};

export const Default: StoryComponent = () => {
    return (
        <>
            <SectionTitle id="label">Choose a fruit</SectionTitle>
            <FormRadioGroup name="juicy-fruit" aria-labelledby="label" defaultValue="banana">
                <Stack space={8}>
                    <FormRadioButton value="banana" render={(radio) => <span>Banana {radio}</span>} />
                    <FormRadioButton value="apple" render={(radio) => <span>Apple {radio}</span>} />
                </Stack>
            </FormRadioGroup>
        </>
    );
};

Default.story = {name: 'FormRadioButton'};
