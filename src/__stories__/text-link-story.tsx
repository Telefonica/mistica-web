import * as React from 'react';
import {TextLink, Stack, Text3, useTheme} from '..';
import {StorySection} from './helpers';
import {ThemeVariant} from '../theme-variant-context';

export default {
    title: 'Components/Text link',
    component: TextLink,
};

type textLinkArgs = {
    text: string;
    inverse: boolean;
};

const Container: React.FC<{inverse?: boolean}> = ({children, inverse = false}) => {
    const {colors} = useTheme();
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    padding: 16,
                    background: inverse ? colors.backgroundBrand : colors.background,
                }}
            >
                <Stack space={16}>{children}</Stack>
            </div>
        </ThemeVariant>
    );
};

export const Default: StoryComponent<textLinkArgs> = ({text, inverse}) => {
    const [count, setCount] = React.useState(0);
    return (
        <div data-testid="text-link">
            <Container inverse={inverse}>
                <StorySection title="TextLink">
                    <TextLink href="https://web.tuenti.com/">{text}</TextLink>
                </StorySection>

                <StorySection title="TextLink small">
                    <TextLink small href="https://web.tuenti.com/">
                        {text}
                    </TextLink>
                </StorySection>

                <StorySection title="TextLink opened in new tab">
                    <Stack space={16}>
                        <Text3 regular as="p">
                            Use TextLink with 'newTab' prop for all links that takes the user out off webapp.
                            The main reason is because it's prepared, in terms of accessibility, to inform
                            users that uses a screen reader, that we are going to open a new tab if they click
                            the link.
                        </Text3>
                        <TextLink href="https://web.tuenti.com/" newTab>
                            {text}
                        </TextLink>
                    </Stack>
                </StorySection>

                <StorySection title="TextLink in a paragraph">
                    <Text3 regular>
                        Want to find out more about any of our offers? You’re in the right place. If you’re
                        interested in phone stock availability, check out our{' '}
                        <TextLink href="https://www.o2.co.uk/help/pay-monthly/how-to-track-your-order" newTab>
                            How to track your order page
                        </TextLink>{' '}
                        for the latest information.
                    </Text3>
                </StorySection>

                <StorySection title="TextLink with onPress">
                    <Stack space={16}>
                        <TextLink onPress={() => setCount(count + 1)}>{text}</TextLink>
                        <Text3 regular>Clicked {count} times</Text3>
                    </Stack>
                </StorySection>

                <StorySection title="TextLink disabled">
                    <TextLink disabled onPress={() => {}}>
                        Text
                    </TextLink>
                </StorySection>
            </Container>
        </div>
    );
};

Default.args = {
    text: 'this is a link',
    inverse: false,
};

Default.storyName = 'Text link';
