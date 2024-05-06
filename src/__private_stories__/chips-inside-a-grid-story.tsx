import * as React from 'react';
import {Box, Text3, Stack, Grid, Chip, Boxed} from '..';

export default {
    title: 'Private/Chips inside a grid',
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={8}>
            <Text3 regular as="p">
                Chips should expand to fit the container if they are inside a grid.
            </Text3>
            <Boxed width={300}>
                <Box padding={8} dataAttributes={{testid: 'chips'}}>
                    <Grid columns={2} gap={8}>
                        <Chip>default</Chip>
                        <Chip onPress={() => {}}>onPress</Chip>
                        <Chip href="#">href</Chip>
                        <Chip to="#">to</Chip>
                        <Chip active>active</Chip>
                    </Grid>
                </Box>
            </Boxed>
        </Stack>
    );
};

Default.storyName = 'Chips inside a grid';
