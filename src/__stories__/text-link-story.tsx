import * as React from 'react';
import {TextLink, Stack, Text2} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Touchables/TextLink',
    component: TextLink,
};

export const Default: StoryComponent = () => {
    const [count, setCount] = React.useState(0);
    return (
        <div data-testid="text-link">
            <StorySection title="TextLink">
                <TextLink href="https://web.tuenti.com/">Text</TextLink>
            </StorySection>
            <StorySection title="TextLink small">
                <TextLink small href="https://web.tuenti.com/">
                    Text
                </TextLink>
            </StorySection>

            <StorySection title="TextLink opened in new tab">
                <Stack space={16}>
                    <Text2 regular as="p">
                        Use TextLink with 'newTab' prop for all links that takes the user out off webapp. The
                        main reason is because it's prepared, in terms of accessibility, to inform users that
                        uses a screen reader, that we are going to open a new tab if they click the link.
                    </Text2>
                    <TextLink href="https://web.tuenti.com/" newTab>
                        Text
                    </TextLink>
                </Stack>
            </StorySection>
            <StorySection title="TextLink with onPress">
                <Stack space={16}>
                    <TextLink style={{fontSize: '16px'}} onPress={() => setCount(count + 1)}>
                        Text
                    </TextLink>
                    <Text2 regular>Clicked {count} times</Text2>
                </Stack>
            </StorySection>
        </div>
    );
};

Default.storyName = 'TextLink';
