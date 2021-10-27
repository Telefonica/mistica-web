import * as React from 'react';
import HighlightedCard from '../highlighted-card';
import {StorySection, useCheckbox, useTextField, useSelect} from './helpers';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from '../button';
import {Box, Stack, ThemeVariant, Text1} from '..';

export default {
    title: 'Components/Cards/HighlightedCard',
};

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('title', 'Resolver problema técnico', true);
    const [description, descriptionTextField] = useTextField(
        'description',
        'Usa nuestra herramienta para resolver tus problemas técnicos',
        true
    );
    const [href, hrefTextField] = useTextField('href *', 'url/url');
    const [isInverse, inverseCheckbox] = useCheckbox('Is inverse', false);
    const [withImage, withImageCheckbox] = useCheckbox('With Image', true);
    const [onClose, onCloseCheckbox] = useCheckbox('Is closable', false);
    const [button, buttonSelect] = useSelect('Button type', 'ButtonPrimary', [
        'ButtonPrimary',
        'ButtonSecondary',
        'ButtonLink',
    ]);
    const [imageFit, imageFitSelect] = useSelect('Image fit background-size', 'fit', ['fit', 'fill']);

    const getButton = (button: string) => {
        switch (button) {
            case 'ButtonPrimary':
                return (
                    <ButtonPrimary href="#" small>
                        ButtonPrimary
                    </ButtonPrimary>
                );
            case 'ButtonSecondary':
                return (
                    <ButtonSecondary href="#" small>
                        ButtonSecondary
                    </ButtonSecondary>
                );
            case 'ButtonLink':
                return (
                    <ButtonLink href="#" aligned>
                        TextLink
                    </ButtonLink>
                );
            case 'None':
            default:
                return null;
        }
    };

    const commonProps = {
        title,
        description,
        imageUrl: withImage ? 'https://i.imgur.com/jeDSXBU.jpg' : '',
        imageFit: imageFit as any,
        onClose: onClose ? () => alert('Close pressed') : undefined,
    };

    return (
        <>
            <Stack space={16}>
                <Box paddingTop={16}>
                    <p>Highlighted options:</p>
                </Box>
                {titleTextField}
                {descriptionTextField}
                {hrefTextField}
                <Text1 regular>
                    * This could be <Text1 medium>to | href | onPress</Text1> prop. If it's empty the card
                    will be not touchable.
                </Text1>
                {buttonSelect}
                {imageFitSelect}
                {withImageCheckbox}
                {inverseCheckbox}
                {onCloseCheckbox}
            </Stack>
            <div data-testid="highlighted-card">
                <StorySection title="HighlightedCard - With button">
                    <ThemeVariant isInverse={isInverse}>
                        <HighlightedCard
                            aria-label="With button"
                            {...commonProps}
                            button={getButton(button)}
                        />
                    </ThemeVariant>
                </StorySection>

                <StorySection title="HighlightedCard - Fully touchable card">
                    <ThemeVariant isInverse={isInverse}>
                        <HighlightedCard aria-label="Fully touchable" {...commonProps} href={href} />
                    </ThemeVariant>
                </StorySection>
            </div>
        </>
    );
};

Default.storyName = 'HighlightedCard';

export const CustomCardSize: StoryComponent = () => {
    return (
        <div
            style={{display: 'flex', background: '#eee', overflowX: 'auto', justifyContent: 'flex-start'}}
            data-testid="highlighted-card"
        >
            <HighlightedCard
                width={250}
                title="Title 1"
                description="Some description here"
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
                onClose={() => {}}
            />

            <Box paddingRight={8} />

            <HighlightedCard
                width={250}
                title="Title 2"
                description="Some description here"
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
                button={
                    <ButtonPrimary small href="https://google.com">
                        Action
                    </ButtonPrimary>
                }
            />

            <Box paddingRight={8} />

            <HighlightedCard
                width={250}
                title="Title 3"
                description="Some description here. Some description here."
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
                button={
                    <ButtonPrimary small href="https://google.com">
                        Action
                    </ButtonPrimary>
                }
            />

            <Box paddingRight={8} />

            <HighlightedCard
                width={250}
                onClose={() => {}}
                onPress={() => {}}
                title="Title 4"
                description="Some description here. Some description here. Some description here. "
                imageUrl="https://i.imgur.com/jeDSXBU.jpg"
                imageFit="fit"
            />
        </div>
    );
};
