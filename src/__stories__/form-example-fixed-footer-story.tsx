import * as React from 'react';
import {Stack, ButtonPrimary, Form, Text7, FixedFooterLayout, Text5, Box} from '..';

export default {
    title: 'Components/Forms/Example Fixed Footer',
};

export const FixedFooterForm: StoryComponent = () => {
    const [count, setCount] = React.useState(0);
    return (
        <Form onSubmit={() => setCount((count) => count + 1)}>
            <FixedFooterLayout
                footer={
                    <Box padding={16}>
                        <ButtonPrimary submit>Submit</ButtonPrimary>
                    </Box>
                }
            >
                <Stack space={32}>
                    <Text7 regular>
                        Use a mobile viewport to check this story. The submit button will be rendered inside a
                        Portal.
                    </Text7>
                    <Text5 medium>Form was submitted {count} times</Text5>
                </Stack>
            </FixedFooterLayout>
        </Form>
    );
};
