import * as React from 'react';
import HighlightedCard from '../highlighted-card';
import {StorySection, useCheckbox, useTextField, useSelect} from './helpers';
import {Placeholder} from '../placeholder';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from '../button';
import {Box, Stack} from '..';

export default {
    title: 'Components|Cards/Highlighted Card',
};

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('title', 'Resolver problema técnico', true);
    const [paragraph, paragraphTextField] = useTextField(
        'paragraph',
        'Usa nuestra herramienta para resolver tus problemas técnicos',
        true
    );
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', false);
    const [image, imageCheckbox] = useCheckbox('With Image', true);
    const [buttonType, buttonTypeSelect] = useSelect('Button type', 'ButtonPrimary', [
        'ButtonPrimary',
        'ButtonSecondary',
        'ButtonLink',
        'None',
    ]);

    const getButton = (buttonType: string) => {
        switch (buttonType) {
            case 'ButtonPrimary':
                return (
                    <ButtonPrimary href="whatever/url" small>
                        ButtonPrimary
                    </ButtonPrimary>
                );
            case 'ButtonSecondary':
                return (
                    <ButtonSecondary href="whatever/url" small>
                        ButtonSecondary
                    </ButtonSecondary>
                );
            case 'ButtonLink':
                return <ButtonLink href="whatever/url">ButtonLink</ButtonLink>;
            case 'None':
            default:
                return null;
        }
    };

    return (
        <>
            <Box paddingX={16}>
                <Stack space={16}>
                    <Box paddingTop={16}>
                        <p>Highlighted options:</p>
                    </Box>
                    {titleTextField}
                    {paragraphTextField}
                    {inverseCheckbox}
                    {imageCheckbox}
                    {buttonTypeSelect}
                </Stack>
            </Box>
            <div data-testid="highlighted-card">
                <StorySection title="HighlightedCard">
                    <HighlightedCard
                        title={title}
                        paragraph={paragraph}
                        isInverse={isInverse}
                        image={image ? <Placeholder height={100} /> : ''}
                        button={getButton(buttonType)}
                    />
                </StorySection>
            </div>
        </>
    );
};

Default.story = {name: 'HighlightedCard'};
