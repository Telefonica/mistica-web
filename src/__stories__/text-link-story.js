// @flow
import * as React from 'react';
import TextLink from '../text-link';
import {StorySection} from './helpers';

export default {
    title: 'Components|TextLink',
    component: TextLink,
};

export const Default = (): React.Element<'div'> => {
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
                <p
                    style={{
                        fontSize: '13px',
                        fontWeight: '400',
                        display: 'block',
                        marginBottom: '32px',
                        color: 'rgb(102, 102, 102)',
                    }}
                >
                    Use TextLink with 'newTab' prop for all links that takes the user out off webapp. The main
                    reason is because it's prepared, in terms of accessibility, to inform users that uses a
                    screen reader, that we are going to open a new tab if they click the link.
                </p>
                <TextLink href="https://web.tuenti.com/" newTab>
                    Text
                </TextLink>
            </StorySection>
            <StorySection title="TextLink with onPress">
                <TextLink style={{fontSize: '16px'}} onPress={() => setCount(count + 1)}>
                    Text
                </TextLink>
                <div style={{marginTop: 16}}>Clicked {count} times</div>
            </StorySection>
        </div>
    );
};
