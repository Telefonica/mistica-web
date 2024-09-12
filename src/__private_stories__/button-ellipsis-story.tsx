import * as React from 'react';
import {ButtonDanger, ButtonLink, ButtonPrimary, ButtonSecondary, Stack, Text2, Title1, skinVars} from '..';

export default {
    title: 'Private/Ellipsis in buttons',
};

const handleOnPress = () => window.alert('pressed!');

type Args = {
    text: string;
    loadingText: string;
    small: boolean;
    showSpinner: boolean;
};

export const Default: StoryComponent<Args> = ({text, loadingText, small, showSpinner}) => {
    const href = 'https://example.com';

    return (
        <div data-testid="content" style={{width: 160, border: `1px solid ${skinVars.colors.border}`}}>
            <Stack space={8}>
                <Title1>ButtonPrimary</Title1>
                <ButtonPrimary
                    onPress={handleOnPress}
                    small={small}
                    loadingText={loadingText}
                    showSpinner={showSpinner}
                >
                    {text}
                </ButtonPrimary>

                <Title1>ButtonSecondary</Title1>

                <ButtonSecondary
                    onPress={handleOnPress}
                    small={small}
                    loadingText={loadingText}
                    showSpinner={showSpinner}
                >
                    {text}
                </ButtonSecondary>

                <Title1>ButtonDanger</Title1>

                <ButtonDanger
                    onPress={handleOnPress}
                    small={small}
                    loadingText={loadingText}
                    showSpinner={showSpinner}
                >
                    {text}
                </ButtonDanger>

                <Title1>ButtonLink</Title1>
                <Text2 as="p" regular>
                    Button (onPress):
                </Text2>
                <ButtonLink
                    onPress={handleOnPress}
                    small={small}
                    loadingText={loadingText}
                    showSpinner={showSpinner}
                >
                    {text}
                </ButtonLink>
                <Text2 as="p" regular>
                    Link (href):
                </Text2>
                <ButtonLink href={href} small={small} loadingText={loadingText} showSpinner={showSpinner}>
                    {text}
                </ButtonLink>
            </Stack>
        </div>
    );
};

Default.storyName = 'Ellipsis in buttons';
Default.args = {
    text: 'Ellipsis text example example',
    loadingText: 'Loading ellipsis text example',
    small: false,
    showSpinner: false,
};
