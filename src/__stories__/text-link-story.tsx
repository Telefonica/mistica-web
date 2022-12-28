import * as React from 'react';
import {TextLink, Stack, Text3, Title1, Divider, useTheme, Text1, Text5, alert} from '..';
import {ThemeVariant} from '../theme-variant-context';

export default {
    title: 'Components/Text link',
    component: TextLink,
    parameters: {
        fullScreen: true,
    },
};

type textLinkArgs = {
    text: string;
    inverse: boolean;
};

const Section = ({title, children}: {title: string; children: React.ReactNode}): JSX.Element => {
    return (
        <Stack space={16}>
            <Title1>{title}</Title1>
            {children}
            <Divider />
        </Stack>
    );
};

export const Default: StoryComponent<textLinkArgs> = ({text, inverse}) => {
    const [count, setCount] = React.useState(0);
    const {colors} = useTheme();

    return (
        <div
            data-testid="text-link"
            style={{
                padding: 16,
                background: inverse ? colors.backgroundBrand : colors.background,
            }}
        >
            <ThemeVariant isInverse={inverse}>
                <Stack space={32}>
                    <Section title="TextLink">
                        <TextLink href="https://example.org">{text}</TextLink>
                    </Section>

                    <Section title="TextLink opened in new tab">
                        <Text3 regular as="p">
                            Use TextLink with 'newTab' prop for all links that takes the user out off webapp.
                            The main reason is because it's prepared, in terms of accessibility, to inform
                            users that uses a screen reader, that we are going to open a new tab if they click
                            the link.
                        </Text3>
                        <TextLink href="https://example.org" newTab>
                            {text}
                        </TextLink>
                    </Section>

                    <Section title="TextLink in a paragraph">
                        <div style={{maxWidth: 300}}>
                            <Text3 regular>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                                <TextLink onPress={() => alert({message: 'Pressed!'})}>
                                    Nulla ultricies ante ac sapien faucibus
                                </TextLink>
                                , et rhoncus tellus sagittis. Aliquam et orci gravida, tempus ex ut...
                            </Text3>
                        </div>
                    </Section>

                    <Section title="TextLink with onPress">
                        <TextLink onPress={() => setCount(count + 1)}>{text}</TextLink>
                        <Text3 regular>Clicked {count} times</Text3>
                    </Section>

                    <Section title="TextLink disabled">
                        <TextLink disabled href="https://example.org">
                            {text}
                        </TextLink>
                    </Section>

                    <Section title="TextLink inherits text style">
                        <Text1 regular>
                            Text1 regular <TextLink href="https://example.org">{text}</TextLink> with href
                        </Text1>
                        <Text3 regular>
                            Text3 regular <TextLink href="https://example.org">{text}</TextLink> with href
                        </Text3>
                        <Text5>
                            Text5 <TextLink onPress={() => alert({message: 'Pressed!'})}>{text}</TextLink>{' '}
                            with onPress
                        </Text5>
                    </Section>
                </Stack>
            </ThemeVariant>
        </div>
    );
};

Default.args = {
    text: 'Text link',
    inverse: false,
};

Default.storyName = 'Text link';
