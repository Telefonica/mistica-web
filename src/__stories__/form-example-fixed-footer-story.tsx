import * as React from 'react';
import {Stack, ButtonPrimary, Form, Text2, FixedFooterLayout, Text4, Box} from '..';

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
                    <Text2 regular>
                        Use a mobile viewport to check this story. The submit button will be rendered inside a
                        Portal.
                    </Text2>
                    <Text4 medium>Form was submitted {count} times</Text4>
                </Stack>
            </FixedFooterLayout>
        </Form>
    );
};
