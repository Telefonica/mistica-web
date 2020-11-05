import * as React from 'react';
import {Stack, SectionTitle, RadioGroup, RadioButton} from '..';

export default {
    title: 'Components/Forms/RadioButton',
};

export const Default: StoryComponent = () => {
    return (
        <>
            <SectionTitle id="label">Choose a fruit</SectionTitle>
            <RadioGroup name="juicy-fruit" aria-labelledby="label" defaultValue="banana">
                <Stack space={8}>
                    <RadioButton value="banana" render={(radio) => <span>Banana {radio}</span>} />
                    <RadioButton value="apple" render={(radio) => <span>Apple {radio}</span>} />
                </Stack>
            </RadioGroup>
        </>
    );
};

Default.storyName = 'RadioButton';
